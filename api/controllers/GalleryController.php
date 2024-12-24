<?php

class GalleryController
{
	public function handleRequest()
	{
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			$this->handleGetRequest();
		}
	}

	private function handleGetRequest()
	{
		$captures = $this->getCaptures();

		$htmlContent = $this->loadView('gallery', ['captures' => $captures]);
		header('Content-Type: application/json');
		echo json_encode(['data' => $htmlContent]);
	}

	private function getCaptures() {
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
