<?php

class SettingsController
{
	private $userRepository;

	public function __construct() {
		$this->userRepository = new UserRepository();
        $this->imageRepository = new ImageRepository();
        $this->likeRepository = new LikeRepository();
        $this->commentsRepository = new CommentsRepository();
	}

    public function handleGetRequest()
    {
        $htmlContent = $this->loadView('settings');
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


    public function handleGetEmailNotifcationRequest($username) {
        $user = $this->userRepository->getUserByUsername($username);
        if ($user) {
            http_response_code(200);
            echo json_encode(array("receive_email" => $user['receive_email']));
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "User not found"));
        }
    }

    public function handlePutRequest($username) {
        $data = json_decode(file_get_contents('php://input'), true);
        $receiveEmail = $data['receive_email'];
        $user = $this->userRepository->getUserByUsername($username);
        
        if ($user) {
            $this->userRepository->updateReceiveEmail($username, $receiveEmail);
            http_response_code(200);
            echo json_encode(array("message" => "Email notification preference updated"));
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "User not found"));
        }
    }

    public function handlePutUpdateUsername($oldusername) {
        $data = json_decode(file_get_contents('php://input'), true);
        $newusername = $data['new_username'];

		$usernameRegex = '/^[a-zA-Z0-9]+$/';

		if (!preg_match($usernameRegex, $newusername) || !preg_match($usernameRegex, $oldusername)) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid username.']);
			return;
		}

        $user = $this->userRepository->getUserByUsername($newusername);
        if ($user) {
            http_response_code(409);
            echo json_encode(array("error" => "Username already exists"));
            return;
        }

        $username = htmlspecialchars($newusername, ENT_QUOTES, 'UTF-8');
        $oldusername = htmlspecialchars($oldusername, ENT_QUOTES, 'UTF-8');

        $user = $this->userRepository->getUserByUsername($oldusername);
        if ($user && $_SESSION['user'] == $oldusername) {
            $this->commentsRepository->updateUsername($newusername, $oldusername);
            $this->imageRepository->updateUsername($newusername, $oldusername);
            $this->likeRepository->updateUsername($newusername, $oldusername);
            $this->userRepository->updateUsername($newusername, $oldusername);
            $_SESSION['user'] = $newusername;

            http_response_code(200);
            echo json_encode(array("message" => "Username updated"));
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "User not found"));
        }
    }

    public function handlePutUpdateEmail($username) {
        $data = json_decode(file_get_contents('php://input'), true);
        $newemail = $data['new_email'];

        if (!filter_var($newemail, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email.']);
            return;
        }

        $user = $this->userRepository->getUserByEmail($newemail);
        if ($user) {
            http_response_code(409);
            echo json_encode(array("error" => "Email already exists"));
            return;
        }

        $email = htmlspecialchars($newemail, ENT_QUOTES, 'UTF-8');
        $username = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');

        $user = $this->userRepository->getUserByUsername($username);
        if ($user && $_SESSION['user'] == $username) {
            $this->userRepository->updateEmail($username, $email);
            $_SESSION['email'] = $email;

            http_response_code(200);
            echo json_encode(array("message" => "Email updated"));
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "User not found"));
        }
    }

    public function handlePutUpdatePassword($username) {
        $data = json_decode(file_get_contents('php://input'), true);
        $newpassword = $data['new_password'];

        $passwordRegex = '/^[\w!@#$%^&*()-+=~]+$/';

        if (!preg_match($passwordRegex, $newpassword)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid password.']);
            return;
        }

        $password = htmlspecialchars($newpassword, ENT_QUOTES, 'UTF-8');
        $username = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');

        $user = $this->userRepository->getUserByUsername($username);
        if ($user && $_SESSION['user'] == $username) {
            $this->userRepository->updatePassword($username, $password);

            http_response_code(200);
            echo json_encode(array("message" => "Password updated"));
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "User not found"));
        }
    }
}