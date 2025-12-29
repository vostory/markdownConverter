@echo off
REM Markdown to WeChat Converter Quick Script

set "NODE_EXE=node.exe"

REM Check if node.exe exists
if not exist %NODE_EXE% (
    echo ERROR: %NODE_EXE% not found!
    echo Please download node.exe to this directory.
    pause
    exit /b 1
)

REM Check if input file is provided
if "%~1"=="" (
    echo Usage: %0 <input.md> [output.html] [--style <style-name>|-s <style-name>]
    echo Example: %0 article.md
    echo Example: %0 article.md wechat-article.html
    echo Example: %0 article.md --style modern
    echo Example: %0 article.md wechat-article.html -s dark
    echo.
    echo Available styles: default, simple, modern, dark
    echo.
    echo If no output file is specified, it will be named as input file with "-wechat.html" suffix.
    echo If no style is specified, default style will be used.
    pause
    exit /b 1
)

REM Get input file name
set "INPUT_FILE=%~1"

REM Check if input file exists
if not exist %INPUT_FILE% (
    REM 如果输入文件不在当前目录，尝试从input文件夹查找
    if exist "input\%INPUT_FILE%" (
        set "INPUT_FILE=input\%INPUT_FILE%"
    ) else (
        echo ERROR: Input file %INPUT_FILE% not found!
        echo Please put your Markdown files in the input folder.
        pause
        exit /b 1
    )
)

REM Parse other parameters
set "OUTPUT_FILE="
set "STYLE_PARAM="
set "STYLE_NAME="

REM First pass: Find style parameters regardless of position
set "param_index=1"
:parse_params
set "current_param=%~%param_index%"
if "%current_param%"=="" goto params_parsed

if "%current_param%"=="--style" (
    set "STYLE_PARAM=--style"
    set /a "next_index=param_index+1"
    set "STYLE_NAME=%%~%next_index%%"
    goto :next_param
) else if "%current_param%"=="-s" (
    set "STYLE_PARAM=-s"
    set /a "next_index=param_index+1"
    set "STYLE_NAME=%%~%next_index%%"
    goto :next_param
) else if "%param_index%"=="2" (
    REM Check if second parameter is output file or style param
    set "OUTPUT_FILE=%current_param%"
    REM If it starts with -, it's not an output file
    if "%OUTPUT_FILE:~0,1%"=="-" (
        set "OUTPUT_FILE="
    )
) else if "%param_index%"=="3" (
    REM Only set output file if not already set and not a style param
    if "%OUTPUT_FILE%"=="" (
        set "OUTPUT_FILE=%current_param%"
        if "%OUTPUT_FILE:~0,1%"=="-" (
            set "OUTPUT_FILE="
        )
    )
)

:next_param
set /a "param_index=param_index+1"
goto :parse_params

:params_parsed

REM Clean up: If style param is set but style name is empty, clear both
if not "%STYLE_PARAM%"=="" (
    if "%STYLE_NAME%"=="" (
        set "STYLE_PARAM="
    )
)

echo Converting %INPUT_FILE%...

REM Run conversion
if "%STYLE_PARAM%"=="--style" if not "%STYLE_NAME%"=="" (
    if "%OUTPUT_FILE%"=="" (
        %NODE_EXE% index.js %INPUT_FILE% %STYLE_PARAM% %STYLE_NAME%
    ) else (
        %NODE_EXE% index.js %INPUT_FILE% %OUTPUT_FILE% %STYLE_PARAM% %STYLE_NAME%
    )
) else if "%STYLE_PARAM%"=="-s" if not "%STYLE_NAME%"=="" (
    if "%OUTPUT_FILE%"=="" (
        %NODE_EXE% index.js %INPUT_FILE% %STYLE_PARAM% %STYLE_NAME%
    ) else (
        %NODE_EXE% index.js %INPUT_FILE% %OUTPUT_FILE% %STYLE_PARAM% %STYLE_NAME%
    )
) else (
    if "%OUTPUT_FILE%"=="" (
        %NODE_EXE% index.js %INPUT_FILE%
    ) else (
        %NODE_EXE% index.js %INPUT_FILE% %OUTPUT_FILE%
    )
)

if errorlevel 1 (
    echo ERROR: Conversion failed!
    pause
    exit /b 1
)

echo Conversion completed successfully!
echo. 
echo Next steps:
echo   1. Open the generated HTML file in a browser
echo   2. Select all content (Ctrl+A) and copy (Ctrl+C)
echo   3. Paste into WeChat Official Account backend editor
echo. 
pause