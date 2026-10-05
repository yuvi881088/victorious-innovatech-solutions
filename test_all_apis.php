<?php
// Test all 3 APIs on localhost:8080

function test_api($name, $url, $data) {
    echo "========================================\n";
    echo "TESTING: $name ($url)\n";
    echo "========================================\n";
    
    $ch = curl_init($url);
    $payload = json_encode($data);
    
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type:application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    echo "HTTP Status Code: $httpCode\n";
    echo "Response:\n$result\n\n";
    
    $json = json_decode($result, true);
    if ($json && isset($json['success']) && $json['success'] === true) {
        echo ">>> RESULT: SUCCESS! (Pass)\n\n";
        return true;
    } else {
        echo ">>> RESULT: FAILED or UNEXPECTED\n\n";
        return false;
    }
}

// 1. Test Contact API
$contactSuccess = test_api(
    "Contact API", 
    "http://localhost:8080/api/contact.php", 
    [
        "name" => "Yuvraj Sharma",
        "email" => "yuvraj@example.com",
        "subject" => "Website Development Inquiry",
        "message" => "Hi, I want to discuss a new software project for our business."
    ]
);

// 2. Test Newsletter API
$newsletterSuccess = test_api(
    "Newsletter API", 
    "http://localhost:8080/api/newsletter.php", 
    [
        "email" => "subscriber_" . time() . "@example.com"
    ]
);

// 3. Test Chat API
$chatSuccess = test_api(
    "Chat Assistant API", 
    "http://localhost:8080/api/chat.php", 
    [
        "message" => "What services does Victorious Innovatech Solutions provide?"
    ]
);

echo "========================================\n";
echo "FINAL SUMMARY:\n";
echo "1. contact.php    : " . ($contactSuccess ? "SUCCESS (PASS)" : "FAILED") . "\n";
echo "2. newsletter.php : " . ($newsletterSuccess ? "SUCCESS (PASS)" : "FAILED") . "\n";
echo "3. chat.php       : " . ($chatSuccess ? "SUCCESS (PASS)" : "FAILED") . "\n";
echo "========================================\n";
