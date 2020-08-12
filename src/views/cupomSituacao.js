import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';
import CuponsTable from './cupons/CuponsTable';
import { mensagemErro, mensagemSucesso } from '../components/toastr';

import CupomService from '../app/services/cupomService';

class CupomSituacao extends React.Component {

    state = {
        situacao: 'invalido',
        cupons: []
    }

    constructor() {
        super();
        this.service = new CupomService();
    }

    buscar = () => {
        const cupomSituacao = {
            situacao: this.state.situacao
        }
        this.service.buscarPorSituacao(cupomSituacao.situacao)
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
            mensagemSucesso('Cupom Deletado com Sucesso');
        }).catch(error => {
            console.log(error);
            mensagemErro("Não foi possivel deletar o cupom");
        });
    }

    render(){

        const lista = [
            { label: 'Selecione', value: 'Invalido'},
            { label: 'Ativo', value: 'Ativo'},
            { label: 'Expirado', value: 'Expirado'},
            { label: 'Utilizado', value: 'Utilizado'},
        ];

        return(
            <Card title="Lista de Cupons">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label="Situação: ">
                                <SelectMenu value={this.state.situacao} onChange={e => this.setState({situacao: e.target.value})} className="form-control" lista={lista} />
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
                            <CuponsTable cupons={this.state.cupons} deletarCupom={this.deletar} editarCupom={this.editar} />
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(CupomSituacao);