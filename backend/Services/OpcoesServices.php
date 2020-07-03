<?php
    require_once "Config/conexao.php";
    class OpcoesService{

        private $conexao;
        private $opcao;

        public function __construct(Conexao $conexao, Opcao $opcao){
            $this->conexao = $conexao->conectar();
            $this->opcao = $opcao;
        }

        public function index($id){
            try {
                try {
                    $query = "SELECT opcoes.id, opcoes.nome, opcoes.quantidade_votos FROM `opcoes` INNER JOIN enquetes_opcoes on enquetes_opcoes.opcoes_id = opcoes.id where enquetes_id = $id";
                    $stmt = $this->conexao->prepare($query);
                    $stmt->execute();
                    $resultado = $stmt->fetchAll(PDO::FETCH_OBJ);
                    return $resultado;
                } catch(PDOExecption $e) {
                    $this->conexao->rollback();
                    print "Error!: " . $e->getMessage() . "</br>";
                    return false;
                }
            } catch( PDOExecption $e ) {
                print "Error!: " . $e->getMessage() . "</br>";
            }
            

        }

        public function create(){
        $nome = $this->opcao->__get('nome');
        $quantidade_votos = $this->opcao->__get('quantidade_votos');

        //cadastrando Opções
        
        try {
            try {
                //inserindo Dados na tabela Opções
                $query = "INSERT INTO opcoes (id, nome, quantidade_votos) VALUES (null, '$nome', '$quantidade_votos')";
                $stmt = $this->conexao->prepare($query);
                $stmt->execute();
                $opcao_id = $this->conexao->lastInsertId();

                return $opcao_id;

            } catch(PDOExecption $e) {
                $this->conexao->rollback();
                print "Error!: " . $e->getMessage() . "</br>";
            }
        } catch( PDOExecption $e ) {
            print "Error!: " . $e->getMessage() . "</br>";
        }
            
        }

        public function inserirVoto($qtd_votos){
            try {
                try {
                    $id = $_GET['id'];
                    $query = "update opcoes set quantidade_votos = $qtd_votos where id = $id";
                    $stmt = $this->conexao->prepare($query);
                    $resultado = $stmt->execute();
    
                    return $resultado;
    
                } catch(PDOExecption $e) {
                    $this->conexao->rollback();
                    print "Error!: " . $e->getMessage() . "</br>";
                }
            } catch( PDOExecption $e ) {
                print "Error!: " . $e->getMessage() . "</br>";
            }
            
        }
    }


?>