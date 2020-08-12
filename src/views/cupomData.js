import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import CuponsTable from './cupons/CuponsTable';

import CupomService from '../app/services/cupomService';

class CupomData extends React.Component {

    state = {
        data1: '',
        data2: '',
        cupons: []
    }

    constructor() {
        super();
        this.service = new CupomService();
    }

    buscar = () => {
        const cupomSituacao = {
            data1: this.state.data1,
            data2: this.state.data2
        }
        this.service.buscarPorData(cupomSituacao)
        .then( resposta => {
            this.setState({cupons: resposta.data.content});
        }).catch(error => {
           console.log(error); 
        });
    }

    editar = (id) => {
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
            <Card title="Buscar Cupons por Intervalo de datas">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label="Data Inicial">
                                <input value={this.state.data1} onChange={e => this.setState({data1: e.target.value})} type="date" className="form-control" />
                            </FormGroup>
                            <FormGroup label="Data Fim">
                                <input value={this.state.data2} onChange={e => this.setState({data2: e.target.value})} type="date" className="form-control" />
                            </FormGroup>

                            <button type="button" onClick={this.buscar} className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <CuponsTable cupons={this.state.cupons} deletarCupom={this.deletar} editarCupom={this.editar}/>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(CupomData);