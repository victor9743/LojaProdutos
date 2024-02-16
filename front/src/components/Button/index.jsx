export const Button  = ({botao_tipo, botao_class, botao_funcao, botao_texto, botao_value, botao_disabled = false}) => {
    return (
        <button type={botao_tipo} className={botao_class} onClick={botao_funcao} value={botao_value} disabled={botao_disabled} >{botao_texto}</button>
    )
}