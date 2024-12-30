<?php

class User {
    public $id;       // User ID
    public $username; // User name
    public $email;    // User email
    public $password; // User password (hashed)

    public function __construct($username, $email, $password, $id = null) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }
}