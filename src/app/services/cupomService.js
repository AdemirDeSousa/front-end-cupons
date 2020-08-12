import Apiservice from '../apiservice';

class CupomService extends Apiservice {

    constructor(){
        super('/cupons');
    }

    criar(objeto){
        return this.post('/', objeto);
    }

    buscarPorSituacao(cupomSituacao){
        let params = `/buscar/?situacao=${cupomSituacao}`;
        return this.get(params);
    }

    buscarPorData(cupomData){
        let params = `/buscar/expiracao/?data1=${cupomData.data1}&data2=${cupomData.data2}`;
        return this.get(params);
    }

    deletarCupom(id){
        return this.delete(`/${id}`);
    }

    buscarPorId(id){
        return this.get(`/${id}`);
    }

    atualizar(objeto){
        return this.put(`/${objeto.id}`, objeto);
    }

    exibirTodos(){
        return this.get('/page');
    }
}

export default CupomService;