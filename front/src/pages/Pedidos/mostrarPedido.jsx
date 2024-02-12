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
    const [precofinal, setPrecoFinal] = useState(0);
    const [totaldesconto, setTotalDesconto] = useState(0);
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/pedidos/${params.id}`)
        .then((r) => r.json())
        .then((r) => {
            setPedido(r.pedido)
            setPedidoProduto(r.pedido_produto);
            setProdutos(r.produtos);
            mostrarValorFinal(r.pedido_produto);
            mostrarTotalDesconto(r.pedido_produto, r.produtos);
        });
    }, [params])

    const getProduto = (produto) => {
        return produtos.find((p) => p.id === produto).nome;
    }

    const mostrarValorFinal = (pedidoProduto) => {
        let valor = 0;

        pedidoProduto.forEach(produto => {
            valor += produto.preco_final
        });

        setPrecoFinal(valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
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
                                <label>Preço total do pedido:</label> <strong>{precofinal}</strong>
                            </div>
                            <div className="col-md-5">
                                <label>Total de desconto:</label> <strong>{totaldesconto}%</strong>
                            </div>
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
                    </div>
                }/>
            <Footer />
        </>
    )
}