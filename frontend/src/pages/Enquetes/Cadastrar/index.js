import React, {useEffect} from 'react';

import Noty from 'noty';

import api from '../../../services/api';

import './styles.css';
import './animations.css';

const Cadastro = () => {

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll(".input");
        const data_inicio = document.getElementById('data_inicio').value.split('-');
        const data_fim = document.getElementById('data_fim').value.split('-');

        let inicio_menor_que_fim = data_inicio[0] < data_fim[0];//verificando pelo ano
    
        if(!inicio_menor_que_fim){//verificando pelo mês
            inicio_menor_que_fim = data_inicio[1] < data_fim[1]
        }
        if(!inicio_menor_que_fim){//verificando pelo dia
            inicio_menor_que_fim = data_inicio[2] < data_fim[2];
        }
    
        let validado = true;
        let msg = "";
    
        inputs.forEach(input => {
            if(input.value === ""){
                input.style.borderColor = 'red';
                validado = false;
                msg = "Todos os campos são obrigatórios!"
            }else{
                input.style.borderColor = '#001EBA';
            }
        })
    
        if(!validado){
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: msg,
                timeout: 4000
            }).show();
        }else if(!inicio_menor_que_fim){
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: "A data de fim não pode ser menor ou igual a data de início.",
                timeout: 4000
            }).show();
        }else{
            
            document.getElementById('botao').disabled = true;
            const form = document.getElementById('form')
            const data = new FormData(form);

            await api.post('/enquetesCreate.php',data).then(res=>{
                new Noty({
                    type: 'success',
                    layout: 'topRight',
                    text: "Enquete Cadastrada com sucesso",
                    timeout: 4000
                }).show();
                window.location.reload()
            }).catch(err => {
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: "Não foi possível cadastrar a sua Enquete.",
                    timeout: 4000
                }).show();
                console.log(err);
            })

        }
    }


    useEffect( () => {
        const ulSquares = document.querySelector("ul.squares");

        for(let i = 0; i< 20; i++ ){
            const li = document.createElement("li");

            const size = Math.floor(Math.random() * (120 - 10) + 10);
            const position = Math.random() * (99 - 1) + 1;
            const delay = Math.random() * (5 - 0.1) + 0.1;
            const duration = Math.random() * (24 - 12) + 12;

            li.style.width = `${size}px`;
            li.style.height = `${size}px`;
            li.style.left = `${position}%`;
            li.style.animationDelay = `${delay}s`;
            li.style.animationDuration = `${duration}s`;
            li.style.animationTimingFunction = `cubic-bezier(${Math.random(),Math.random(),Math.random(),Math.random()})`;

            ulSquares.appendChild(li);
        }
    }, []);


    return(
        <main className="form-container">
            <h3>Criar Enquete</h3>
            <form className="form" id="form" method="POST">
                <div className="input-box">
                    <label>Título <span style={{color:'red'}}>*</span></label>
                    <input className="input" name="titulo" type="text" placeholder="ex: Qual é o melhor time?" id="titulo"/>
                </div>
                <div className="input-box">
                    <label>1º Opção de Voto <span style={{color:'red'}}>*</span></label>
                    <input className="input" name="opcao1" type="text" placeholder="ex: Time A" id="opcao1"/>
                </div>
                <div className="input-box">
                    <label>2º Opção de Voto <span style={{color:'red'}}>*</span></label>
                    <input className="input" name="opcao2" type="text" placeholder="ex: Time B" id="opcao2"/>
                </div>
                <div className="input-box">
                    <label>3º Opção de Voto <span style={{color:'red'}}>*</span></label>
                    <input className="input" name="opcao3" type="text" placeholder="ex: Time C" id="opcao2"/>
                </div>
                <div className="input-box">
                    <label>Data de Início <span style={{color:'red'}}>*</span></label>
                    <input className="input" name="data_inicio" id="data_inicio" type="date"/>
                </div>
                <div className="input-box">
                    <label>Data de Fim <span style={{color:'red'}}>*</span></label>
                    <input className="input" name="data_fim" id="data_fim" type="date"/>
                </div>
                <button type="submit" id="botao" onClick={e => handleFormSubmit(e)} className="btn-cadastrar">Cadastrar</button>
            </form>

            <ul className="squares">
                <li></li>
            </ul>
        </main>
    );
}

export default Cadastro;