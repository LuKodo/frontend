<?php
namespace API\Controller;

use API\Config\Model;

class Carousel
{
    private $model;
    public function __construct()
    {
        $this->model = (new Model('carousel'));
    }

    public function getAll()
    {
        $res = $this->model->all();
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
            $res = $this->model->update($data['id'], ['imageName' => $data['imageName'], 'order' => $data['order']]) :
            $res = $this->model->create(['imageName' => $data['imageName'], 'order' => $data['order']]);

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
