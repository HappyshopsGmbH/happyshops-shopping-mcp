<?php
declare(strict_types=1);

require __DIR__ . '/client.php';

$res = callTool('getFlowGraph', ['flowType' => 'all']);
echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
