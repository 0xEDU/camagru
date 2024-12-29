<?php

class Config {
    public static function getConnectionString() {
        $driver = 'pgsql';
        $host = 'localhost';
        $port = 5432;
        $dbname = 'camagru';

        return sprintf('%s:host=%s;port=%d;dbname=%s', $driver, $host, $port, $dbname);
    }

    public static function getUsername() {
        return 'root';
    }

    public static function getPassword() {
        return 'root';
    }
}