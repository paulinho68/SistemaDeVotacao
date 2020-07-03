<?php 
require_once "Config/conexao.php";
require_once "Models/Opcao.php";
require_once "Services/OpcoesServices.php";
require_once "Controllers/Enquetes_OpcoesController.php";


class OpcaoController{
    public function index(){
        $conexao = new Conexao();
        $opcao = new Opcao();

        $opcaoService = new OpcoesService($conexao,$opcao);
        $id = $_GET['id'];
        $resultado = $opcaoService->index($id);

        return $resultado;
    }

    public function create($enquete_id){
        $request_opcao = [];
        $request_opcao[0] = $_POST['opcao1'];
        $request_opcao[1] = $_POST['opcao2'];
        $request_opcao[2] = $_POST['opcao3'];

        for($i = 0; $i<=2; $i++){
            $opcao = new Opcao();
            $opcao->__set('nome', $request_opcao[$i]);
            $opcao->__set('quantidade_votos',0);

            $conexao = new Conexao();
            $opcaoService = new OpcoesService($conexao,$opcao);
            $opcao_id = $opcaoService->create();

            //inserindo dados na tabela pivô 
            $pivo = new EnquetesOpcoesController();
            $retorno = $pivo->create($enquete_id, $opcao_id);
        }

        return $retorno;


        return 'Inserido';
    }

    public function inserirVoto(){
        $conexao = new Conexao();
        $con = $conexao->conectar();
        $id = $_GET['id'];
        try {
            //inserindo Dados na tabela Opções
            $query = "SELECT quantidade_votos from opcoes where id = $id";
            $stmt = $con->prepare($query);
            $stmt->execute();

            $resultado = $stmt->fetch(PDO::FETCH_LAZY);
            $qtd_votos = intval($resultado['quantidade_votos']) + 1;

            $conexao = new Conexao();
            $opcao = new Opcao();

            $opcaoService = new OpcoesService($conexao,$opcao);
            $resultado = $opcaoService->inserirVoto($qtd_votos);
            
            return $resultado;

        } catch(PDOExecption $e) {
            $con->rollback();
            print "Error!: " . $e->getMessage() . "</br>";
        }
    }
}
?>

