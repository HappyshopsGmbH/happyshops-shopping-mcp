<?php
declare(strict_types=1);

/**
 * Minimal JSON-RPC client for Remote MCP.
 *
 * - Sends JSON-RPC via HTTP POST to MCP_BASE_URL (or a dedicated message endpoint if you set MCP_POST_URL)
 * - Expects a JSON response (synchronous). If your server responds asynchronously via SSE only,
 *   use the Node/Python examples or implement an SSE listener in PHP.
 */

function env(string $name, ?string $fallback = null): string
{
    $v = getenv($name);
    if ($v === false || $v === '') {
        $v = $fallback;
    }
    if ($v === null) {
        throw new RuntimeException("Missing env var: {$name}");
    }
    return $v;
}

/**
 * Prefer MCP_POST_URL if you extracted a dedicated message endpoint from SSE.
 * Otherwise, fallback to MCP_BASE_URL.
 */
function mcpPostUrl(): string
{
    $post = getenv('MCP_POST_URL');
    if ($post !== false && trim($post) !== '') {
        return rtrim(trim($post), '/');
    }
    return rtrim(env('MCP_BASE_URL'), '/');
}

function jsonRpc(string $method, ?array $params = null, int $timeoutSec = 30): array
{
    $id = 'rpc_' . bin2hex(random_bytes(8));

    $payload = [
        'jsonrpc' => '2.0',
        'id'      => $id,
        'method'  => $method,
    ];
    if ($params !== null) {
        $payload['params'] = $params;
    }

    $url = mcpPostUrl();

    $ch = curl_init($url);
    if ($ch === false) {
        throw new RuntimeException("Failed to init curl");
    }

    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => ['content-type: application/json', 'accept: application/json'],
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_SLASHES),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => $timeoutSec,
        CURLOPT_CONNECTTIMEOUT => 10,
    ]);

    $raw = curl_exec($ch);
    if ($raw === false) {
        $err = curl_error($ch);
        curl_close($ch);
        throw new RuntimeException("cURL error: {$err}");
    }

    $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $ct = (string) (curl_getinfo($ch, CURLINFO_CONTENT_TYPE) ?: '');
    curl_close($ch);

    if ($httpCode >= 400) {
        throw new RuntimeException("HTTP {$httpCode}: {$raw}");
    }

    if (stripos($ct, 'application/json') === false) {
        throw new RuntimeException(
            "Server did not return JSON (content-type={$ct}). " .
            "If your server responds via SSE only, use Node/Python examples or implement SSE handling in PHP."
        );
    }

    /** @var array $resp */
    $resp = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);

    // Typical JSON-RPC response includes same id
    if (isset($resp['error']) && $resp['error']) {
        throw new RuntimeException('JSON-RPC error: ' . json_encode($resp['error'], JSON_UNESCAPED_SLASHES));
    }

    // Some servers wrap response differently; return as-is if no "result"
    return $resp['result'] ?? $resp;
}

function listTools(): array
{
    return jsonRpc('tools/list');
}

function callTool(string $name, array $arguments): array
{
    return jsonRpc('tools/call', ['name' => $name, 'arguments' => $arguments]);
}
