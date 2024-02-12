import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCartArrowDown, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const NovoPedido = () => {
    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [pedido, setPedido] = useState([]);
    const [inputvalorfinal, setInputValorFinal] = useState([]);
    const [save, setSave] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        fetch('http://localhost:3000/produtos')
        .then((r) => r.json())
        .then((r) => {
            setProdutos(r);
        })
        localStorage.removeItem("qtdProdutos")
        localStorage.removeItem("qtdPedidos")
    }, [])


    // useEffect(() => {
    //     setInputValorFinal(inputvalorfinal)
    // },[ inputvalorfinal]);

    // funcao que adiciona ou remove item do carrinho
    const carrinhoFunction = (item, opcao) => {
        if (opcao === "+") {
            setCarrinho(prevState => [...prevState, produtos.find(produto => produto.id === item)]);
        } else {
            const novoCarrinho = carrinho.filter((c) => c.id !== item);
            setCarrinho(novoCarrinho);

            if(novoCarrinho.length === 0){
                setSave(false);
            }
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

    const quantidadeProduto = (produtoId, quantidade, preco) => {
        let qtdProdutos = localStorage.getItem("qtdProdutos");
        let valorFinal = quantidade * preco;

        if (quantidade > 0) {
            if (qtdProdutos) {
                qtdProdutos = JSON.parse(localStorage.getItem("qtdProdutos"));

                let found = false;
                qtdProdutos.forEach((p, key) => {
                    if (p.id === produtoId) {
                        qtdProdutos[key].qtd = quantidade
                        qtdProdutos[key].valorFinal = valorFinal
                        qtdProdutos[key].valorFinalMonetario = valorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        found = true;
                    }
                });

                if (!found) {
                    qtdProdutos.push({ id: produtoId, qtd: quantidade, valorFinal: valorFinal, valorFinalMonetario: valorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) });
                }

                localStorage.setItem("qtdProdutos", JSON.stringify(qtdProdutos));
            } else {
                localStorage.setItem("qtdProdutos", JSON.stringify([{ id: produtoId, qtd: quantidade, valorFinal: valorFinal, valorFinalMonetario: valorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }]));
            }
        }
        setSave(true)
    }
    const valorFinal = (id) => {
        console.log(inputvalorfinal);
        let qtdProdutos = JSON.parse(localStorage.getItem("qtdProdutos"));
        console.log(qtdProdutos);
        // console.log(inputvalorfinal[id]);
        // return inputvalorfinal[id].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const salvar = () => {

        let qtdProdutos = JSON.parse(localStorage.getItem("qtdProdutos"));
        
        fetch('http://localhost:3000/pedidos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                produtos: qtdProdutos
            })
        })
        .then(response => response.json())
        .then(data => navigate("/pedidos"))
        .catch((error) => {
            navigate("/pedidos/novo");
        });

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
                                                        { produto.desconto_ativo ? (
                                                                <div className="text-success">
                                                                    <label className="text-dark"><strong>Preço com desconto:</strong></label><br/>
                                                                    <span style={{ marginRight: "5px"}}>
                                                                        { calculaValorDesconto (produto.preco, produto.desconto).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                                                                    </span>
                                                                    <span > 
                                                                        <FontAwesomeIcon icon={faArrowDown} /> {produto.desconto}%
                                                                    </span>
                                                                </div>
                                                            ): (
                                                                <div className="text-success">
                                                                    <label className="text-dark">Nenhum desconto atribuido</label>
                                                                </div>
                                                            )
                                                        }
                                                        
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
                                                            Produto: {c.nome}
                                                        </div>
                                                        <div className="card-body row">
                                                            <div className="col-12 mb-3">
                                                                <label>Descrição:</label> 
                                                                <Input input_tipo="text" input_class="form-control" input_disabled={true} input_value={c.descricao} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label>Informe a Quantidade</label>
                                                                <input type="number"
                                                                className="form-control"
                                                                placeholder="Informe a quantidade" 
                                                                min="1"
                                                                onChange={(e) => quantidadeProduto (c.id, e.target.value, c.preco)}
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label>Valor Final: </label>
                                                                <Input 
                                                                input_tipo="text" 
                                                                input_class="form-control" 
                                                                input_disabled={true}
                                                                // input_value={ c.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                                                                input_value={ 
                                                                    inputvalorfinal.length === 0 ? c.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : valorFinal(c.id)
                                                                }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) }
                                        </div>
                                        <div className="d-flex justify-content-end p-3">
                                            { save  && 
                                                <Button botao_tipo="button" botao_class="btn btn-success" botao_funcao={salvar} botao_texto="Finalizar Pedido" />
                                            }
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