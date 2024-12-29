<?php

class User {
    public $name;     // User name
    public $email;    // User email
    public $password; // User password (hashed)

    public function __construct($name, $email, $password) {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
    }
}