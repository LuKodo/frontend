<?php
namespace API\Controller;

use API\Config\Model;
use API\Helper\EncryptHelper;

class User
{
    private $model;
    private $helper;

    public function __construct()
    {
        $this->model = (new Model('user'));
        $this->helper = new EncryptHelper();
    }

    public function getOne()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $password = $data['password'];
        $response = $this->helper->encryptData($password);
        return json_encode([
            'password' => $response,
        ]);
    }

    public function login()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $condition = [
            'sql' => 'name = :username',
            'params' => [
                ':username' => $data['username']
            ]
        ];
        $res = $this->model->find($condition);
        if ($res) {
            return json_encode($res);
        } else {
            return json_encode([
                'error' => 'Username not found'
            ]);
        }
    }
}
