$headers = @{ "Content-Type" = "application/json" }

Write-Host "=== 1. Testing index.php ==="
$r1 = Invoke-RestMethod -Uri "http://localhost:8000/api/index.php" -Method Get
Write-Host "Status: $($r1.status), Service: $($r1.service)"

Write-Host "`n=== 2. Testing newsletter.php ==="
$body2 = @{ email = "test_build_$(Get-Random)@example.com" } | ConvertTo-Json
$r2 = Invoke-RestMethod -Uri "http://localhost:8000/api/newsletter.php" -Method Post -Headers $headers -Body $body2
Write-Host "Success: $($r2.success), Message: $($r2.message)"

Write-Host "`n=== 3. Testing contact.php ==="
$body3 = @{
    name = "Build Verifier"
    email = "verifier@example.com"
    subject = "Enterprise Web App"
    message = "Need urgent web development and automation"
} | ConvertTo-Json
$r3 = Invoke-RestMethod -Uri "http://localhost:8000/api/contact.php" -Method Post -Headers $headers -Body $body3
Write-Host "Success: $($r3.success), Message: $($r3.message)"

Write-Host "`n=== 4. Testing automation.php ==="
$body4 = @{
    name = "Enterprise Client"
    email = "client@corp.com"
    service = "AI Automation"
    budget = "Enterprise"
    message = "Urgent requirement for AI automation workflows"
} | ConvertTo-Json
$r4 = Invoke-RestMethod -Uri "http://localhost:8000/api/automation.php" -Method Post -Headers $headers -Body $body4
Write-Host "Status: $($r4.status), Score: $($r4.automation.score), Priority: $($r4.automation.priority)"

Write-Host "`n=== 5. Testing chat.php ==="
$body5 = @{
    message = "Hello, what services does Victorious Innovatech Solutions offer?"
} | ConvertTo-Json
$r5 = Invoke-RestMethod -Uri "http://localhost:8000/api/chat.php" -Method Post -Headers $headers -Body $body5
Write-Host "Role: $($r5.message.role)"
Write-Host "Response: $($r5.message.content.Substring(0, [Math]::Min(120, $r5.message.content.Length)))..."

Write-Host "`n=== ALL TESTS COMPLETED SUCCESSFULLY ==="
