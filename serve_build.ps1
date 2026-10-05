# Serve Production Build (dist) with Portable PHP on dedicated port (default: 8080)
param (
    [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
$CurrentDir = Get-Location
$PhpDir = Join-Path $CurrentDir "php"
$PhpExe = Join-Path $PhpDir "php.exe"
$DistDir = Join-Path $CurrentDir "dist"
$Router = Join-Path $CurrentDir "router.php"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Victorious Innovatech - Production Build PHP Runner" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not (Test-Path $PhpExe)) {
    Write-Host "[!] Portable PHP not found. Setting up first..." -ForegroundColor Yellow
    & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $CurrentDir "setup_portable_php.ps1")
}

if (-not (Test-Path $DistDir)) {
    Write-Host "[!] dist/ folder not found. Building project..." -ForegroundColor Yellow
    cmd /c "npm run build"
}

Write-Host ""
Write-Host " [OK] Serving Production Build + PHP APIs together!" -ForegroundColor Green
Write-Host " --------------------------------------------------" -ForegroundColor Gray
Write-Host " Website URL : http://localhost:$Port" -ForegroundColor Cyan
Write-Host " PHP APIs    : http://localhost:$Port/api/index.php" -ForegroundColor Cyan
Write-Host " --------------------------------------------------" -ForegroundColor Gray
Write-Host " Note: Port 3000 is reserved for development (npm run dev)" -ForegroundColor Gray
Write-Host " Press Ctrl+C to stop the build server." -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

& $PhpExe -S "0.0.0.0:$Port" -t $DistDir $Router
