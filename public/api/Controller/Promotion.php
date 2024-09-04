<?php
namespace API\Controller;

use API\Config\Model;

class Promotion
{
    private $model;

    public function __construct()
    {
        $this->model = (new Model('promocion'));
    }

    public function getAll()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $limit = null;
        $offset = null;

        if (isset($data['limit']) && $data['limit']) {
            $limit = $data['limit'];
            $offset = $data['offset'] - 1;
        }

        $res = $this->model->all($limit, $offset, null);
        $total = $this->model->count(null);
        $pages = ceil($total / $limit);

        if ($res) {
            return json_encode(['results' => $res, 'total' => $total, 'pages' => $pages]);
        } else {
            return json_encode([]);
        }

        if ($res) {
            return json_encode($res);
        } else {
            return json_encode([]);
        }
    }

    public function upsert()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $where = [
            'sql' => 'id = :id',
            'params' => [
                ':id' => $data['id']
            ]
        ];

        $exists = $this->model->find($where);
        $res = null;

        !empty($exists) ?
            $res = $this->model->update($data['id'], ['rowIndex' => $data['rowIndex'], 'columnIndex' => $data['columnIndex'], 'imageName' => $data['imageName']]) :
            $res = $this->model->create(['rowIndex' => $data['rowIndex'], 'columnIndex' => $data['columnIndex'], 'imageName' => $data['imageName']]);

        if ($res) {
            return json_encode(['success' => true, 'message' => 'Se guardo correctamente']);
        } else {
            return json_encode(["error" => "No se pudo guardar"]);
        }
    }

    public function delete($id)
    {
        $res = $this->model->delete($id);
        if ($res) {
            return json_encode(['success' => true, 'message' => 'Se elimino correctamente']);
        } else {
            return json_encode(["error" => "No se pudo eliminar"]);
        }
    }
}
