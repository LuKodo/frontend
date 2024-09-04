<?php
namespace API\Controller;

use API\Config\Model;

class Delivery
{
    private $pedidos;
    private $detalles_pedidos;

    public function __construct()
    {
        $this->pedidos = (new Model('pedidos'));
        $this->detalles_pedido = (new Model('detalles_pedido'));
    }

    public function get_delivery($id)
    {
        $where = [
            'sql' => 'id = :id',
            'params' => [
                ':id' => $id
            ]
        ];

        $res = $this->pedidos->find($where);
        if ($res) {
            return json_encode($res);
        } else {
            return json_encode([]);
        }
    }

    public function create_delivery()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $res = $this->pedidos->create([
            'fecha_pedido' => $data['fecha_pedido'],
            'id_estado' => $data['id_estado'],
            'prefijo' => $data['prefijo'],
            'total' => $data['total'],
            'nombres' => $data['nombres'],
            'apellidos' => $data['apellidos'],
            'telefono' => $data['telefono'],
            'direccion' => $data['direccion'],
            'forma_pago' => $data['forma_pago'],
        ]);

        if ($res) {
            return json_encode(['success' => true, 'message' => 'Se guardo correctamente', 'id' => $this->pedidos->last_id()]);
        } else {
            return json_encode(['error' => 'No se pudo guardar']);
        }
    }

    public function create_delivery_detail()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $res = false;

        foreach ($data as $key => $value) {
            $res = $this->detalles_pedido->create([
                'id_pedido' => $value['id_pedido'],
                'cantidad' => $value['cantidad'],
                'precio_unitario' => $value['precio_unitario'],
                'subtotal' => $value['subtotal'],
                'codigo' => $value['codigo'],
            ]);

            if (!$res) {
                break;
            }
        }

        if ($res) {
            return json_encode(['success' => true, 'message' => 'Se guardo correctamente']);
        } else {
            return json_encode(['error' => 'No se pudo guardar']);
        }
    }
}
