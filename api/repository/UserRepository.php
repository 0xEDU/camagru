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
        $sql = "INSERT INTO users (email, username, password, token) VALUES (:email, :username, :password, :token)";
        $stmt = $this->pdo->prepare($sql);
        $token = bin2hex(random_bytes(32)); // Generating a random token

        $stmt->execute([
            ':username' => $user->username,
            ':email' => $user->email,
            ':password' => password_hash($user->password, PASSWORD_BCRYPT), // Hashing the password
            ':token' => $token,
        ]);

        return array($this->pdo->lastInsertId(), $token);
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

    public function getUserByToken($token) {
        $sql = "SELECT * FROM users WHERE token = :token";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':token' => $token]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function confirmUser($id) {
        $sql = "UPDATE users SET is_active = true WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
    }
}