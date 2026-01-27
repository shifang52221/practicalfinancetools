param(
  [int]$Port = 4322,
  [string]$ExpectedOrigin = "https://practicalfinancetools.com",
  [string]$OutDir = ""
)

$ErrorActionPreference = "Stop"

function Get-ListeningPids([int]$port) {
  $lines = netstat -ano | Select-String (":$port\s+.*LISTENING")
  $pids = @()
  foreach ($l in $lines) {
    $parts = ($l -split "\s+") | Where-Object { $_ }
    if ($parts.Count -gt 0) { $pids += $parts[-1] }
  }
  $pids | Select-Object -Unique
}

function Kill-Pids($pids) {
  foreach ($pid in $pids) {
    cmd /c "taskkill /PID $pid /T /F" | Out-Null
  }
}

if (-not $OutDir) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $OutDir = "reports/seo-audit/local-$stamp"
}

$existing = Get-ListeningPids -port $Port
if ($existing) { Kill-Pids $existing }

$p = $null
try {
  $p = Start-Process -FilePath cmd.exe -ArgumentList @("/c", "npm", "run", "preview", "--", "--host", "127.0.0.1", "--port", "$Port") -PassThru -NoNewWindow

  $deadline = (Get-Date).AddSeconds(30)
  $ready = $false
  while ((Get-Date) -lt $deadline) {
    $codes = @(
      (cmd /c "curl.exe -s -o NUL -w %{http_code} http://127.0.0.1:$Port/"),
      (cmd /c "curl.exe -s -o NUL -w %{http_code} http://127.0.0.1:$Port/about"),
      (cmd /c "curl.exe -s -o NUL -w %{http_code} http://127.0.0.1:$Port/calculators"),
      (cmd /c "curl.exe -s -o NUL -w %{http_code} http://127.0.0.1:$Port/guides")
    )
    if (($codes | Where-Object { $_ -ne "200" }).Count -eq 0) { $ready = $true; break }
    Start-Sleep -Milliseconds 250
  }

  if (-not $ready) { throw "astro preview not ready on port $Port" }

  node scripts/seo/seo-audit.mjs --base "http://127.0.0.1:$Port" --expected-origin $ExpectedOrigin --out $OutDir
  Write-Host "OK: $OutDir"
} finally {
  if ($p -and -not $p.HasExited) {
    cmd /c "taskkill /PID $($p.Id) /T /F" | Out-Null
  }
}

