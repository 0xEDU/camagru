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
		$sql = "INSERT INTO images (image_id) VALUES (:image_id)";
		$stmt = $this->pdo->prepare($sql);

		$stmt->execute([
			':image_id' => $image->image_id
		]);

		return $this->pdo->lastInsertId();
	}
}