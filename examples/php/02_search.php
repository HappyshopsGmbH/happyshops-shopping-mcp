<?php
declare(strict_types=1);

require __DIR__ . '/client.php';

$searchPhrase = env('DEMO_SEARCH_PHRASE', 'Ravensburger');

$res = callTool('searchProduct', [
    'searchPhrase' => $searchPhrase,
    'limit' => 20,
    'page'  => 1,
]);

echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
