<?php

class Image {
	public $id;       // Image ID
	public $image_id; // Image name
	public $likes;    // Image likes

	public function __construct($image_id, $id = null, $likes = 0) {
		$this->id = $id;
		$this->image_id = $image_id;
		$this->likes = $likes;
	}
}