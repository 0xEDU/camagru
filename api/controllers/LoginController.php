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

		$usernameRegex = '/^[a-zA-Z0-9]+$/';
		$passwordRegex = '/^[\w!@#$%^&*()-+=~]+$/';

		if (!preg_match($usernameRegex, $username)) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid username or password.']);
			return;
		}

		if (!preg_match($passwordRegex, $password)) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid username or password.']);
			return;
		}

		$username = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');
		$password = htmlspecialchars($password, ENT_QUOTES, 'UTF-8');

		$user = $this->userRepository->getUserByUsername($username);

		if ($user && $user['is_active'] && password_verify($password, $user['password'])) {
			http_response_code(200);
			echo json_encode([
				'success' => 'User logged.',
				'email' => $user['email']
			]);
		} else {
			http_response_code(401);
			echo json_encode(['error' => 'Invalid username or password.']);
		}
	}
}