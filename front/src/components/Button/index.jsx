export const Button  = ({botao_tipo, botao_class, botao_funcao, botao_texto, botao_value}) => {
    return (
        <button type={botao_tipo} className={botao_class} onClick={botao_funcao} value={botao_value} >{botao_texto}</button>
    )
}