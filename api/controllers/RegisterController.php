<?php

class RegisterController
{
	private $userRepository;

	public function __construct() {
		$this->userRepository = new UserRepository();
	}

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

	public function handlePostRequest()
	{
		$data = json_decode(file_get_contents('php://input'), true);

		// Validate and sanitize inputs
		$username = $data['username'] ?? '';
		$email = $data['email'] ?? '';
		$password = $data['password'] ?? '';

		// Regular expressions for validation
		$nameRegex = '/^[a-zA-Z0-9]+$/';
		$emailRegex = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
		$passwordRegex = '/^[\w!@#$%^&*()-+=~]+$/';

		// Validate name
		if (!preg_match($nameRegex, $username)) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid name.']);
			return;
		}

		// Validate email
		if (!preg_match($emailRegex, $email)) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid email format.']);
			return;
		}

		// Validate password
		if (!preg_match($passwordRegex, $password)) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid password.']);
			return;
		}

		// Sanitize inputs to prevent injection attacks
		$username = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');
		$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
		$password = htmlspecialchars($password, ENT_QUOTES, 'UTF-8');

		// Create the user
		$user = new User($username, $email, $password);
		try {
			list($id, $token) = $this->userRepository->create($user);
			if (!$id) {
				http_response_code(400);
				echo json_encode(['error' => 'Username or email already exists.']);
				return;
			}
			$this->send_confirmation_email($email, $token);
			http_response_code(201);
			echo json_encode(['success' => 'User registered successfully.']);
		} catch (Exception $e) {
			http_response_code(500);
			echo json_encode(['error' => 'Failed to register user.']);
		}
	}

	private function send_confirmation_email($email, $token)
	{
		$to = $email;
		$subject = "Account Confirmation";
		$message = "Click the link below to confirm your account: http://localhost:8042/confirm?token=" . $token;
		$headers = "From: no-reply@camagru.com";

		mail($to, $subject, $message, $headers);
	}

	public function handleConfirmationRequest()
	{
		$token = $_GET['token'] ?? '';
		$user = $this->userRepository->getUserByToken($token);
		
		if (!$user) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid token.']);
			return;
		}
		$this->userRepository->confirmUser($user['id']);
		// You can close this window now
		http_response_code(200);
		echo 'Your account has been confirmed, you can close this window now!';
	}
}