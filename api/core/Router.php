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
			'#^/gallery/likes$#' => ['controller' => 'GalleryController', 'method' => 'handleGetLikesRequest'],
			'#^/gallery$#' => ['controller' => 'GalleryController', 'method' => 'handleRequest'],
			'#^/register$#' => ['controller' => 'RegisterController', 'method' => 'handleRequest'],
			'#^/confirm$#' => ['controller' => 'RegisterController', 'method' => 'handleConfirmationRequest'],
			'#^/login$#' => ['controller' => 'LoginController', 'method' => 'handleGetRequest'],
			'#^/gallery/(\w+)/comments$#' => ['controller' => 'GalleryController', 'method' => 'handleGetCommentsRequest'],
			'#^/settings$#' => ['controller' => 'SettingsController', 'method' => 'handleGetRequest'],
			'#^/settings/(\w+)/receive-emails$#' => ['controller' => 'SettingsController', 'method' => 'handleGetEmailNotifcationRequest'],
		],
		'POST' => [
			'#^/images$#' => ['controller' => 'ImagesController', 'method' => 'handlePostRequest'],
			'#^/register$#' => ['controller' => 'RegisterController', 'method' => 'handlePostRequest'],
			'#^/login$#' => ['controller' => 'LoginController', 'method' => 'handlePostRequest'],
			'#^/logout$#' => ['controller' => 'LoginController', 'method' => 'handleLogoutRequest'],
			'#^/gallery/(\w+)/like$#' => ['controller' => 'GalleryController', 'method' => 'handlePostRequest'],
			'#^/gallery/(\w+)/comments$#' => ['controller' => 'GalleryController', 'method' => 'handleAddCommentRequest'],
		],
		'DELETE' => [
			'#^/gallery/(\w+)$#' => ['controller' => 'GalleryController', 'method' => 'handleDeleteRequest'],
		],
		'PUT' => [
			'#^/settings/(\w+)/receive-emails$#' => ['controller' => 'SettingsController', 'method' => 'handlePutRequest'],
		]
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
				if (isset($route['auth']) && $route['auth'] === true) {
					$this->checkAuth();
				}
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

	private function checkAuth()
	{
		if (!isset($_SESSION['user'])) {
			http_response_code(401);
			echo json_encode(['error' => 'Unauthorized']);
			exit;
		}
	}
}
