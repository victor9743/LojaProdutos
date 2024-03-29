export const AreaConteudo = ({conteudo_titulo, conteudo_corpo}) => {
    return (
        <div className="card container col-md-8 m-auto mt-5" style={{ height: "40%" }}>
            <div className="row container pt-3">
                <div className="col-md-6">
                    <h4>{conteudo_titulo}</h4>
                </div>
            </div>
            
            <div className="card-body">
                { conteudo_corpo }
            </div>
        </div>
    )
}