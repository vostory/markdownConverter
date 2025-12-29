@echo off
REM Markdown to HTML Converter Build Script

set "NODE_EXE=node.exe"
set "NPM_CLI=npm/bin/npm-cli.js"
set "SAMPLE_FILE=sample.md"

REM Check if node.exe exists
if not exist %NODE_EXE% (
    echo ERROR: %NODE_EXE% not found!
    echo Please download node.exe to this directory.
    pause
    exit /b 1
)

echo ===============================================================================
echo Markdown to HTML Converter Build Script
echo ===============================================================================

REM Check if node_modules directory exists
if not exist "node_modules" (
    echo Installing dependencies...
    %NODE_EXE% %NPM_CLI% install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
) else (
    echo Dependencies already installed.
)

echo. 
echo ===============================================================================
echo Testing conversion...
echo ===============================================================================

REM Test conversion
%NODE_EXE% index.js %SAMPLE_FILE%
if errorlevel 1 (
    echo ERROR: Conversion test failed!
    pause
    exit /b 1
)

echo. 
echo ===============================================================================
echo Build completed successfully!
echo ===============================================================================
echo. 
echo How to use:
echo   1. Place your Markdown file in the input folder
echo   2. Run: %NODE_EXE% index.js your-file.md
echo   3. Find the generated HTML file in the output folder
echo   4. Copy the generated HTML content to your website or blog
echo. 
pause