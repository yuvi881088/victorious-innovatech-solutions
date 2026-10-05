<?php
$url = "http://127.0.0.1:8080/api/contact.php";
$data = [
    "name" => "Yuvraj Sharma",
    "email" => "yuvi881088@gmail.com",
    "subject" => "Website Development Inquiry",
    "message" => "Hello! This is a real test lead from Victorious Innovatech contact form."
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
echo "Response: $response\n";
