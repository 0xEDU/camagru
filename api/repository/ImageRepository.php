<?php

// Table:
// CREATE TABLE IF NOT EXISTS images (
//     id SERIAL PRIMARY KEY,
//     image_id VARCHAR(255) NOT NULL UNIQUE,
//     likes INT DEFAULT 0
// );
class ImageRepository {
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

	public function create($image) {
		$sql = "INSERT INTO images (image_id, username) VALUES (:image_id, :username)";
		$stmt = $this->pdo->prepare($sql);

		$stmt->execute([
			':image_id' => $image->image_id,
			':username' => $image->username
		]);

		return $this->pdo->lastInsertId();
	}

	public function getAll() {
		$sql = "SELECT * FROM images";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();

		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}


	public function getLikes($image_id) {
		$sql = "SELECT likes FROM images WHERE image_id = :image_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute([':image_id' => $image_id]);

		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function incrementLike($image_id) {
		$sql = "UPDATE images SET likes = likes + 1 WHERE image_id = :image_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute([':image_id' => $image_id]);

		return $this->getLikes($image_id)['likes'];
	}

	public function decrementLike($image_id) {
		$sql = "UPDATE images SET likes = likes - 1 WHERE image_id = :image_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute([':image_id' => $image_id]);

		return $this->getLikes($image_id)['likes'];
	}

	public function getUsernameById($image_id) {
		$sql = "SELECT username FROM images WHERE image_id = :image_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute([':image_id' => $image_id]);

		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function delete($image_id) {
		$sql = "DELETE FROM images WHERE image_id = :image_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute([':image_id' => $image_id]);
	}
}