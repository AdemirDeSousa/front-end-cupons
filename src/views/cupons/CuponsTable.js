import React from 'react';

export default props => {

    const rows = props.cupons.map( cupom => {
        return(
            <tr key={cupom.id} className=
                { cupom.situacao === "Expirado" ? (
                    "table-warning" 
                ) : (
                    ""
                )
                
            }>
                <td>{cupom.codigo}</td>
                <td>{cupom.descricao}</td>
                <td>{cupom.valor}</td>
                <td>{cupom.situacao}</td>
                <td>{cupom.dataExpiracao[2]}/{cupom.dataExpiracao[1]}/{cupom.dataExpiracao[0]}</td>
                <td>{cupom.dataUso[2]}/{cupom.dataUso[1]}/{cupom.dataUso[0]}</td>
                <td>
                    {
                        cupom.situacao === "Expirado" ? (
                            <>
                            </>
                        ) : (
                            <button type="button" className="btn btn-primary" onClick={e => props.editarCupom(cupom.id)}>Editar</button>
                        )
                    }
                    <button type="button" className="btn btn-danger" onClick={e => props.deletarCupom(cupom)}>Deletar</button>
                </td>
            </tr>
        );
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Situação</th>
                    <th>Data Expiração</th>
                    <th>Data Uso</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}