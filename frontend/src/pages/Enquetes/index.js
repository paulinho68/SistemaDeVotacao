import React from 'react';
import './styles.css';

import Header from './Header/index';
import Cadastro from './Cadastrar/index';
import EnquetesContainer from './Listar/index';

const Home = () => {
    return(
        <div className="container">
            <Header />
            <Cadastro />
            <EnquetesContainer />
            <footer className="footer">© Copyright - SignoWeb</footer>
        </div>
    )
}

export default Home;