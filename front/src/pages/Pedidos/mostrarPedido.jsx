import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { Input } from "../../components/Input";
import { useParams } from "react-router-dom";

export const MostrarPedido = () => {
    const [pedido, setPedido] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [pedidoProduto, setPedidoProduto] = useState([]);
    const [totaldesconto, setTotalDesconto] = useState(0);
    const [ofertas, setOfertas] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/pedidos/${params.id}`)
        .then((r) => r.json())
        .then((r) => {
            setOfertas(r.ofertas);
            setPedido(r.pedido);
            setPedidoProduto(r.pedido_produto);
            setProdutos(r.produtos);
            mostrarValorFinal(r.pedido_produto);
            mostrarTotalDesconto(r.pedido_produto, r.produtos);
        });
    }, [params])

    const getProduto = (produto) => {
        return produtos.find((p) => p.id === produto).nome;
    }

    const mostrarValorFinal = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const mostrarTotalDesconto = (pedidoProduto, produtoList) => {
        let desconto = 0;

        pedidoProduto.forEach(produto => {
            if (produtoList.find((p) => p.id === produto.produto_id).desconto_ativo){
                desconto += produto.desconto
            }
        });

        setTotalDesconto(desconto);
    }
    return (
        <>
            <Navbar />
                <AreaConteudo conteudo_titulo={`Resumo do pedido: ${pedido.numero_pedido}`} conteudo_corpo={
                    <div className="row">
                        <div className="col-12 mb-2 row">
                            <div className="col-md-7">
                                <label>Preço total do pedido:</label> <strong>{pedido.valor_final ? mostrarValorFinal(pedido.valor_final) : pedido.valor_final}</strong>
                            </div>
                            <div className="col-md-5">
                                <label>Total de desconto:</label> <strong>{totaldesconto}%</strong>
                            </div>
                        </div>
                        <div className="row">
                            <h4>Produtos</h4>
                        </div>
                        {pedidoProduto.map((produto, key)=> {
                            return (
                                <div className="card mb-3" key={key}>
                                    <div className="card-body row p-5">
                                        <div className="col-12 mb-2">
                                            <label>Produto:</label>
                                            <Input input_tipo="text" input_class="form-control" input_disabled={true} input_value={getProduto(produto.produto_id)} />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <label>Quantidade:</label> 
                                            <Input input_tipo="text" input_class="form-control" input_disabled={true} input_value={produto.qtd_produto} />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <label>Preço</label>
                                            <Input input_tipo="text" input_class="form-control" input_disabled={true} input_value={produto.preco_final.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <label>Desconto</label>
                                            <Input input_tipo="text" input_class="form-control" input_disabled={true} 
                                            input_value={`${ produtos.find((p) => p.id === produto.produto_id).desconto_ativo ? produto.desconto : 0}%`} />
                                        </div>
                                    </div>
                                </div>
                                
                            );
                        })}

                        <div className="col-12">
                            <h4>Ofertas</h4>
                        </div>
                        { ofertas.length > 0 ? (
                            ofertas.map((oferta, key) => {
                                return (
                                    <div className="card mb-3" key={key}>
                                        <div className="card-body row p-5">
                                            <div className="col-12 mb-2">
                                                <label>Nome da oferta:</label>
                                                <Input input_tipo="text" input_class="form-control" input_disabled={true} input_value={oferta.nome} />
                                            </div>
                                            <div className="col-12 mb-2">
                                                <label>Descrição:</label> 
                                                <Input input_tipo="text" input_class="form-control" input_disabled={true} input_value={oferta.descricao} />
                                            </div>
                                            <div className="col-12 mb-2">
                                                <label>Valor:</label> 
                                                <Input input_tipo="text" input_class="form-control" input_disabled={true} input_value={oferta.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <h5 className="text-center">Nenhuma oferta associada ao produto</h5>
                        ) }
                    </div>
                }/>
            <Footer />
        </>
    )
}