@echo off
setlocal ENABLEDELAYEDEXPANSION

REM ---- Elevation check (relaunch as Administrator if needed) ----
net session >NUL 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo This script requires elevated privileges. Prompting for elevation...
  powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -WorkingDirectory '%~dp0' -Verb RunAs"
  exit /b
)

set "TASK_NAME=CoC_DholeHouse_Dev_3000"

REM Remove any existing task with the same name to ensure updates take effect
schtasks /Query /TN "%TASK_NAME%" >NUL 2>&1
if %ERRORLEVEL% EQU 0 (
  echo Updating existing scheduled task "%TASK_NAME%"...
  schtasks /Delete /TN "%TASK_NAME%" /F >NUL 2>&1
)

REM Create a per-user scheduled task that starts the dev server on port 3000 at logon
REM It will run minimized via cmd, in this project directory
set "TR_CMD=cmd /c cd /d \"%~dp0\" ^&^& npm run dev -- --port 3000 --host --strictPort"
schtasks /Create /TN "%TASK_NAME%" /TR "%TR_CMD%" /SC ONLOGON /RL HIGHEST /F >NUL 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo Failed to create scheduled task. Please run this script in a user session with permission to create tasks.
  exit /b 1
)

REM Start it immediately for the current session
schtasks /Run /TN "%TASK_NAME%" >NUL 2>&1
if %ERRORLEVEL% EQU 0 (
  echo Service task "%TASK_NAME%" created and started on port 3000.
  echo It will auto-start at user logon until removed or the PC reboots without running this script again.
) else (
  echo Service task "%TASK_NAME%" created. It will start on next logon.
)
endlocal
exit /b 0
