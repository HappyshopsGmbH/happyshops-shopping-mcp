<?php
declare(strict_types=1);

require __DIR__ . '/client.php';

$sku = env('DEMO_SKU', '100080');
$country = env('DEMO_COUNTRY', 'DE');

$addRes = callTool('addToCart', [
    'add' => [
        ['sku' => $sku, 'quantity' => 1]
    ],
    'country' => $country,
]);

echo "addToCart:" . PHP_EOL;
echo json_encode($addRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

// NOTE: Depending on your API response, cartId may be included in $addRes.
// Set DEMO_CART_ID in .env (or extract from response once you know the field name).
$cartId = env('DEMO_CART_ID', '<CART_ID>');

$cartRes = callTool('getCart', [
    'cartId' => $cartId,
]);

echo PHP_EOL . "getCart:" . PHP_EOL;
echo json_encode($cartRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
