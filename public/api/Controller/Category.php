<?php
namespace API\Controller;

use API\Config\Model;

class Category
{
    private $model;

    public function __construct()
    {
        $this->model = (new Model('categoria'));
    }

    public function getAll()
    {
        $res = $this->model->all(null, null);
        if ($res) {
            return json_encode($res);
        } else {
            return json_encode([]);
        }
    }

    public function findWhere()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $where = [
            'sql' => 'estado = :estado',
            'params' => [
                ':estado' => 1
            ]
        ];

        $limit = null;
        $offset = null;

        if (isset($data['limit']) && $data['limit']) {
            $limit = $data['limit'];
            $offset = ($data['offset'] - 1) * $limit;
        }

        $res = $this->model->all($limit, $offset, $where);
        $total = $this->model->count();
        $pages = ceil($total / $limit);

        if ($res) {
            return json_encode(['results' => $res, 'total' => $total, 'pages' => $pages]);
        } else {
            return json_encode([]);
        }
    }

    public function upsert()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $estado = $data['estado'] ? 1 : 0;
        $condition = [
            'sql' => 'id = :id',
            'params' => [
                ':id' => $data['id']
            ]
        ];
        $exists = $this->model->find($condition);
        $res = null;

        !empty($exists) ?
            $res = $this->model->update($data['id'], ['descripcion' => $data['descripcion'], 'estado' => $estado]) :
            $res = $this->model->create(['descripcion' => $data['descripcion'], 'estado' => $estado]);

        if ($res) {
            return json_encode(['success' => true, 'message' => 'Se guardo correctamente']);
        } else {
            return json_encode(["error" => "No se pudo guardar"]);
        }
    }

    public function delete()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $res = $this->model->delete($data['id']);

        if ($res) {
            return json_encode(['success' => true, 'message' => 'Se elimino correctamente']);
        } else {
            return json_encode(["error" => "No se pudo eliminar"]);
        }
    }
}
