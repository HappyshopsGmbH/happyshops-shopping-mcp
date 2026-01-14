<?php
declare(strict_types=1);

require __DIR__ . '/client.php';

$cartId = env('DEMO_CART_ID', '<CART_ID>');
$email = env('DEMO_EMAIL', 'user@example.com');
$paymentMethod = env('DEMO_PAYMENT_METHOD', 'paypal');

$billingAddress = [
    'firstName'   => 'Max',
    'lastName'    => 'Mustermann',
    'streetName'  => 'Musterstrasse',
    'houseNumber' => '1',
    'postalCode'  => '12345',
    'city'        => 'Berlin',
    'country'     => 'DE',
    'email'       => $email,
];

$res = callTool('createOrder', [
    'paymentMethod'  => $paymentMethod,
    'cartId'         => $cartId,
    'billingAddress' => $billingAddress,
]);

echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
echo PHP_EOL . "IMPORTANT: Always show the external payment link returned by createOrder." . PHP_EOL;
