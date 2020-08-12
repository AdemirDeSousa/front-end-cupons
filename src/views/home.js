import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../components/card';
import CuponsTable from './cupons/CuponsTable';

import CupomService from '../app/services/cupomService';

class Home extends React.Component {

    state = {
        cupons: []
    }

    constructor() {
        super();
        this.service = new CupomService();
    }

    componentDidMount(){
        this.service.exibirTodos()
        .then(resposta => {
            this.setState({cupons: resposta.data.content})
        }).catch(error => {
            console.log(error);
        })
    }

    editar = (id) => {
        console.log(id);
        this.props.history.push(`/cadastro-cupom/${id}`);
    }

    deletar = ( cupom ) => {
        this.service.deletarCupom(cupom.id)
        .then(response => {
            const cupons = this.state.cupons;
            const index = cupons.indexOf(cupom);
            cupons.splice(index, 1);
            this.setState(cupons);
            console.log("Cupom Deletado");
        }).catch(error => {
            console.log(error);
        });
    }

    render(){

        return(
            <Card title="Lista de Cupons">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <CuponsTable cupons={this.state.cupons} deletarCupom={this.deletar} editarCupom={this.editar} />
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(Home);