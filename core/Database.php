<?php 

namespace Core;
use \PDO;
use \PDOException;

define('DB_HOST', 'i2cpbxbi4neiupid.cbetxkdyhwsb.us-east-1.rds.amazonaws.com');
define('DB_USERNAME', 'is4wk3kyo8g1ise9');
define('DB_PASSWORD', 'q1qkqdez8qa0qd8c');
define('DB_DATABASE', 'tsa7s6noqysj8fdd');

class Database {

    private $host;
    private $user;
    private $pass;
    private $dbname;

    private $dbh;
    public $conx = array();
    private $error;
    private $stmt;
    private $dbGetQuery;
    private static $instance = null;

    public function __construct() {
        // $this->host   = getenv('DB_HOST', 'localhost');
        // $this->user   = getenv('DB_USERNAME', 'mailbox');
        // $this->pass   = getenv('DB_PASSWORD', 'mailbox');
        // $this->dbname = getenv('DB_DATABASE', 'mailbox');
        $this->host   = DB_HOST;
        $this->user   = DB_USERNAME;
        $this->pass   = DB_PASSWORD;
        $this->dbname = DB_DATABASE;
        $this->setPDOConfig();
    }

    private function setPDOConfig(){
        // Set DSN
        $dsn = 'mysql:host=' . $this->host . ';port=3306;dbname=' . $this->dbname . ';charset=utf8';
        // Set options  PDO::ATTR_PERSISTENT
        $options = array(
            // PDO::ATTR_PERSISTENT    => false,
            PDO::ATTR_ERRMODE       => PDO::ERRMODE_EXCEPTION,
            // PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET utf8"
        );

        //Create a new PDO instance
        try {
            $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
            //var_dump( $this->dbh );
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
            var_dump($e); 
            print_r($this->error);
            exit();
        }
        //$this->dbGetQuery=array();
        //$this->bd = $this;
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this;
    }

    public function getQuery()
    {
        $str = str_replace(array("\n", "\r\n", "\r"), '', $this->dbGetQuery);
        return $str;
    }
    public function setQuery($query)
    {
        $this->dbGetQuery[] = $query;
    }

    public function query($query)
    {
        $this->dbGetQuery[] = $query;
        $this->stmt = $this->dbh->prepare($query);
        return $this;
    }

    public function execExist($table, $name, $value, $queryAdd = "")
    {
        $this->query("SELECT 1 FROM $table WHERE $name='$value' " . $queryAdd);
        $this->execute();
        return $this->stmt->fetchColumn();
    }

    public function getConnectionId()
    {
        $this->query("SELECT CONNECTION_ID()");
        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_ASSOC);
    }


    public function bind($param, $value, $type = null)
    {
        if (is_null($type)) {
            switch (true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }
        $this->stmt->bindValue($param, $value, $type);
    }


    // public function bindArray($array)
    // {
    //     foreach ($array as $key => $value) {
    //         bind($key, $value);
    //     }
    // }

    public function execute()
    {
        return $this->stmt->execute();
    }


    public function resultset()
    {
        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function single()
    {
        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_ASSOC);
    }


    public function execRowCount()
    {
        $this->execute();
        return $this->stmt->rowCount();
    }

    public function rowCount()
    {
        return $this->stmt->rowCount();
    }


    public function lastInsertId()
    {
        return $this->dbh->lastInsertId();
    }


    /**
     * Transactions allow multiple changes to a database all in one batch.
     */

    public function beginTransaction()
    {
        return $this->dbh->beginTransaction();
    }


    public function endTransaction()
    {
        return $this->dbh->commit();
    }


    public function cancelTransaction()
    {
        return $this->dbh->rollBack();
    }


    public function debugDumpParams()
    {
        return $this->stmt->debugDumpParams();
    }
}