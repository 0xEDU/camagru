<?php
require_once 'controllers/ImageController.php';

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// log the request
error_log("Request received: " . $_SERVER['REQUEST_URI']);

$imageController = new ImageController();

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($requestUri === '/images') {
	$imageController->handleRequest();
} else {
	header("HTTP/1.1 404 Not Found");
	echo json_encode(array("error" => "Not found"));
}
?>
