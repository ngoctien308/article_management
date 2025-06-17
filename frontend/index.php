<?php

if (isset($_GET['mode']) && $_GET['mode'] == 'admin') {
    echo 'admin mode';
} else {
    // default: controller: user, action: index
    $controllerName = ucfirst($_GET['controller'] ?? 'article') . 'Controller';
    $actionName = $_GET['action'] ?? 'index';
    require "./controllers/${controllerName}.php";

    // // Initiate
    $controllerObject = new $controllerName;
    $controllerObject->$actionName();
}