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

	public function handlePostRequest() {
		$data = json_decode(file_get_contents('php://input'), true);

		$username = $data['username'];
		$password = $data['password'];

		$user = $this->userRepository->getUserByUsername($username);

		if ($user && $user['is_active'] && password_verify($password, $user['password'])) {
			http_response_code(200);
			echo json_encode(['success' => 'User logged.']);
		} else {
			http_response_code(401);
			echo json_encode(['error' => 'Invalid username or password.']);
		}
	}
}