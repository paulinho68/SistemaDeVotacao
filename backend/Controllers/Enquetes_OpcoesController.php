<?php 
require_once "Config/conexao.php";
require_once "Models/Opcao.php";
require_once "Services/OpcoesServices.php";
require_once "Controllers/Enquetes_OpcoesController.php";


class EnquetesOpcoesController{
    public function index(){
        
    }

    public function create($enquete_id,$opcao_id){
        try{
            $conexao = new Conexao();
            $conexao = $conexao->conectar();
            // //Cadastrando na tabela pivô:
            $query = "INSERT INTO `enquetes_opcoes` (`id`, `enquetes_id`, `opcoes_id`) VALUES (NULL, $enquete_id, $opcao_id)";
            $stmt = $conexao->prepare($query);
            $resultado = $stmt->execute();
        }catch(PDOExecption $e) {
            return false;
        }

        return true;
    }
}
?>




