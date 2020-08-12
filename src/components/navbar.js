import React from 'react';

import NavBarItem from '../components/navbarItem';

function Navbar(){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="#/home" className="navbar-brand">Meus Cupons</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavBarItem href="#/cadastro-cupom" label="Criar Cupom"/>
                <NavBarItem href="#/situacao" label="Buscar por Situação"/>
                <NavBarItem href="#/data" label="Buscar por Data"/>

          </ul>
  
          </div>
        </div>
      </div>
    );
}

export default Navbar;