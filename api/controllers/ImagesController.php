<?php

class ImagesController
{
	public function handleRequest()
	{
		if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			$this->handlePostRequest();
		}
	}

	private function handlePostRequest()
	{
		$rawData = file_get_contents('php://input');
		$data = json_decode($rawData, true);

		error_log("Received image: " . $data['image']);

		// TODO: Convert to png and save the image to the database
	}
}
