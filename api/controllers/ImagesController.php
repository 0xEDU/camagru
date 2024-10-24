<?php

class ImagesController
{
	public function handleRequest()
	{
		switch($_SERVER['REQUEST_METHOD']) {
			case 'POST':
				$this->handlePostRequest();
				break;
			default:
				http_response_code(405);
		}
	}

	private function handlePostRequest()
	{
		$rawData = file_get_contents('php://input');
		$data = json_decode($rawData, true);

		$image = $data['image'];
		list($type, $image) = explode(';', $image);
		list(, $image) = explode(',', $image);
		$image = base64_decode($image);

		$id = uniqid();
		file_put_contents('imgs/' . $id . '.png', $image);
	
		header('Content-Type: application/json');
		echo json_encode(['id' => $id]);
	}
}
