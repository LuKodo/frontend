<?php
namespace API\Config;

use Api\Config\Database;
use PDO;

class Model
{
    protected $table;
    protected $db;

    public function __construct($table)
    {
        $this->table = $table;
        $this->db = Database::getInstance();
    }

    public function all($limit = null, $offset = null, $conditions = null)
    {
        $query = "SELECT * FROM {$this->table}";

        if ($conditions) {
            $query .= " WHERE {$conditions['sql']}";
        }

        if ($limit) {
            $query .= ' LIMIT ' . $limit;
        }

        if ($offset) {
            $query .= ' OFFSET ' . $offset;
        }

        $stmt = $this->db->prepare($query);

        if ($conditions) {
            $params = $conditions['params'];
            if (is_array($params)) {
                foreach ($params as $key => $value) {
                    if (is_int($key)) {
                        // Para parámetros posicionales (?)
                        $stmt->bindValue($key + 1, $value, PDO::PARAM_STR);
                    } else {
                        // Para parámetros nombrados (:nombre)
                        $stmt->bindValue($key, $value, PDO::PARAM_STR);
                    }
                }
            }
        }

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function sql($sql)
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find($conditions = null)
    {
        $query = 'SELECT * FROM ' . $this->table;

        if ($conditions) {
            $query .= ' WHERE ' . $conditions['sql'];
        }

        $stmt = $this->db->prepare($query);

        if ($conditions) {
            foreach ($conditions['params'] as $key => $value) {
                $stmt->bindValue("{$key}", $value);
            }
        }

        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $columns = '`' . implode('`, `', array_keys($data)) . '`';
        $values = ':' . implode(', :', array_keys($data));

        $stmt = $this->db->prepare("INSERT INTO {$this->table} ({$columns}) VALUES ({$values})");
        return $stmt->execute($data);
    }

    public function last_id()
    {
        return $this->db->lastInsertId();
    }

    public function update($id, $data)
    {
        $set = '';
        foreach ($data as $key => $value) {
            $set .= "`{$key}` = :{$key}, ";
        }
        $set = rtrim($set, ', ');
        $stmt = $this->db->prepare("UPDATE {$this->table} SET {$set} WHERE id = :id");
        $data = array_merge($data, ['id' => $id]);
        return $stmt->execute($data);
    }

    public function delete($id)
    {
        $stmt = $this->db->prepare("DELETE FROM {$this->table} WHERE id = ".$id);
        return $stmt->execute();
    }

    public function count($conditions = null)
    {
        $query = "SELECT COUNT(*) FROM {$this->table}";
        if ($conditions) {
            $query .= " WHERE {$conditions}";
        }
        $stmt = $this->db->prepare($query);

        if (isset($conditions)) {
            $params = $conditions['params'];
            if (is_array($params)) {
                foreach ($params as $key => $value) {
                    if (is_int($key)) {
                        // Para parámetros posicionales (?)
                        $stmt->bindValue($key + 1, $value, PDO::PARAM_STR);
                    } else {
                        // Para parámetros nombrados (:nombre)
                        $stmt->bindValue($key, $value, PDO::PARAM_STR);
                    }
                }
            }
        }
        $stmt->execute();
        return $stmt->fetchColumn();
    }
}
?>