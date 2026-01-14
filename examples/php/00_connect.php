<?php
declare(strict_types=1);

require __DIR__ . '/client.php';

echo "MCP_BASE_URL=" . env('MCP_BASE_URL') . PHP_EOL;
if (getenv('MCP_POST_URL')) {
    echo "MCP_POST_URL=" . getenv('MCP_POST_URL') . PHP_EOL;
}

echo PHP_EOL . "Listing tools..." . PHP_EOL;
$tools = listTools();

echo json_encode($tools, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
