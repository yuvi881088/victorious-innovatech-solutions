<?php
require_once __DIR__ . '/api/config.php';
require_once __DIR__ . '/api/mailer.php';

// Turn on verbose output by modifying or testing directly
echo "=== TESTING MAILER DIRECTLY ===\n";
echo "SMTP User: " . SMTP_USER . "\n";
echo "Admin Email: " . ADMIN_EMAIL . "\n";
echo "Client Email: " . CLIENT_EMAIL . "\n";

$result = send_lead_notification_email(
    "Yuvi Live Test",
    "test@example.com",
    "Test Subject Alert",
    "This is a real-time lead notification test from Victorious Website.",
    "127.0.0.1"
);

echo "Mailer Function Return: " . ($result ? "TRUE (Success)" : "FALSE (Failed)") . "\n";
