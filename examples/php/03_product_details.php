<?php
declare(strict_types=1);

require __DIR__ . '/client.php';

$sku = env('DEMO_SKU', '100080');

$res = callTool('getProduct', [
    'sku' => $sku,
    'imagesAsUrlOnly' => true,
]);

echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
