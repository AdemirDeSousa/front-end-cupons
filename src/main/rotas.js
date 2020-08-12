import React from 'react';
import {Route, Switch, HashRouter} from 'react-router-dom';

import CupomCriar from '../views/cupomCriar';
import CupomSituacao from '../views/cupomSituacao';
import CupomData from '../views/cupomData';
import Home from '../views/home';


function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/cadastro-cupom/:id?" component={CupomCriar} />
                <Route path="/situacao" component={CupomSituacao} />
                <Route path="/data" component={CupomData} />
            </Switch>
        </HashRouter>
    );
}

export default Rotas;