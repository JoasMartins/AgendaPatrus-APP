@echo off
echo ==================== Iniciando ====================
echo.
echo.
echo Startando ---> Iniciar RN-Metro (cmd-npx_reactnative_start.bat)
start "Iniciar RN-Metro" cmd-npx_reactnative_start.bat /k
echo.
echo Startando ---> Buildar APP (cmd-npx_reactnative_runandroid.bat)
start "Buildar APP" cmd-npx_reactnative_runandroid.bat /k
echo.
echo Startando ---> Commitar Github/API (cmd-commit_gitbub.bat)
start "Commitar Github/API" cmd-commit_gitbub.bat /k
echo.
echo.
echo ==================== Finalizado! ====================
cd "C:\Users\joasm\Documents\ProgramacaoDocs\paths disk\Mobile\AgendaPatrus"
code .
exit