<?php 

class Conexao {

    public function conectar (){
        try{
            $conexao = new PDO('mysql:host=localhost;dbname=desafio_signoweb','root', '');
            return $conexao;
        }catch (PDOException $e){
            echo 'Erro ' .$e->getCode()  . 'Mensagem: ' . $e->getMessage();
        }
    }

}

?>
