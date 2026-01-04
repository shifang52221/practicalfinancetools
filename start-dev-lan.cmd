@echo off
setlocal
cd /d "%~dp0"
echo Starting Astro dev server (LAN) on http://0.0.0.0:4321 ...
echo Log: %~dp0dev-server.log
npm run dev:lan 1>>"%~dp0dev-server.log" 2>&1
echo.
echo Dev server exited. See dev-server.log for details.
pause
