import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/Enquetes/index';
import Votacao from './pages/Votacao/index';

const Routes = () =>{

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/votar" exact component={Votacao} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;