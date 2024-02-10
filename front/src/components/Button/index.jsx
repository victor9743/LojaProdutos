export const Button  = ({botao_tipo, botao_class, botao_funcao, botao_texto}) => {
    return (
        <button type={botao_tipo} className={botao_class} onClick={botao_funcao}>{botao_texto}</button>
    )
}