<?php 
    class Enquete {
        private $id;
        private $status_id;
        private $titulo;
        private $data_inicio;
        private $data_fim;
        private $created_at;
        private $deleted_at;

        public function __get($atributo){
            return $this->$atributo;
        }
        public function __set($atributo,$valor){
            $this->$atributo = $valor;
		    return $this;
        }
    }
?>