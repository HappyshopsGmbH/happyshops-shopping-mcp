<?php
declare(strict_types=1);

require __DIR__ . '/client.php';

$email = env('DEMO_EMAIL', 'user@example.com');
$code = getenv('DEMO_CODE') ?: null;
$authKey = getenv('DEMO_AUTH_KEY') ?: null;

if ($code === null && $authKey === null) {
    echo "Step 1: request one-time code (valid ~10 minutes)" . PHP_EOL;
    $step1 = callTool('getAuthKey', ['email' => $email]);
    echo json_encode($step1, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
    echo PHP_EOL . "Now set DEMO_CODE in .env and rerun this script." . PHP_EOL;
    exit(0);
}

if ($authKey === null && $code !== null) {
    echo "Step 2: exchange code for authKey" . PHP_EOL;
    $step2 = callTool('getAuthKey', ['email' => $email, 'code' => $code]);
    echo json_encode($step2, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
    echo PHP_EOL . "Now set DEMO_AUTH_KEY from the response and rerun to call getUser." . PHP_EOL;
    exit(0);
}

echo "Fetching user data with authKey" . PHP_EOL;
$userRes = callTool('getUser', ['email' => $email, 'authKey' => $authKey]);

echo json_encode($userRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
