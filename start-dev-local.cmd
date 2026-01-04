@echo off
setlocal
cd /d "%~dp0"
echo Starting Astro dev server (local) on http://localhost:4321 ...
echo Log: %~dp0dev-server.log
npm run dev -- --host 127.0.0.1 --port 4321 1>>"%~dp0dev-server.log" 2>&1
echo.
echo Dev server exited. See dev-server.log for details.
pause
