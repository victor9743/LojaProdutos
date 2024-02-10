import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { LinkUrl } from "../../components/LinkUrl";
import { Table } from "../../components/Tabela";

export const Produtos = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/produtos")
        .then((r) => r.json())
        .then((r) => setProdutos(r))
    }, []);

    return (
        <>
            <Navbar />
            <AreaConteudo conteudo_titulo="Produtos" conteudo_corpo= {
                <>
                    <div className="d-flex justify-content-end">
                        <LinkUrl link_url="/produto/novo" link_class="btn btn-success" link_nome="Adicionar" link_style={{color: "white"}} />
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
                                            <th scope="row">{produto.id}</th>
                                            <td>{produto.nome}</td>
                                            <td>{produto.descricao}</td>
                                            <td>{(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            <td>{ (produto.desconto * 100).toFixed(0) + '%'}</td>
                                            <td> <LinkUrl link_class="btn btn-success" link_nome={<FontAwesomeIcon icon="fas fa-store-alt" />} /> </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr><td colSpan="5">Nenhum produto cadastrado</td></tr>
                            )
                        }
                    /> 
                </>
                
            } />
            
            
            <Footer />

        </>
        
    );
}