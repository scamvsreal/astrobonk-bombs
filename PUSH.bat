@echo off
setlocal
title ASTRO BONK BOMBS - Git Push

echo ==========================================
echo  ASTRO BONK BOMBS - Deploy Script
echo ==========================================
echo.

set "SRC=%~dp0"
set "DEST=%USERPROFILE%\Desktop\astro-bonk-bombs"

echo [1/5] Copying folder to Desktop...
if exist "%DEST%" (
    echo     Folder already on Desktop - updating files
) else (
    mkdir "%DEST%"
)
xcopy "%SRC%*" "%DEST%\" /E /I /H /Y /Q > nul
if errorlevel 1 (
    echo ERROR: Failed to copy files to Desktop
    pause
    exit /b 1
)
echo     Done. Folder is at: %DEST%
echo.

cd /d "%DEST%"

echo [2/5] Checking git installation...
where git >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Download it from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo     Git found.
echo.

echo [3/5] Setting up git remote...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/scamvsreal/astrobonk-bombs.git
git branch -M main
echo     Remote set to: scamvsreal/astrobonk-bombs
echo.

echo [4/5] Pushing to GitHub...
echo.
echo When prompted:
echo   Username: scamvsreal
echo   Password: paste your Personal Access Token
echo   (Generate one at: https://github.com/settings/tokens/new - tick "repo")
echo.
git push -u origin main
if errorlevel 1 (
    echo.
    echo ERROR: Push failed. Common reasons:
    echo   - Repo does not exist on GitHub - create empty repo first at:
    echo     https://github.com/new  (name: astrobonk-bombs, Public, NO README)
    echo   - Wrong credentials - use Personal Access Token as password
    pause
    exit /b 1
)
echo.

echo [5/5] SUCCESS!
echo.
echo ==========================================
echo  Repo live at:
echo    https://github.com/scamvsreal/astrobonk-bombs
echo.
echo  Now go to https://vercel.com/new and
echo  import the repo to deploy the game.
echo ==========================================
echo.
pause
