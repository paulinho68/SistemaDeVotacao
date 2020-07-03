import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import './votacaoStyles.css';
// import {IoMdCheckmarkCircleOutline, IoMdCheckmarkCircle} from 'react-icons/io';
import {FaCheckCircle, FaArrowLeft} from 'react-icons/fa';
import api from '../../services/api';

const Votacao = () => {
    const history = useHistory();
    const [opcoes, setOpcoes] = useState([]);

    const handleBack = () => {
        history.push('/');
    }

    const getOpcoes = async () => {
        const id = sessionStorage.getItem('id');
        await api.get(`/opcoes.php?id=${id}`).then(res => {
            setOpcoes(res.data);
        })
    }

    const inserirVoto = async (id) => {
        const card = document.getElementById(id);
        card.classList.remove('hidden');

        const icons = document.getElementsByClassName('icon');        

        for (let i = 0; i < icons.length; i++) {
            if(icons[i].getAttribute('data-id') !== id){
                icons[i].classList.add('hidden');
            } 
        }

        const resultado = await api.put(`opcoesInserirVoto.php?id=${id}`);
        if(resultado.status === 200 && resultado.data === true){
            getOpcoes();
        }
    }

    useEffect(() => {
        getOpcoes();
    }, []);

    return(
        <div className="container-voto">
            <header className="header">
                <div className="box-flex">
                    <p onClick={handleBack}>
                        <FaArrowLeft size={32}/>
                    </p>
                    <h1>
                        Sistema de Votação
                    </h1>
                </div>
            </header>
            <h3>{sessionStorage.getItem('title')}</h3>
            <main className="vote-container">
                {opcoes ? opcoes.map( opcao => (
                    <div className="options" key={opcao.id}>
                        <div className="card-header">
                            <h5>{opcao.nome}</h5>
                            <p className="icon hidden" data-id={opcao.id} id={opcao.id}>
                                <FaCheckCircle size={36}/>
                            </p>
                        </div>
                        <div className="card-body">
                            <p>{opcao.quantidade_votos} Votos</p>
                        </div>
                        <div className="card-footer">
                            <button key={opcao.id} onClick={() => inserirVoto(opcao.id)}>
                                VOTAR
                            </button>
                        </div>
                    </div>
                )): null}
            </main>
            <footer className="footer">© Copyright - SignoWeb</footer>
        </div>
    )
}

export default Votacao;