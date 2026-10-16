<?php

header('Content-Type: application/json; charset=utf-8');

define('SECURE_MAILER', true);
require_once __DIR__ . '/aws-ses-helper.php';
$config = require __DIR__ . '/email-config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid JSON request.'
    ]);
    exit;
}

// 1. Name parsing (supports unified 'name' or separate 'firstName'/'lastName')
$name      = trim((string)($data['name'] ?? $data['fullName'] ?? ''));
$firstName = trim((string)($data['firstName'] ?? $data['first_name'] ?? ''));
$lastName  = trim((string)($data['lastName'] ?? $data['last_name'] ?? ''));

if ($name === '' && ($firstName !== '' || $lastName !== '')) {
    $name = trim($firstName . ' ' . $lastName);
} elseif ($name !== '' && $firstName === '') {
    $parts = explode(' ', $name, 2);
    $firstName = $parts[0];
    $lastName  = $parts[1] ?? '';
}

// 2. Core Contact Info
$email     = trim((string)($data['email'] ?? $data['workEmail'] ?? $data['work_email'] ?? ''));
$company   = trim((string)($data['company'] ?? ''));
$role      = trim((string)($data['role'] ?? $data['jobTitle'] ?? $data['job_title'] ?? ''));
$phone     = trim((string)($data['phone'] ?? ''));
$formType  = trim((string)($data['formType'] ?? $data['form-name'] ?? ''));

// 3. Design Partnership specific fields
$journey    = trim((string)($data['journey'] ?? ''));
$systems    = trim((string)($data['systems'] ?? ''));
$frequency  = trim((string)($data['frequency'] ?? ''));
$difficulty = trim((string)($data['difficulty'] ?? ''));
$nextStep   = trim((string)($data['next'] ?? $data['nextStep'] ?? ''));

// 4. Other form fields (pricing, demo, general)
$interest  = trim((string)($data['interest'] ?? ''));
$teamSize  = trim((string)($data['teamSize'] ?? $data['team_size'] ?? ''));
$product   = trim((string)($data['product'] ?? ''));
$message   = trim((string)($data['message'] ?? $data['comments'] ?? ''));

$isDesignPartnership = ($formType === 'design-partnership' || $journey !== '');
$isPricing = ($formType === 'pricing' || $teamSize !== '' || $product !== '');

// Validate required fields
if ($isDesignPartnership) {
    if ($name === '' || $email === '' || $company === '' || $role === '' || $journey === '') {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'message' => 'Please complete all five required fields (Name, Work email, Company, Role, and Critical journey).'
        ]);
        exit;
    }
} else {
    if ($name === '' || $email === '' || $company === '') {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'message' => 'Please complete all required fields.'
        ]);
        exit;
    }
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid work email address.'
    ]);
    exit;
}

if ($phone !== '' && !preg_match('/^\d{10}$/', $phone)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid 10-digit phone number.'
    ]);
    exit;
}

// Subject and Heading
if ($isDesignPartnership) {
    $subject = 'New Design Partnership Conversation Request - ' . $name . ' (' . $company . ')';
    $heading = 'New Design-Partnership Conversation Request';
} elseif ($isPricing) {
    $subject = 'New Pricing Consultation Request - ' . $name . ' (' . $company . ')';
    $heading = 'New Pricing Consultation / Proposal Request';
} else {
    $subject = 'New Conversation Request - ' . $name . ' (' . $company . ')';
    $heading = 'New Conversation Request';
}

// Build HTML email body
$htmlBody = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; padding: 20px;">';
$htmlBody .= '<div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">';
$htmlBody .= '<h2 style="color: #2563eb; margin-top: 0;">' . htmlspecialchars($heading) . '</h2>';
$htmlBody .= '<p style="color: #64748b; font-size: 13px;">Submitted on zuvvix.com</p><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">';
$htmlBody .= '<table style="width: 100%; border-collapse: collapse;">';
$htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b; width: 175px;"><strong>Name:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($name) . '</td></tr>';
$htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Work Email:</strong></td><td style="padding: 6px 0;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #2563eb;">' . htmlspecialchars($email) . '</a></td></tr>';
$htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Company:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($company) . '</td></tr>';

if ($role !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Role / Responsibility:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($role) . '</td></tr>';
}
if ($journey !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Critical Journey / Use Case:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . nl2br(htmlspecialchars($journey)) . '</td></tr>';
}
if ($systems !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Interacting Systems:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($systems) . '</td></tr>';
}
if ($frequency !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Release Frequency:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($frequency) . '</td></tr>';
}
if ($difficulty !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Quality Difficulty Context:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . nl2br(htmlspecialchars($difficulty)) . '</td></tr>';
}
if ($nextStep !== '') {
    $nextLabel = ($nextStep === 'conversation') ? 'Working conversation' : (($nextStep === 'context') ? 'Share more context first' : $nextStep);
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Preferred Next Step:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($nextLabel) . '</td></tr>';
}
if ($phone !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($phone) . '</td></tr>';
}
if ($interest !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Area of Interest:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($interest) . '</td></tr>';
}
if ($teamSize !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Team Size:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($teamSize) . '</td></tr>';
}
if ($product !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Product:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . htmlspecialchars($product) . '</td></tr>';
}
if ($message !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Message:</strong></td><td style="padding: 6px 0; color: #0f172a;">' . nl2br(htmlspecialchars($message)) . '</td></tr>';
}

$htmlBody .= '</table></div></body></html>';

// Build plain-text fallback
$textBody = $heading . " on zuvvix.com\n\n";
$textBody .= "Name: " . $name . "\n";
$textBody .= "Work Email: " . $email . "\n";
$textBody .= "Company: " . $company . "\n";
if ($role !== '')       $textBody .= "Role / Responsibility: " . $role . "\n";
if ($journey !== '')    $textBody .= "Critical Journey / Use Case: " . $journey . "\n";
if ($systems !== '')    $textBody .= "Interacting Systems: " . $systems . "\n";
if ($frequency !== '')  $textBody .= "Release Frequency: " . $frequency . "\n";
if ($difficulty !== '') $textBody .= "Quality Difficulty: " . $difficulty . "\n";
if ($nextStep !== '')   $textBody .= "Preferred Next Step: " . $nextStep . "\n";
if ($phone !== '')      $textBody .= "Phone: " . $phone . "\n";
if ($interest !== '')   $textBody .= "Area of Interest: " . $interest . "\n";
if ($teamSize !== '')   $textBody .= "Team Size: " . $teamSize . "\n";
if ($product !== '')    $textBody .= "Product: " . $product . "\n";
if ($message !== '')    $textBody .= "Message: " . $message . "\n";

// Send directly via AWS SES REST API
$result = sendAwsSesEmail($subject, $htmlBody, $textBody, $email, $config);

if (!$result['success']) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Email delivery failed: ' . ($result['error'] ?? 'Unknown error')
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Thank you! We will be in touch within 24 hours.'
]);
