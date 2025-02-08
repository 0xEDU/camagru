<?php

class LikeRepository {
	private $pdo;

	public function __construct() {
		$dsn = Config::getConnectionString();
		$username = Config::getUsername();
		$password = Config::getPassword();

		try {
			$this->pdo = new PDO($dsn, $username, $password);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOException $e) {
			error_log("Connection failed: " . $e->getMessage());
		}
	}

	public function create($image_id, $username) {
		$sql = "INSERT INTO likes (image_id, username) VALUES (:image_id, :username)";
		$stmt = $this->pdo->prepare($sql);

		$stmt->execute([
			':image_id' => $image_id,
			':username' => $username
		]);

		return $this->pdo->lastInsertId();
	}

	public function delete($image_id, $username) {
		$sql = "DELETE FROM likes WHERE image_id = :image_id AND username = :username";
		$stmt = $this->pdo->prepare($sql);

		$stmt->execute([
			':image_id' => $image_id,
			':username' => $username
		]);

		return $stmt->rowCount();
	}

	public function deleteALl($image_id) {
		$sql = "DELETE FROM likes WHERE image_id = :image_id";
		$stmt = $this->pdo->prepare($sql);

		$stmt->execute([
			':image_id' => $image_id
		]);

		return $stmt->rowCount();
	}

	public function getLikesFromUsername($username) {
		$sql = "SELECT image_id FROM likes WHERE username = :username";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute([
			':username' => $username
		]);

		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function isLiked($like) {
		$sql = "SELECT COUNT(*) as liked FROM likes WHERE image_id = :image_id AND username = :username";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute([
			':image_id' => $like->image_id,
			':username' => $like->username
		]);

		return $stmt->fetch(PDO::FETCH_ASSOC);
	}
}