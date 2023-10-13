@echo off
echo ==================== Iniciando ====================
cd "C:\Users\joasm\Documents\ProgramacaoDocs\paths disk\API\AgendaPatrusAPI"
echo.
echo.
set /p commit=Atualizacao para Commit: 
set /p operation=Operacao numero: 
echo.


echo -------------------------------------------------
echo "---> git add . 
git add .
echo -------------------------------------------------


echo.
echo.


echo -------------------------------------------------
echo "---> git commit -m 'Atualizacao  API: %commit% | Operacao: %operation%'
git commit -m "Atualizacao na API: %commit% | Operacao: %operation%"
echo -------------------------------------------------


echo.‏
echo.


echo -------------------------------------------------
echo "---> git push -u origin main
git push -u origin main
echo -------------------------------------------------


echo.
echo.
echo.

echo ==================== Finalizado! ====================

ping 127.0.0.1 -n 6 >nul
exit