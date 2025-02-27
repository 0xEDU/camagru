<?php

class GalleryController
{
	private $imageRepository;
	private $likeRepository;
	private $commentsRepository;

	public function __construct()
	{
		$this->userRepository = new UserRepository();
		$this->imageRepository = new ImageRepository();
		$this->likeRepository = new LikeRepository();
		$this->commentsRepository = new CommentsRepository();
	}

	public function handleRequest()
	{
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			$this->handleGetRequest();
		}
	}

	private function handleGetRequest()
	{
		$page = isset($_GET['page']) ? $_GET['page'] : 1;
		$perPage = 20;

		$images = $this->getImages();
		$captures = $images[0];
		$likes = $images[1];

		$totalCaptures = count($captures);
		$captures = array_slice($captures, ($page - 1) * $perPage, $perPage);

		$view = $page === 1 ? 'gallery' : 'captures';
		$htmlContent = $this->loadView($view, [
			'captures' => $captures,
			'likes' => $likes
		]);
		header('Content-Type: application/json');
		echo json_encode([
			'data' => $htmlContent,
			'page' => $page,
			'hasMore' => ($page * $perPage) < $totalCaptures
		]);
	}

	private function getImages()
	{
		$captures = [];
		$likes = [];

		$images = $this->imageRepository->getAll();

		foreach ($images as $image) {
			$captures[] = [
				'url' => 'http://localhost:8042/imgs/captures/' . $image['image_id'] . '.png',
				'username' => $image['username']
			];
			$likes[] = $image['likes'];
		}
		return [$captures, $likes];
	}

	private function loadView($view, $data = [])
	{
		extract($data);
		ob_start();
		include __DIR__ . '/../views/' . $view . '.php';
		return ob_get_clean();
	}

	public function handlePostRequest($id)
	{
		$operation = $_SERVER['HTTP_OPERATION'];
		$username = $_SERVER['HTTP_USERNAME'];
		if ($operation !== 'add' && $operation !== 'remove' || !$username) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid operation.']);
			return;
		} else if ($operation === 'add') {
			$this->likeRepository->create($id, $username);
			$likes = $this->imageRepository->incrementLike($id);
			echo json_encode(['likes' => $likes]);
		} else {
			$this->likeRepository->delete($id, $username);
			$likes = $this->imageRepository->decrementLike($id);
			echo json_encode(['likes' => $likes]);
		}
	}

	public function handleGetLikesRequest() {
		$username = $_SERVER['HTTP_USERNAME'];
		if (!$username) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid username.']);
			return;
		}
		$likes = $this->likeRepository->getLikesFromUsername($username);
		$likes = array_map(function ($like) {
			return $like['image_id'];
		}, $likes);
		echo json_encode(['likes' => $likes]);
	}

	public function handleDeleteRequest($id)
	{
		$image = $this->imageRepository->getByImageId($id);
		if (isset($_SESSION['user']) && $_SESSION['user'] !== $image['username']) {
			http_response_code(403);
			echo json_encode(['error' => 'Unauthorized.']);
			return;
		}
		$this->imageRepository->delete($id);
		$this->likeRepository->deleteAll($id);
		$this->commentsRepository->deleteAll($id);
		$filename = __DIR__ . '/../imgs/captures/' . $id . '.png';
		if (file_exists($filename)) {
			unlink($filename);
		}
		http_response_code(200);
		echo json_encode(['success' => 'Capture deleted.']);
	}
	
	public function handleGetCommentsRequest($id)
	{
		$comments = $this->commentsRepository->getComments($id);
		
		$htmlContent = $this->loadView('comments', [
			'comments' => $comments
		]);
		echo json_encode(['data' => $htmlContent]);
	}

	public function handleAddCommentRequest($id)
	{
		$data = json_decode(file_get_contents('php://input'), true);
		$username = $data['username'] ?? '';
		$comment = $data['comment'] ?? '';

		$commentRegex = '/^[\w\s!@#$%^&*()-+=~]+$/';
		

		if (!preg_match($commentRegex, $comment) || strlen($comment) > 255) {
			http_response_code(400);
			echo json_encode(['error' => 'Invalid comment.']);
			return;
		}

		$comment = htmlspecialchars($comment, ENT_QUOTES, 'UTF-8');

		$this->commentsRepository->create($id, $username, $comment);
		$comments = $this->commentsRepository->getComments($id);
		$htmlContent = $this->loadView('comments', [
			'comments' => $comments
		]);
		echo json_encode(['data' => $htmlContent]);
		$owner = $this->imageRepository->getUsernameById($id);
		$user = $this->userRepository->getUserByUsername($owner['username']);
		if ($user && $user['receive_email']) {
			$to = $user['email'];
			$subject = 'New comment on your capture';
			$message = 'Hi ' . $owner . ', your capture has a new comment: ' . $comment;
			mail($to, $subject, $message);
		}
	}
}
