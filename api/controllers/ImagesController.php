<?php

class ImagesController
{
	public function handleGetByIdRequest($id)
	{
		$imagePath = 'imgs/' . $id . '.png';
		if (file_exists($imagePath)) {
			header('Content-Type: image/png');
			readfile($imagePath);
		} else {
			http_response_code(404);
			echo json_encode(['error' => 'Image not found']);
		}
	}


	public function handlePostRequest()
	{
		$rawData = file_get_contents('php://input');
		$data = json_decode($rawData, true);

		$image = $data['image'];
		list($type, $image) = explode(';', $image);
		list(, $image) = explode(',', $image);
		$image = base64_decode($image);

		$id = uniqid();
		file_put_contents('imgs/captures/' . $id . '.png', $image);

		header('Content-Type: application/json');
		echo json_encode([
			'data' => [
				'id' => $id
			]
		]);
	}

	public function handleGetSuperposablesRequest() {
		$superposables = array_diff(scandir('imgs/superposables'), array('..', '.'));
		$superposables = array_map(function ($superposable) {
			$superposable = file_get_contents('imgs/superposables/' . $superposable);
			return 'data:image/png;base64,' . base64_encode($superposable);
		}, $superposables);
		$superposables = array_map(function ($superposable) {
			return [
				'id' => 'draggable-image-' . uniqid(),
				'src' => $superposable
			];
		}, $superposables);
		$superposables = array_values($superposables);

		header('Content-Type: application/json');
		echo json_encode([
			'data' => $superposables
		]);
	}
}
