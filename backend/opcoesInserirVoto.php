<?php

    require_once 'Controllers/OpcaoController.php';
    $opcao = new OpcaoController;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    echo json_encode($opcao->inserirVoto());
?>