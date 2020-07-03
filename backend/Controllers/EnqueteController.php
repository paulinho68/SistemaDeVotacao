<?php 
require_once "Config/conexao.php";
require_once "Models/Enquete.php";
require_once "Services/EnquetesServices.php";
require_once "Controllers/OpcaoController.php";


class EnqueteController{
    public function index(){
        $conexao = new Conexao;

        $enquete = new Enquete();
        $enqueteService = new EnqueteService($conexao,$enquete);

        $return = $enqueteService->index();
        
        return $return;
    }

    public function create(){
        $enquete = new Enquete();
        $enquete->__set('titulo', $_POST['titulo']);
        $enquete->__set('data_inicio', $_POST['data_inicio']);
        $enquete->__set('data_fim', $_POST['data_fim']);
        $enquete->__set('status_id', 1);

        $conexao = new Conexao();

        $enqueteService = new EnqueteService($conexao,$enquete);
        $enquete_id = $enqueteService->create();

        $opcao = new OpcaoController();
        $result = $opcao->create($enquete_id);

        return $result;
    }

    public function delete(){
        $enquete = new Enquete();
        $conexao = new Conexao();

        $enqueteService = new EnqueteService($conexao,$enquete);

        $id = $_GET['id'];
        $result = $enqueteService->delete($id);

        return $result;
    }
}
?>