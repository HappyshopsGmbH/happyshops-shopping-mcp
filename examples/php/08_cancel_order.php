<?php
declare(strict_types=1);

require __DIR__ . '/client.php';

echo "WARNING: cancelOrder changes state. Only run this with explicit user confirmation." . PHP_EOL;

$orderId = env('DEMO_ORDER_ID', '<ORDER_ID>');
$email = env('DEMO_EMAIL', 'user@example.com');

$res = callTool('cancelOrder', [
    'orderId' => $orderId,
    'email'   => $email,
]);

echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
