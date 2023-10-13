@echo off
echo ==================== Iniciando ====================
echo.
echo.
cd "C:\Users\joasm\Documents\ProgramacaoDocs\paths disk\Mobile\AgendaPatrus"
echo Buildando APP...
npx react-native run-android

echo.
echo.
echo.

echo ==================== Finalizado! ====================

ping 127.0.0.1 -n 6 >nul
exit