@echo off
cls

set GIT_REPO=C:\Prem\GIT\

pushd %GIT_REPO%\MyTestPrograms\spring-boot-curd-mongo
call mvn spring-boot:run