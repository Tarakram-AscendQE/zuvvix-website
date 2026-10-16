<?php
if (!defined('SECURE_MAILER')) {
    http_response_code(403);
    die(json_encode(['success' => false, 'message' => 'Direct access forbidden.']));
}

/**
 * Zuvvix Email Service Configuration (AWS SES)
 *
 * Reads credentials strictly from environment variables or a server-level .env file.
 * No secret keys or credentials are stored directly in this public file.
 */

$envFile = __DIR__ . '/.env';
$loadedEnv = [];
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) continue;
        list($k, $v) = explode('=', $line, 2);
        $loadedEnv[trim($k)] = trim(trim($v), '"\'');
    }
}

return [
    'region'          => $loadedEnv['AWS_REGION'] ?? getenv('AWS_REGION') ?: 'ap-south-1',
    'access_key'      => $loadedEnv['AWS_ACCESS_KEY_ID'] ?? getenv('AWS_ACCESS_KEY_ID') ?: '',
    'secret_key'      => $loadedEnv['AWS_SECRET_ACCESS_KEY'] ?? getenv('AWS_SECRET_ACCESS_KEY') ?: '',
    'sender_email'    => $loadedEnv['SENDER_MAIL'] ?? getenv('SENDER_MAIL') ?: 'hello@ascendqe.com',
    'recipient_email' => $loadedEnv['RECIPIENT_MAIL'] ?? getenv('RECIPIENT_MAIL') ?: 'hello@zuvvix.com',
];

