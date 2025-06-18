<?php
if (isset($_GET['mode']) && $_GET['mode'] == 'admin') {
    $controllerName = ucfirst($_GET['controller'] ?? 'dashboard') . 'Controller';
} else {
    $controllerName = ucfirst($_GET['controller'] ?? 'article') . 'Controller';
}

$actionName = $_GET['action'] ?? 'index';
require "./controllers/${controllerName}.php";

// // // Initiate
$controllerObject = new $controllerName;
$controllerObject->$actionName();