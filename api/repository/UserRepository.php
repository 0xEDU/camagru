<?php

class UserRepository
{
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

    public function create(User $user) {
        $sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':name' => $user->name,
            ':email' => $user->email,
            ':password' => password_hash($user->password, PASSWORD_BCRYPT), // Hashing the password
        ]);

        return $this->pdo->lastInsertId();
    }
}