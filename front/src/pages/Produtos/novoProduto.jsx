import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import CurrencyInput from "../../components/CurrencyInput";

export const NovoProduto = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [desconto, SetDesconto] = useState("");

    const salvar = () => {
        console.log(parseFloat(desconto));
        fetch('http://localhost:3000/produtos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                descricao: descricao,
                preco: parseFloat(preco.slice(2)),
                desconto: parseFloat(desconto)
            })

        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
    }

    return (
        <>
            <Navbar />
                <AreaConteudo conteudo_titulo="Adicionar Produto" conteudo_corpo={
                    <div className="row">
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
                            <CurrencyInput placeholder="R$0.00" type="text" className="form-control" onChange={(e)=> { setPreco(e.target.value)}} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="desconto" className="form-label">Desconto</label>
                            <Input input_tipo="text" input_class="form-control" input_id="desconto" input_funcao={(e)=> { SetDesconto(e.target.value) }} />
                        </div>
                        <div className="col-12 mb-3 d-flex justify-content-end">
                            <Button botao_tipo="submit" botao_class="btn btn-success" botao_funcao={salvar} botao_texto="Salvar"></Button>
                        </div>
                    </div>
                }/>
            <Footer />
        </>
    )
}