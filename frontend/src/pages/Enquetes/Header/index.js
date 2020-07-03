import React from 'react';

import {IoMdCheckmarkCircleOutline} from 'react-icons/io';
import './styles.css';


const Header = () => {
    return(
        <header className="header">
            <div className="box-flex">
                <h1>
                    Sistema de Votação
                </h1>
                <IoMdCheckmarkCircleOutline size={25}/>
            </div>
        </header>
    )
}

export default Header;