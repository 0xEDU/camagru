<?php

class GalleryController
{
	private $imageRepository;

	public function __construct()
	{
		$this->imageRepository = new ImageRepository();
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
}
