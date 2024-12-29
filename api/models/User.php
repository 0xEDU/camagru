<?php

class User {
    public $id;       // Primary key
    public $name;     // User name
    public $email;    // User email
    public $password; // User password (hashed)

    public function __construct($name, $email, $password, $id = null) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
    }
}