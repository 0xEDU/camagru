<?php

// CREATE TABLE IF NOT EXISTS comments (
//     id SERIAL PRIMARY KEY,
//     image_id VARCHAR(255) NOT NULL,
//     username INT NOT NULL,
//     comment TEXT NOT NULL
// );
class CommentsRepository {
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

    public function getComments($image_id) {
        $sql = "SELECT username, comment FROM comments WHERE image_id = :image_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':image_id' => $image_id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($image_id, $username, $comment) {
        $sql = "INSERT INTO comments (image_id, username, comment) VALUES (:image_id, :username, :comment)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':image_id' => $image_id, ':username' => $username, ':comment' => $comment]);
    }

    public function deleteAll($image_id) {
        $sql = "DELETE FROM comments WHERE image_id = :image_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':image_id' => $image_id]);
    }

    public function updateUsername($oldusername, $newusername) {
        $sql = "UPDATE comments SET username = :newusername WHERE username = :oldusername";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':newusername' => $newusername, ':oldusername' => $oldusername]);
    }
}