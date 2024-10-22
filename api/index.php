<?php
spl_autoload_register(function ($class) {
    if (file_exists(__DIR__ . '/./controllers/' . $class . '.php')) {
        require __DIR__ . '/./controllers/' . $class . '.php';
    } elseif (file_exists(__DIR__ . '/./core/' . $class . '.php')) {
        require __DIR__ . '/./core/' . $class . '.php';
    }
});

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// log the request
error_log("Request received: " . $_SERVER['REQUEST_URI']);

$router = new Router();
$router->route();