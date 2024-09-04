<?php
namespace API\Controller;

use API\Config\Model;

class Headquarter
{
    private $db;

    public function __construct()
    {
        $this->model = (new Model('sede'));
    }

    public function getOne()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $whereIn = [
            'sql' => 'prefijo = :prefijo',
            'params' => [
                ':prefijo' => $data['prefijo']
            ]
        ];

        $response = $this->model->find($whereIn);
        return json_encode($response);
    }

    public function getAll()
    {
        $prefijos = ['LA', 'SB', 'SBE', 'SSC', 'SURT'];
        $placeholders = implode(',', array_fill(0, count($prefijos), '?'));

        $whereIn = [
            'sql' => "prefijo IN ($placeholders)",
            'params' => $prefijos
        ];

        $res = $this->model->all(null, null, $whereIn);
        if ($res) {
            return json_encode($res);
        } else {
            return json_encode([
                'error' => 'Not Found'
            ]);
        }
    }
}
