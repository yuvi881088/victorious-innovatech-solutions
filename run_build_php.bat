@echo off
title Victorious Innovatech - Production Build on Port 8080
echo ==========================================================
echo  Victorious Innovatech Solutions - Production Build Server
echo ==========================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve_build.ps1"
pause
