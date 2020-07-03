<?php 
    class Opcao {
        private $id;
        private $quantidade_votos;
        private $nome;

        public function __get($atributo){
            return $this->$atributo;
        }
        public function __set($atributo,$valor){
            $this->$atributo = $valor;
		    return $this;
        }
    }
?>