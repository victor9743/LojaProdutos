import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";


export const NovoProduto = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [desconto, setDesconto] = useState("");
    const [descontoAtivo , setDescontoAtivo] = useState();
    const navigate = useNavigate();

    const salvar = () => {
        fetch('http://localhost:3000/produtos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                descricao: descricao,
                preco: parseFloat(preco.slice(2).replace(',', '.')),
                desconto: parseFloat(desconto),
                descontoAtivo: descontoAtivo
            })

        })
        .then(response => response.json())
        .then(data => navigate("/"))
        .catch((error) => {
            navigate("/produtos/novo");
            alert(error.message);
        });
    }

    const handleChange = (event) => {
        const rawValue = event.target.value.replace(/[^0-9]/g, '');
    
        let formattedValue = '';
        if (rawValue.length > 2) {
          formattedValue = `${rawValue.slice(0, -2)},${rawValue.slice(-2)}`;
        } else if (rawValue.length === 2) {
          formattedValue = `0,${rawValue}`;
        } else if (rawValue.length === 1) {
          formattedValue = `0,0${rawValue}`;
        }
    
        setPreco(formatarValorMonetario(formattedValue));
    };

    function formatarValorMonetario(valor) {
        // Remover todos os caracteres não numéricos do valor
        const valorNumerico = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));
    
        // Verificar se o valor é um número válido
        if (isNaN(valorNumerico)) {
            return '';
        }
    
        // Formatar o valor como um valor monetário
        const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    
        return valorFormatado;
    }

    return (
        <>
            <Navbar />
                <AreaConteudo conteudo_titulo="Adicionar Produto" conteudo_corpo={
                    <div className="row">
                        <div className="col-12 mb-3 d-flex justify-content-end">
                            <Button botao_tipo="submit" botao_class="btn btn-success" botao_funcao={salvar} botao_texto="Salvar"></Button>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <Input input_tipo="text" input_class="form-control" input_id="nome" input_funcao={(e)=> { setNome(e.target.value) }} />
                            
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="descricao" className="form-label">Descrição</label>
                            <Input input_tipo="text" input_class="form-control" input_id="descricao" input_funcao={(e)=> { setDescricao(e.target.value) }} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="preco" className="form-label">Preço</label>
                            <InputMask type="text" className="form-control" placeholder="R$ 0,00" id="money" name="money" value={preco} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="desconto" className="form-label">Desconto</label>
                            <Input input_tipo="text" input_class="form-control" input_id="desconto" input_funcao={(e)=> { setDesconto(e.target.value) }} />
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <input className="mr-3" type="checkbox" onClick={(e) => {setDescontoAtivo(e.target.checked)}} /> Ativar desconto ?
                        </div>
                    </div>
                }/>
            <Footer />
        </>
    )
}