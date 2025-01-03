<?php

class LoginController {
	private $userRepository;

	public function __construct() {
		$this->userRepository = new UserRepository();
	}

	public function handleGetRequest()
	{
		$htmlContent = $this->loadView('login');
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