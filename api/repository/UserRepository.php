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
        if ($this->getUserByEmail($user->email) || $this->getUserByUsername($user->username)) {
            return false;
        }
        $sql = "INSERT INTO users (email, username, password) VALUES (:email, :username, :password)";
        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':username' => $user->username,
            ':email' => $user->email,
            ':password' => password_hash($user->password, PASSWORD_BCRYPT), // Hashing the password
        ]);

        return $this->pdo->lastInsertId();
    }

    public function getUserByEmail($email) {
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':email' => $email]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByUsername($username) {
        $sql = "SELECT * FROM users WHERE username = :username";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':username' => $username]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}