import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCartArrowDown, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const NovoPedido = () => {
    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [pedido, setPedido] = useState([]);
    let array_produtos = []
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/produtos')
        .then((r) => r.json())
        .then((r) => {
            setProdutos(r);
        })
    }, [])

    const salvar = () => {
    
    }

    // funcao que adiciona ou remove item do carrinho
    const carrinhoFunction = (item, opcao) => {
        if (opcao === "+") {
            setCarrinho(prevState => [...prevState, produtos.find(produto => produto.id === item)]);
        } else {
            const novoCarrinho = carrinho.filter((c) => c.id !== item);
            setCarrinho(novoCarrinho);
        }
    }

    // verifica se um item ja foi incluso
    const disabledAddCarrinho = (item) => {
        if (carrinho.length > 0) {
            if (carrinho.some(c => c.id === item)) {
                return true;
            }
        }
        
        return false;
    }

    const disabledRemoveCarrinho = (item) => {
        if (carrinho.length > 0) {
            if (carrinho.some(c => c.id === item)) {
                return false;
            }
        }
        
        return true;
    }

    const calculaValorDesconto = (valor, desconto) => {
        const valorDesconto = valor * (desconto / 100);

        return valor - valorDesconto;

    }

    const quantidadeProduto = (produto_id, quantidade) => {        
        if(quantidade > 0) {
            if (array_produtos.find((p) => p.id === produto_id)) {
                for (let i =0; i <array_produtos.length; i ++ ) {
                    if (array_produtos[i].id === produto_id) {
                        array_produtos[i] = {id: array_produtos[i].id, qtd: quantidade}
                    }
                }

            } else {
                array_produtos.push({id: produto_id, qtd: quantidade});
            }
        }
    }

    return (
        <>
            <Navbar />
                <AreaConteudo conteudo_titulo="Adicionar Pedido" conteudo_corpo={
                    <div className="">
                        <div className="border p-3">
                            <div className="col-md-6 mb-3">
                                <h5>Adicionar produtos</h5>
                            </div>
                            { produtos.length > 0 ? (
                                <div className="row">
                                    {produtos.map ((produto, key) => {
                                        return (
                                            <div className="col-md-3 mb-3" key={key}>
                                                <div className="card">
                                                    <div className="card-header text-light" style={{background: "#2C3E50"}}>
                                                        {produto.nome}
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="">
                                                            <label><strong>Descrição:</strong></label><br/>
                                                            <span>{produto.descricao}</span>
                                                        </div>
                                                        <div>
                                                            <label><strong>Preço:</strong></label><br/>
                                                            <span>{(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                                        </div>
                                                        <div className="text-success">
                                                            <label className="text-dark"><strong>Preço com desconto:</strong></label><br/>
                                                            <span style={{ marginRight: "5px"}}>
                                                                { calculaValorDesconto (produto.preco, produto.desconto).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                                                            </span>
                                                            <span > 
                                                                <FontAwesomeIcon icon={faArrowDown} /> {produto.desconto}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-body-secondary d-flex justify-content-between">
                                                        <button className="btn btn-sm btn-success bg-success col-6" onClick={()=> carrinhoFunction(produto.id, "+")} disabled = {disabledAddCarrinho(produto.id)} ><FontAwesomeIcon icon={faCartPlus} /></button>
                                                        
                                                        <button className="btn btn-danger btn-sm bg-danger col-6" onClick={() => carrinhoFunction(produto.id, "-")} disabled={disabledRemoveCarrinho(produto.id)} ><FontAwesomeIcon icon={faCartArrowDown} /></button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    
                                    })}
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <h5>Sem produtos para adicionar</h5>
                                </div>
                            ) }
                        </div>
                        { carrinho.length > 0 ? (
                            <div className="accordion mt-3" id="carrinho">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            Visualizar Carrinho
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#carrinho">
                                        <div className="accordion-body">
                                            { carrinho.map((c , key) => {
                                                return (
                                                    <div className="card mb-3" key={key}>
                                                        <div className="card-header">
                                                            {c.nome}
                                                        </div>
                                                        <div className="card-body row">
                                                            <div className="col-md-4">
                                                                Descrição: {c.descricao}
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input type="number" 
                                                                placeholder="Informe a quantidade" min="1"
                                                                onChange={(e) => quantidadeProduto (c.id, e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input type="checkbox" onClick={(e) => console.log(e.target.checked)} /> Aplicar Desconto ?
                                                                
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label>Valor Final: {c.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) }
                                        </div>
                                        <div>
                                            <button>Finalizar pedido</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center mt-3">
                                <h5>Carrinho vazio</h5>
                            </div>
                        ) }
                        
                    </div>
                }/>

            <Footer />
        </>
    )
}