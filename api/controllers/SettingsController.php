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

        $user = $this->userRepository->getUserByUsername($newusername);
        if ($user) {
            http_response_code(409);
            echo json_encode(array("error" => "Username already exists"));
            return;
        }

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
}