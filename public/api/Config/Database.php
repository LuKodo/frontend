<?php
namespace API\Config;
use PDO;
class Database
{
    private static $instance = null;
    private $connection;
    private $host = 'localhost';
    private $database = 'virtualstore';
    private $username = 'root';
    private $password = '123456';
    private $port = 3308;

    private function __construct() {
        $this->connection = new PDO('mysql:host=' . $this->host . ';port=' . $this->port . ';dbname=' . $this->database, $this->username, $this->password);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }


    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance->connection;
    }
}