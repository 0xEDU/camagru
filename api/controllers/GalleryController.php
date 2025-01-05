<?php

class GalleryController
{
	private $imageRepository;
	private $likeRepository;

	public function __construct()
	{
		$this->imageRepository = new ImageRepository();
		$this->likeRepository = new LikeRepository();
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
		$capturesDir = __DIR__ . '/../imgs/captures';
		$captures = [];
		$likes = [];

		$files = scandir($capturesDir);
		foreach ($files as $file) {
			if (in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif'])) {
				$captures[] = 'http://localhost:8042/imgs/captures/' . $file;
				$id = explode('.', $file)[0];
				$likes[] = $this->imageRepository->getLikes($id);
			}
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
}
