import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { LinkUrl } from "../../components/LinkUrl";
import { Table } from "../../components/Tabela";
import { Button } from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { Aviso } from "../../components/Aviso";

export const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [aviso, setAviso] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/produtos")
        .then((r) => r.json())
        .then((r) => setProdutos(r))
    }, []);

    useEffect(() => {
        setTimeout(()=> {
            setAviso(false);
        }, 5000)
        
    }, [location]);

    const RemoverProduto = (id) => {
        fetch(`http://localhost:3000/produtos/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => navigate("/produtos", { state: data }))
        .catch((error) => {
            navigate("/ofertas", { state: error })
        });

    }

    return (
        <>
            <Navbar />
            { aviso && <Aviso aviso_class="alert alert-info" mensagem={location.state} /> }
            <AreaConteudo conteudo_titulo="Produtos" conteudo_corpo= {
                <>
                    <div className="d-flex justify-content-end">
                        <LinkUrl link_url="/produtos/novo" link_class="btn btn-success" link_nome="Adicionar" link_style={{color: "white"}} />
                    </div>
                   <Table 
                        thead = {
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Desconto</th>
                                <th scope="col">Opções</th>
                            </tr>
                        } 

                        tbody = {
                            produtos.length > 0 ? (
                                produtos.map((produto, key) => {
                                    return (
                                        <tr key={key}>
                                            <td scope="row">{produto.id}</td>
                                            <td>{produto.nome}</td>
                                            <td>{produto.descricao}</td>
                                            <td>{(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            <td>{produto.desconto}% - {produto.desconto_ativo ? "Ativo" : "Inativo"}</td>
                                            <td>
                                                <LinkUrl link_url={`/produtos/mostrar/${produto.id}`} link_class="btn btn-sm btn-primary" link_nome={<FontAwesomeIcon icon={faSearch} />} link_style={{marginRight: "3%"}} />
                                                <Button botao_class="btn btn-sm btn-danger" botao_texto={<FontAwesomeIcon icon={faTrash} />} botao_tipo="button" botao_value={produto.id} botao_funcao={() => RemoverProduto(produto.id)}/>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr><td colSpan="6">Nenhum produto cadastrado</td></tr>
                            )
                        }
                    /> 
                </>
            } />
            
            <Footer />

        </>
        
    );
}