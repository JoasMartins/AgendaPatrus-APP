@echo off

:Loop

cd "C:\Users\joasm\Documents\ProgramacaoDocs\paths disk\Mobile\AgendaPatrus\commands"
start "Buildar App" BuildApp.bat

echo Sistema de Buildar App aberto! (Prossiga na outra janela)
echo ==================================================================

set /p teste=[START]

goto Loop
