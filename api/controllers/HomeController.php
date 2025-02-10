<?php

class HomeController
{
	public function handleRequest()
	{
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			$this->handleGetRequest();
		}
	}

	private function handleGetRequest()
	{
		$htmlContent = $this->loadView('home');
		header ('Content-Type: application/json');
		echo json_encode(['data' => $htmlContent]);
	}

	public function handleFrontPageRequest()
	{
		$htmlContent = $this->loadView('front-page');
		header ('Content-Type: application/json');
		echo json_encode(['data' => $htmlContent]);
	}

	private function loadView($view, $data = [])
	{
		extract($data);
		ob_start();
		include __DIR__ . '/../views/' . $view . '.php';
		return ob_get_clean();
	}
}