# Portable PHP Setup & Runner for Victorious Innovatech Solutions
param (
    [int]$Port = 8000
)

$ErrorActionPreference = "Stop"
$CurrentDir = Get-Location
$PhpDir = Join-Path $CurrentDir "php"
$PhpExe = Join-Path $PhpDir "php.exe"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Victorious Innovatech Solutions - Portable PHP Setup" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

if (Test-Path $PhpExe) {
    Write-Host "[OK] Portable PHP is already installed in: $PhpDir" -ForegroundColor Green
} else {
    Write-Host "[1/3] Finding latest Portable PHP for Windows..." -ForegroundColor Yellow
    
    $downloadUrl = ""
    try {
        $releasesPage = Invoke-WebRequest -Uri "https://windows.php.net/downloads/releases/" -UseBasicParsing -TimeoutSec 10
        $matches = $releasesPage.Links | Where-Object { $_.href -match "php-8\.[1-9]\.[0-9]+-nts-Win32-vs16-x64\.zip" }
        if ($matches) {
            $fileName = ($matches | Select-Object -First 1).href
            $downloadUrl = "https://windows.php.net/downloads/releases/$fileName"
        }
    } catch {
        Write-Host "Notice: Using fallback archive URL..." -ForegroundColor Gray
    }

    if (-not $downloadUrl) {
        $downloadUrl = "https://windows.php.net/downloads/releases/archives/php-8.2.20-nts-Win32-vs16-x64.zip"
    }

    $zipPath = Join-Path $CurrentDir "php_portable.zip"
    Write-Host "[2/3] Downloading Portable PHP from: $downloadUrl" -ForegroundColor Yellow
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath

    Write-Host "[3/3] Extracting PHP to: $PhpDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $PhpDir | Out-Null
    Expand-Archive -Path $zipPath -DestinationPath $PhpDir -Force
    Remove-Item -Force $zipPath -ErrorAction SilentlyContinue

    # Setup php.ini
    $iniDev = Join-Path $PhpDir "php.ini-development"
    $iniTarget = Join-Path $PhpDir "php.ini"
    if (Test-Path $iniDev) {
        Copy-Item -Path $iniDev -Destination $iniTarget -Force
        # Enable common extensions
        (Get-Content $iniTarget) `
            -replace ';extension_dir = "ext"', 'extension_dir = "ext"' `
            -replace ';extension=curl', 'extension=curl' `
            -replace ';extension=mbstring', 'extension=mbstring' `
            -replace ';extension=pdo_mysql', 'extension=pdo_mysql' `
            -replace ';extension=openssl', 'extension=openssl' |
            Set-Content $iniTarget
    }
    Write-Host "[OK] Portable PHP setup successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Starting PHP Local Development Server" -ForegroundColor Cyan
Write-Host " URL: http://localhost:$Port" -ForegroundColor Green
Write-Host " APIs: http://localhost:$Port/api/index.php" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server at any time." -ForegroundColor Gray
Write-Host ""

& $PhpExe -S "localhost:$Port"
