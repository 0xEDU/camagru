<?php

class Router
{
	public function route()
	{
		$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

		switch ($requestUri) {
			case '/home':
			case '/':
				$homeController = new HomeController();
				$homeController->handleRequest();
				break;
			case '/images':
				$imageController = new ImagesController();
				$imageController->handleRequest();
				break;
			default:
				header("HTTP/1.1 404 Not Found");
				echo json_encode(array("error" => "Not found"));
				break;
		}
	}
}
