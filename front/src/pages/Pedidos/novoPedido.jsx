import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { Button } from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Tabela";

export const NovoPedido = () => {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
    let carrinho = [];

    useEffect(() => {
        fetch('http://localhost:3000/produtos')
        .then((r) => r.json())
        .then((r) => {
            setProdutos(r);
        })
    }, []);

    const descontoAtivo = (valor, desconto) => {
        const valorDesconto = valor * (desconto / 100);
        return valor - valorDesconto;
    }

    if (produtos.length > 0) {
        produtos.forEach((produto)  => {
            if (produto.is_bag) {
                carrinho.push(produto);
            }
        })  
    }

    const formatarPreco = (preco) => {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const adicionarAoCarrinho = (item) => {
        const itemAdicionado = produtos.find((p) => p.id === item);
        itemAdicionado.is_bag = !itemAdicionado.is_bag;

        setProdutos(produtos.map(produto => produto.id === item ? itemAdicionado : produto));
    }

    const mudarQuantidade = (e, item, incremento) => {
        e.stopPropagation();
        const itemAdicionado = produtos.find((p) => p.id === item);

        if (incremento) {
            itemAdicionado.quantidade =  itemAdicionado.quantidade + 1; 
        } else {
            itemAdicionado.quantidade =  itemAdicionado.quantidade - 1;
        }

        setProdutos(produtos.map(produto => produto.id === item ? itemAdicionado : produto))
    }

    const valorFinal = (format) => {
        let valorFinal = 0;

        carrinho.forEach((c) => {
            if (c.desconto_ativo) {
                valorFinal += c.preco_desconto * c.quantidade;
            } else {
                valorFinal += c.preco * c.quantidade;
            }
        })

        if (format) {
            valorFinal = formatarPreco(valorFinal);
        }

        return valorFinal;
    }

    

    const salvar = () => {
        fetch('http://localhost:3000/pedidos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                produtos: carrinho,
                valorFinal: valorFinal(false)
            })
        })
        .then(response => response.json())
        .then(data => navigate("/pedidos", {state: data} ))
        .catch((error) => {
            navigate("/pedidos/novo", {state: error});
        });

    }

    return (
        <>
            <Navbar />
                <AreaConteudo conteudo_titulo="Salvar Pedido" conteudo_corpo={
                    <div className="">
                        <div className="border p-3">
                            <div className="col-md-6 mb-3">
                                <h5>Adicionar produtos</h5>
                            </div>
                            { produtos.length > 0 ? (
                                <div className="row">
                                    {produtos.map ((produto, key) => {
                                        return (
                                            <div className="col-md-4 mb-3" key={key} onClick={() => adicionarAoCarrinho(produto.id)}>
                                            <div className={`card ${produto.is_bag && 'border-success'}`}>
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
                                                            { produto.desconto_ativo && 
                                                                    <span className="text-success m-2">
                                                                        <FontAwesomeIcon icon={faArrowDown} /> {produto.desconto}% { descontoAtivo(produto.preco, produto.desconto).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                                    </span>
                                                            }
                                                        </div>
                                                    {produto.is_bag &&
                                                        <div className="mt-3 d-flex justify-content-between">
                                                            <div>
                                                                <Button 
                                                                    botao_tipo="button"
                                                                    botao_class="btn btn-danger"
                                                                    botao_disabled={produto.quantidade <= 1}
                                                                    botao_funcao={(e) => mudarQuantidade(e, produto.id, false)}
                                                                    botao_texto="-"
                                                                />
                                                            </div>
                                                            <div className="p-1">
                                                                <span>{produto.quantidade}</span>
                                                            </div>
                                                            <div>
                                                                <Button 
                                                                    botao_tipo="button"
                                                                    botao_class="btn btn-success"
                                                                    botao_funcao={(e) => mudarQuantidade(e, produto.id, true)}
                                                                    botao_texto="+"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
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
                        <div className="border p-3 mt-3">
                            <div className="mb-3">
                                <h5>Resumo</h5>
                                    {carrinho.length > 0 && 
                                        <Table 
                                            thead={
                                                <tr>
                                                    <th>Produto</th>
                                                    <th>Quantidade</th>
                                                    <th>Valor Total</th>
                                                </tr>
                                            }
                                            tbody ={
                                                carrinho.map((c, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{c.nome}</td>
                                                            <td>{c.quantidade}</td>
                                                            <td>{formatarPreco( c.desconto_ativo ? (c.preco_desconto * c.quantidade) : (c.preco * c.quantidade)) }</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        />
                                    }
                                    <div className="card">
                                        <div className="card-body" style={{textAlign: "right"}}>
                                            <strong>Valor total:</strong> {valorFinal(true)}
                                        </div>
                                    </div>
                                    {carrinho.length > 0 && 
                                        <div className="d-flex justify-content-end mt-3">
                                            <Button botao_tipo="button" botao_class="btn btn-success" botao_funcao={salvar} botao_texto="Salvar" />
                                        </div>
                                    }
                            </div>
                        </div>
                    </div>
                }/>

            <Footer />
        </>
    )
}