<?php
    class EnqueteService{

        private $conexao;
        private $enquete;

        public function __construct(Conexao $conexao, Enquete $enquete){
            $this->conexao = $conexao->conectar();
            $this->enquete = $enquete;
        }

        public function index(){
            
            try {
                try {
                    //inserindo Dados na tabela Enquetes
                    $query = "SELECT e.id, e.titulo, e.data_inicio, e.data_fim, e.created_at, e.deleted_at, s.nome as status_nome FROM `enquetes` as e join status as s on e.status_id = s.id";
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
            $titulo = $this->enquete->__get('titulo');
            $data_inicio = $this->enquete->__get('data_inicio');
            $data_fim = $this->enquete->__get('data_fim');
            $status_id = $this->enquete->__get('status_id');
            $created_at = $this->enquete->__get('created_at');

            //cadastrando enquete
            
            try {
                try {
                    //inserindo Dados na tabela Enquetes
                    $query = "INSERT INTO enquetes (id, status_id, titulo, data_inicio, data_fim, created_at, deleted_at) VALUES (null, '$status_id', '$titulo' , '$data_inicio', '$data_fim' , null , NULL)";
                    $stmt = $this->conexao->prepare($query);
                    $stmt->execute();
                    $last_id = $this->conexao->lastInsertId();
                    
                    return $last_id;
                } catch(PDOExecption $e) {
                    $this->conexao->rollback();
                    print "Error!: " . $e->getMessage() . "</br>";
                }
            } catch( PDOExecption $e ) {
                print "Error!: " . $e->getMessage() . "</br>";
            }
   
        }

        public function update(){
            
        }

        public function delete($id){
            try {
                try {
                    //inserindo Dados na tabela Enquetes
                    $query = "delete from enquetes where id = $id";
                    $stmt = $this->conexao->prepare($query);
                    $result = $stmt->execute();
                    
                    return $result;
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