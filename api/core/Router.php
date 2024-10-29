<?php

class Router
{
	private $routes = [
		'GET' => [
			'#^/home$#' => ['controller' => 'HomeController', 'method' => 'handleRequest'],
			'#^/$#' => ['controller' => 'HomeController', 'method' => 'handleRequest'],
			'#^/images/(\w+)$#' => ['controller' => 'ImagesController', 'method' => 'handleGetByIdRequest'],
			'#^/images$#' => ['controller' => 'ImagesController', 'method' => 'handleGetRequest'],
			'#^/superposables$#' => ['controller' => 'ImagesController', 'method' => 'handleGetSuperposablesRequest'],
		],
		'POST' => [
			'#^/images$#' => ['controller' => 'ImagesController', 'method' => 'handlePostRequest'],
		],
	];

	public function route()
	{
		$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
		$requestMethod = $_SERVER['REQUEST_METHOD'];

		if (!isset($this->routes[$requestMethod])) {
			header("HTTP/1.1 405 Method Not Allowed");
			echo json_encode(array("error" => "Method not allowed"));
			return;
		}

		foreach ($this->routes[$requestMethod] as $pattern => $route) {
			if (preg_match($pattern, $requestUri, $matches)) {
				$controllerName = $route['controller'];
				$method = $route['method'];

				if (class_exists($controllerName)) {
					$controller = new $controllerName();
					array_shift($matches);

					call_user_func_array([$controller, $method], $matches);
					return;
				}
			}
		}
	}
}
