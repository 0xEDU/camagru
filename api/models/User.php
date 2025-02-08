<?php

class User {
    public $id;        // User ID
    public $username;  // User name
    public $email;     // User email
    public $password;  // User password (hashed)
    public $token;     // Registration token
    public $is_active; // User is active

    public function __construct($username, $email, $password, $id = null, $token = null, $is_active = 0, $receive_emai = true) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->token = $token;
        $this->is_active = $is_active;
        $this->receive_email = $receive_email;
    }
}