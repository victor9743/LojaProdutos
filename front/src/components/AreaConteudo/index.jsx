export const AreaConteudo = ({conteudo_titulo, conteudo_corpo}) => {
    return (
        <div className="card container col-md-8" style={{marginTop: "80px"}}>
            <div className="card-title container pt-3">
                <h3>{conteudo_titulo}</h3>
            </div>
            <div className="card-body">
                { conteudo_corpo }
            </div>
        </div>
    )
}