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
        if ($this->getUserByEmail($user->email)) {
            return false;
        }
        $sql = "INSERT INTO users (email, name, password) VALUES (:email, :name, :password)";
        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':name' => $user->name,
            ':email' => $user->email,
            ':password' => password_hash($user->password, PASSWORD_BCRYPT), // Hashing the password
        ]);

        return $user->email;
    }

    public function getUserByEmail($email) {
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':email' => $email]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}