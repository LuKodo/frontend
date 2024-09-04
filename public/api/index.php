<?php
require_once __DIR__ . '/Config/CORS.php';
require_once __DIR__ . '/Config/FileManager.php';
require_once __DIR__ . '/Config/Router.php';
require_once __DIR__ . '/Config/Database.php';
require_once __DIR__ . '/Config/Model.php';
require_once __DIR__ . '/Helper/Encrypt.php';
require_once __DIR__ . '/Controller/User.php';
require_once __DIR__ . '/Controller/Headquarter.php';
require_once __DIR__ . '/Controller/Product.php';
require_once __DIR__ . '/Controller/Carousel.php';
require_once __DIR__ . '/Controller/Category.php';
require_once __DIR__ . '/Controller/Promotion.php';
require_once __DIR__ . '/Controller/File.php';
require_once __DIR__ . '/Controller/Delivery.php';

header("Content-Type: application/json");

API\Config\CORS::handle();

use API\Config\Router;
use API\Controller\Carousel;
use API\Controller\Category;
use API\Controller\FileController;
use API\Controller\Headquarter;
use API\Controller\Promotion;
use API\Controller\Product;
use API\Controller\User;
use API\Controller\Delivery;

$router = new API\Config\Router();

// Usuarios
$router->post('#^/users$#', User::class, 'getOne');
$router->post('#^/login$#', User::class, 'login');

$router->get('#^/headquarters$#', Headquarter::class, 'getAll');
$router->post('#^/headquarter$#', Headquarter::class, 'getOne');

// Productos
$router->post('#^/products$#', Product::class, 'getAll');

// Carrusel
$router->get('#^/carousel$#', Carousel::class, 'getAll');
$router->post('#^/carousel$#', Carousel::class, 'upsert');
$router->delete('#^/carousel/(.+)$#', Carousel::class, 'delete');

$router->post('#^/promotion$#', Promotion::class, 'getAll');
$router->post('#^/promotion/upsert$#', Promotion::class, 'upsert');
$router->delete('#^/promotion/(.+)$#', Promotion::class, 'delete');


// Categorias
$router->get('#^/category$#', Category::class, 'getAll');
$router->post('#^/category$#', Category::class, 'findWhere');
$router->post('#^/category/upsert$#', Category::class, 'upsert');

$router->post('#^/upload/(.+)/(.+)$#', FileController::class, 'upload');
$router->get('#^/download/(.+)$#', FileController::class, 'download');
$router->get('#^/getFile/(.+)/(.+)$#', FileController::class, 'getUrl');

$router->post('#^/delivery$#', Delivery::class, 'create_delivery');
$router->post('#^/deliverydetail$#', Delivery::class, 'create_delivery_detail');

$request = $_SERVER['REQUEST_METHOD'];
$path = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';

echo $router->route($request, $path);