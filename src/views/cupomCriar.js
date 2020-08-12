import React from 'react';
import { withRouter } from 'react-router-dom';

import CupomService from '../app/services/cupomService';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemErro, mensagemSucesso } from '../components/toastr';
import SelectMenu from '../components/selectMenu';

class CupomCriar extends React.Component {

    state = {
        id: null,
        email: '',
        senha: '',
        codigo: '',
        descricao: '',
        valor: '',
        situacao: '',
        dataExpiracao: '',
        dataUso: '',
        atualizando: false,

    }

    constructor(){
        super();
        this.service = new CupomService();
    }

    componentDidMount(){
        const params = this.props.match.params;
        if(params.id){
            this.service.buscarPorId(params.id)
            .then(response => {
                console.log(response);
                this.setState({...response.data, atualizando: true});
            }).catch(error => {
                console.log(error);
            })
        }
    }

    validar = () => {
        const msgs = [];
        
        if(!this.state.codigo){
            msgs.push('O campo Codigo é obrigatorio');
        } else if (!this.state.codigo.match(/.*?(?:[a-zA-Z].*?[0-9]|[0-9].*?[a-zA-Z]).*?/)){
            msgs.push('O campo Codigo precisa ter Letras e Numeros');
        }

        if(!this.state.descricao){
            msgs.push('O campo Descrição é obrigatorio');
        }

        if(!this.state.valor){
            msgs.push('O campo Valor é obrigatorio');
        }

        if(!this.state.situacao){
            msgs.push('Selecione um valor valido para o campo Situação');
        }

        if(!this.state.dataExpiracao){
            msgs.push('O campo Data Expiração é obrigatorio');
        }

        if(!this.state.dataUso){
            msgs.push('O campo Data Uso é obrigatorio');
        }

        return msgs;
    }

    atualizar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg);
            });

            return false;
        }

        this.service.atualizar({
            id: this.state.id,
            codigo: this.state.codigo,
            descricao: this.state.descricao,
            valor: this.state.valor,
            situacao: this.state.situacao,
            dataExpiracao: this.state.dataExpiracao,
            dataUso: this.state.dataUso,
        }).then( response => {
            this.props.history.push('/situacao');
            mensagemSucesso('Cupom Atualizado com Sucesso');
            console.log(response);
        }).catch( erro => {
            console.log(erro.response);
            console.log(erro.response.data.errors[0].message);
            mensagemErro(erro.response.data.msg);
        });
    }

    cadastrar = () => {

        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg);
            });

            return false;
        }

        this.service.criar({
            codigo: this.state.codigo,
            descricao: this.state.descricao,
            valor: this.state.valor,
            situacao: this.state.situacao,
            dataExpiracao: this.state.dataExpiracao,
            dataUso: this.state.dataUso,
        }).then( response => {
            this.props.history.push('/home');
            mensagemSucesso('Cupom Criado com Sucesso');
            console.log(response);
        }).catch( erro => {
            console.log(erro.response);
            console.log(erro.response.data.errors[0].message);
            mensagemErro(erro.response.data.msg);
        });
    }

    cancelar = () => {
        this.props.history.push('/home');
    }

    render(){

        const lista = [
            { label: 'Ativo', value: 'Ativo'},
            { label: 'Expirado', value: 'Expirado'},
            { label: 'Utilizado', value: 'Utilizado'},
        ];

        return(
                <div className="row">
                    <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                        <div className="bs-docs-section">
                            <Card title={this.state.atualizando ? 'Atualizar Cupom' : 'Cadastrar Cupom'}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup label="Codigo: *" htmlFor="inputCodigo">
                                                    <input value={this.state.codigo} onChange={e => this.setState({codigo: e.target.value})} type="text" className="form-control" id="inputCodigo" placeholder="Codigo" />
                                                </FormGroup>
                                                <FormGroup label="Descrição: *" htmlFor="inputDescricao">
                                                    <input value={this.state.descricao} onChange={e => this.setState({descricao: e.target.value})} type="text" className="form-control" id="inputDescricao" placeholder="Descrição" />
                                                </FormGroup>
                                                <FormGroup label="Valor: *" htmlFor="inputValor">
                                                    <input value={this.state.valor} onChange={e => this.setState({valor: e.target.value})} type="text" className="form-control" id="inputValor" placeholder="Valor" />
                                                </FormGroup>
                                                <FormGroup label="Situacao: *" htmlFor="inputSituacao">
                                                    <SelectMenu value={this.state.situacao} onChange={e => this.setState({situacao: e.target.value})} className="form-control" lista={lista} />
                                                </FormGroup>
                                                <FormGroup label="Data Expiração: *" htmlFor="inputDataExpiracao">
                                                    <input value={this.state.dataExpiracao} onChange={e => this.setState({dataExpiracao: e.target.value})} type="date" className="form-control" id="inputDataExpiracao" />
                                                </FormGroup>
                                                <FormGroup label="Data Uso: *" htmlFor="inputDataUso">
                                                    <input value={this.state.dataUso} onChange={e => this.setState({dataUso: e.target.value})} type="date" className="form-control" id="inputDataUso" />
                                                </FormGroup>
                                                {
                                                    this.state.atualizando ? (
                                                        <button onClick={this.atualizar} type="button" className="btn btn-success">Editar</button> 
                                                    ) : (
                                                        <button onClick={this.cadastrar} type="button" className="btn btn-success">Cadastrar</button>    
                                                    )
                                                } 
                                                <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>    
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div> 
                    </div>
                </div>
        );
    }
}

export default withRouter(CupomCriar);