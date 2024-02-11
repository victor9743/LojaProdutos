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
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/produtos')
        .then((r) => r.json())
        .then((r) => {
            setProdutos(r);
        })
    }, [])

    useEffect(() => {
        console.log(carrinho);
    }, [carrinho ]);

    const salvar = () => {
    
    }

    // funcao que adiciona ou remove item do carrinho
    const carrinhoFunction = (item, opcao) => {
        if (opcao === "+") {
            setCarrinho(prevState => [...prevState, item])
        } else {
            const novoCarrinho = carrinho.filter((c) => c !== item);
            setCarrinho(novoCarrinho);
        }
    }
    
    // verifica se um item ja foi incluso
    const verificarCarrinho = (item) => {
        if (carrinho.length > 0) {
            if (carrinho.includes(item)) {
                return true;
            }
        }
        
        return false;
    }

    const calculaValorDesconto = (valor, desconto) => {
        const valorDesconto = valor * (desconto / 100);

        return valor - valorDesconto;

    }

    return (
        <>
            <Navbar />
                <AreaConteudo conteudo_titulo="Adicionar Pedido" conteudo_corpo={
                    <div className="row">
                        <div className="col-12 mb-3 d-flex justify-content-end">
                            <Button botao_tipo="submit" botao_class="btn btn-success" botao_funcao={salvar} botao_texto="Salvar"></Button>
                        </div>
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
                                                <div className="card-footer text-body-secondary d-flex justify-content-between">
                                                    <button className="btn btn-sm btn-success bg-success" onClick={()=> carrinhoFunction(produto.id, "+")} disabled = {verificarCarrinho(produto.id)} ><FontAwesomeIcon icon={faCartPlus} /> Adicionar</button>
                                                    
                                                    <button className="btn btn-danger btn-sm bg-danger" onClick={() => carrinhoFunction(produto.id, "-")} ><FontAwesomeIcon icon={faCartArrowDown} /> Remover</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                 
                                })}
                            </div>
                        ) : (
                            <div>
                                <h5>Sem produtos para adicionar</h5>
                            </div>
                        ) }
                    </div>
                }/>
            <Footer />
        </>
    )
}