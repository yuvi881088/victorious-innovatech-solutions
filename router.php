<?php
/**
 * Router script for PHP built-in web server
 * Serves static build files from dist/ and executes dist/api/*.php endpoints
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$docRoot = __DIR__ . '/dist';
$file = $docRoot . $uri;

// Block direct HTTP access to sensitive files (.csv, .sql, .env, .log)
if (preg_match('/\.(csv|sql|env|log)$/i', $uri)) {
    http_response_code(403);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        'status' => 403,
        'error' => 'Forbidden',
        'message' => 'Direct access to this file is restricted.'
    ]);
    exit;
}

// 1. If it's a PHP API endpoint in /api/, execute it
if (strpos($uri, '/api/') === 0) {
    if (is_file($file)) {
        return false; // Built-in server will execute the PHP file
    }
}

// 2. If it's an existing file (CSS, JS, images, fonts, html), serve it directly
if ($uri !== '/' && file_exists($file)) {
    if (is_dir($file) && file_exists($file . '/index.html')) {
        header('Content-Type: text/html; charset=UTF-8');
        include $file . '/index.html';
        exit;
    }
    return false; // Built-in server serves static assets
}

// 3. If it's a route matching a directory with index.html (e.g. /about or /services)
if (file_exists($docRoot . $uri . '/index.html')) {
    header('Content-Type: text/html; charset=UTF-8');
    include $docRoot . $uri . '/index.html';
    exit;
}

// 4. Default fallback: serve root index.html
if (file_exists($docRoot . '/index.html')) {
    header('Content-Type: text/html; charset=UTF-8');
    include $docRoot . '/index.html';
    exit;
}

return false;
