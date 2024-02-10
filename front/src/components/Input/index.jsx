export const Input = ({input_tipo, input_class, input_id , input_funcao, input_value}) => {
    return (
        <input type={input_tipo} className={input_class} id={input_id} onChange={input_funcao} value={input_value} />
    )
}