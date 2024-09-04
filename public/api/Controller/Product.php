<?php
namespace API\Controller;

use API\Config\Model;

class Product
{
    private $model;

    public function __construct()
    {
        $this->model = (new Model('productofinal'));
    }

    public function getAll()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $sql;
        if (isset($data['query'])) {
            $whereIn = [
                'sql' => 'prefijo = :prefijo AND nuevo > 0 AND estado = "true" AND (codigo LIKE :query OR nombre LIKE :query)',
                'params' => [
                    ':prefijo' => $data['sede'],
                    ':query' => '%' . $data['query'] . '%',
                ]
            ];
        } else {
            $whereIn = [
                'sql' => 'prefijo = :prefijo AND nuevo > 0 AND estado = "true"',
                'params' => [
                    ':prefijo' => $data['sede'],
                ]
            ];
        }

        if (isset($data['categoria']) && $data['categoria'] != 'all') {
            $whereIn['sql'] .= ' AND categoria = :categoria';
            $whereIn['params'][':categoria'] = $data['categoria'];
        }

        $limit = null;
        $offset = null;

        if (isset($data['limit']) && $data['limit']) {
            $limit = $data['limit'];
        }

        if (isset($data['offset']) && $data['offset']) {
            $offset = $data['offset'];
        }

        $res = $this->model->all($limit, $offset, $whereIn);
        if ($res) {
            return json_encode($res);
        } else {
            return json_encode([]);
        }
    }
}
