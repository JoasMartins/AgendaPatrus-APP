@echo off

:Loop
set /p teste=[START]

cd "C:\Users\joasm\Documents\ProgramacaoDocs\paths disk\Mobile\AgendaPatrus\commands"
start "CommitGithub/API" CommitGithub.bat

echo Sistema de Commit do Github aberto! (Prossiga na outra janela)
echo ==================================================================

goto Loop
