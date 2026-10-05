<?php
// Test Gmail SMTP

function send_smtp_mail($smtpUser, $smtpPass, $toEmail, $subject, $body) {
    echo "Attempting SMTP with user: $smtpUser ...\n";
    $host = "ssl://smtp.gmail.com";
    $port = 465;
    $timeout = 15;

    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $socket = @stream_socket_client("$host:$port", $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        echo "Socket connection failed: $errstr ($errno)\n";
        return false;
    }

    $read = function() use ($socket) {
        $res = "";
        while ($line = fgets($socket, 512)) {
            $res .= $line;
            if (substr($line, 3, 1) == " ") break;
        }
        return $res;
    };

    $write = function($cmd) use ($socket) {
        fputs($socket, $cmd . "\r\n");
    };

    $initRes = $read();
    echo "Server Greeting: $initRes";

    $write("EHLO localhost");
    $ehloRes = $read();

    $write("AUTH LOGIN");
    $authRes = $read();

    $write(base64_encode($smtpUser));
    $userRes = $read();

    $write(base64_encode($smtpPass));
    $passRes = $read();
    echo "Auth Response: $passRes";

    if (strpos($passRes, '235') === false) {
        echo "Authentication failed for $smtpUser!\n";
        fclose($socket);
        return false;
    }

    echo "Authentication SUCCESSFUL for $smtpUser!\n";

    $write("MAIL FROM: <$smtpUser>");
    $fromRes = $read();

    $write("RCPT TO: <$toEmail>");
    $rcptRes = $read();

    $write("DATA");
    $dataRes = $read();

    $headers = "From: Victorious Innovatech <$smtpUser>\r\n" .
               "To: <$toEmail>\r\n" .
               "Subject: $subject\r\n" .
               "MIME-Version: 1.0\r\n" .
               "Content-Type: text/html; charset=UTF-8\r\n";

    $content = $headers . "\r\n" . $body . "\r\n.\r\n";
    fputs($socket, $content);
    $sendRes = $read();
    echo "Send Response: $sendRes";

    $write("QUIT");
    $read();
    fclose($socket);

    return (strpos($sendRes, '250') !== false);
}

$appPass = "vfmhwtgbzmdsoljn";
$testBody = "<h2>🎉 Test Email Successful!</h2><p>Victorious Innovatech Solutions contact form is now successfully connected with your Gmail!</p>";

// Test: yuvi881088@gmail.com
$success = send_smtp_mail("yuvi881088@gmail.com", $appPass, "yuvi881088@gmail.com", "Victorious Website Test Lead", $testBody);

if ($success) {
    echo "\n>>> FINAL RESULT: EMAIL SENT SUCCESSFULLY! <<<\n";
} else {
    echo "\n>>> FINAL RESULT: FAILED <<<\n";
}
