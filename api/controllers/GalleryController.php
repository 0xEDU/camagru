<?php

class GalleryController
{
	public function handleRequest()
	{
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			$this->handleGetRequest();
		}
	}

	private function handleGetRequest($requestedPage = 1)
	{
		$page = isset($_GET['page']) ? $_GET['page'] : 1;
		$perPage = 20;

		$captures = $this->getCaptures();

		$totalCaptures = count($captures);
		$captures = array_slice($captures, ($page - 1) * $perPage, $perPage);

		$view = $requestedPage === 1 ? 'gallery' : 'captures';
		$htmlContent = $this->loadView($view, ['captures' => $captures]);
		header('Content-Type: application/json');
		echo json_encode([
			'data' => $htmlContent,
			'page' => $page,
			'hasMore' => ($page * $perPage) < $totalCaptures
		]);
	}

	private function getCaptures()
	{
		$capturesDir = __DIR__ . '/../imgs/captures';
		$captures = [];

		$files = scandir($capturesDir);
		foreach ($files as $file) {
			if (in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif'])) {
				$captures[] = 'http://localhost:8042/imgs/captures/' . $file;
			}
		}
		return $captures;
	}

	private function loadView($view, $data = [])
	{
		extract($data);
		ob_start();
		include __DIR__ . '/../views/' . $view . '.php';
		return ob_get_clean();
	}
}
