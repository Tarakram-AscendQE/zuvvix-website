<?php
if (!defined('SECURE_MAILER')) {
    http_response_code(403);
    die(json_encode(['success' => false, 'message' => 'Direct access forbidden.']));
}

/**
 * AWS SES Helper for PHP (Zero external dependencies)
 * Sends emails via AWS SES REST API using AWS Signature Version 4 (SigV4) over HTTPS (Port 443).
 * Works reliably on GoDaddy cPanel shared hosting where outbound port 25 is blocked.
 */

function calculateAwsSigV4Key($key, $dateStamp, $regionName, $serviceName) {
    $kSecret  = 'AWS4' . $key;
    $kDate    = hash_hmac('sha256', $dateStamp, $kSecret, true);
    $kRegion  = hash_hmac('sha256', $regionName, $kDate, true);
    $kService = hash_hmac('sha256', $serviceName, $kRegion, true);
    $kSigning = hash_hmac('sha256', 'aws4_request', $kService, true);
    return $kSigning;
}

function executeAwsSesApiRequest($action, array $params, array $config) {
    $accessKey = trim($config['access_key'] ?? '');
    $secretKey = trim($config['secret_key'] ?? '');
    $region    = trim($config['region'] ?? 'ap-south-1');

    if ($accessKey === '' || $secretKey === '') {
        return [
            'success' => false,
            'error'   => 'AWS credentials are missing. Please check email-config.php.'
        ];
    }

    $host     = "email.{$region}.amazonaws.com";
    $endpoint = "https://{$host}/";

    $params['Action']  = $action;
    $params['Version'] = '2010-12-01';

    $postBody = http_build_query($params, '', '&', PHP_QUERY_RFC3986);

    $amzDate   = gmdate('Ymd\THis\Z');
    $dateStamp = gmdate('Ymd');

    $canonicalUri        = '/';
    $canonicalQueryString = '';
    $canonicalHeaders    = "content-type:application/x-www-form-urlencoded; charset=utf-8\nhost:{$host}\nx-amz-date:{$amzDate}\n";
    $signedHeaders       = 'content-type;host;x-amz-date';
    $payloadHash         = hash('sha256', $postBody);

    $canonicalRequest = "POST\n{$canonicalUri}\n{$canonicalQueryString}\n{$canonicalHeaders}\n{$signedHeaders}\n{$payloadHash}";

    $algorithm       = 'AWS4-HMAC-SHA256';
    $credentialScope = "{$dateStamp}/{$region}/ses/aws4_request";
    $stringToSign    = "{$algorithm}\n{$amzDate}\n{$credentialScope}\n" . hash('sha256', $canonicalRequest);

    $signingKey = calculateAwsSigV4Key($secretKey, $dateStamp, $region, 'ses');
    $signature  = hash_hmac('sha256', $stringToSign, $signingKey);

    $authHeader = "{$algorithm} Credential={$accessKey}/{$credentialScope}, SignedHeaders={$signedHeaders}, Signature={$signature}";

    $headers = [
        'Content-Type: application/x-www-form-urlencoded; charset=utf-8',
        "Host: {$host}",
        "X-Amz-Date: {$amzDate}",
        "Authorization: {$authHeader}"
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postBody);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);

    $response  = curl_exec($ch);
    $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        return [
            'success' => false,
            'error'   => 'Network error connecting to AWS SES: ' . $curlError
        ];
    }

    if ($httpCode >= 200 && $httpCode < 300) {
        return [
            'success'  => true,
            'httpCode' => $httpCode,
            'raw'      => $response
        ];
    }

    // Parse AWS XML error response
    $errorMessage = "AWS SES returned HTTP {$httpCode}";
    if ($response) {
        if (preg_match('/<Message>(.*?)<\/Message>/s', $response, $matches)) {
            $errorMessage .= ': ' . htmlspecialchars_decode(trim($matches[1]));
        } else {
            $errorMessage .= ': ' . strip_tags($response);
        }
    }

    return [
        'success'  => false,
        'error'    => $errorMessage,
        'httpCode' => $httpCode
    ];
}

/**
 * Send standard HTML + plain text email via AWS SES SendEmail action
 */
function sendAwsSesEmail($subject, $htmlBody, $textBody, $replyToEmail, array $config) {
    $sender    = $config['sender_email'];
    $recipient = $config['recipient_email'];

    $params = [
        'Source'                            => $sender,
        'Destination.ToAddresses.member.1' => $recipient,
        'Message.Subject.Data'             => $subject,
        'Message.Subject.Charset'          => 'UTF-8',
        'Message.Body.Html.Data'            => $htmlBody,
        'Message.Body.Html.Charset'         => 'UTF-8',
        'Message.Body.Text.Data'            => $textBody,
        'Message.Body.Text.Charset'         => 'UTF-8',
    ];

    if ($replyToEmail !== '' && filter_var($replyToEmail, FILTER_VALIDATE_EMAIL)) {
        $params['ReplyToAddresses.member.1'] = $replyToEmail;
    }

    return executeAwsSesApiRequest('SendEmail', $params, $config);
}

/**
 * Send raw MIME email (with attachments) via AWS SES SendRawEmail action
 */
function sendAwsSesRawEmail($rawMimeData, array $config) {
    $sender    = $config['sender_email'];
    $recipient = $config['recipient_email'];

    $params = [
        'Source'                 => $sender,
        'Destinations.member.1' => $recipient,
        'RawMessage.Data'        => base64_encode($rawMimeData)
    ];

    return executeAwsSesApiRequest('SendRawEmail', $params, $config);
}

