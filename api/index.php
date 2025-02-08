<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, operation, username");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

spl_autoload_register(function ($class) {
    if (file_exists(__DIR__ . '/./controllers/' . $class . '.php')) {
        require __DIR__ . '/./controllers/' . $class . '.php';
    } elseif (file_exists(__DIR__ . '/./core/' . $class . '.php')) {
        require __DIR__ . '/./core/' . $class . '.php';
    } elseif (file_exists(__DIR__ . '/./repository/' . $class . '.php')) {
        require __DIR__ . '/./repository/' . $class . '.php';
    } elseif (file_exists(__DIR__ . '/./config/' . $class . '.php')) {
        require __DIR__ . '/./config/' . $class . '.php';
    } elseif (file_exists(__DIR__ . '/./models/' . $class . '.php')) {
        require __DIR__ . '/./models/' . $class . '.php';
    }
});

error_log("Request received: " . $_SERVER['REQUEST_URI']);

$router = new Router();
$router->route();