<?php

class RegisterController
{
	public function handleRequest()
	{
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			$this->handleGetRequest();
		}
	}

	private function handleGetRequest()
	{
		$htmlContent = $this->loadView('register');
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