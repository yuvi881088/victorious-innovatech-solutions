@echo off
title Victorious Innovatech Solutions - Astro Server
echo ========================================================
echo    Starting Astro Dev Server on http://localhost:3000
echo ========================================================
cd /d "%~dp0"
start "" http://localhost:3000
npm.cmd run dev
pause
