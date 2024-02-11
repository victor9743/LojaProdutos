import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { LinkUrl } from "../../components/LinkUrl";
import { Table } from "../../components/Tabela";
import { Button } from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/pedidos")
        .then((r) => r.json())
        .then((r) => setPedidos(r))

    }, [pedidos, setPedidos]);

    const remover_pedido = (e) => {
        fetch(`http://localhost:3000/pedidos/${e.target.value}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => alert(data.exception))
        .catch((error) => {
            alert(error);
        });

    }

    return (
        <>
            <Navbar />
            <AreaConteudo conteudo_titulo="Pedidos" conteudo_corpo= {
                <>
                    <div className="d-flex justify-content-end">
                        <LinkUrl link_url="/pedidos/novo" link_class="btn btn-success" link_nome="Adicionar" link_style={{color: "white"}} />
                    </div>
                   <Table 
                        thead = {
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Atendimento</th>
                                <th scope="col">Opções</th>
                            </tr>
                        } 

                        tbody = {
                            pedidos.length > 0 ? (
                                pedidos.map((pedido, key) => {
                                    return (
                                        <tr key={key}>
                                            <td scope="row">{pedido.id}</td>
                                            <td scope="row">{pedido.atendimento}</td>
                                            <td>
                                                <LinkUrl link_url={`/pedidos/mostrar/${pedido.id}`} link_class="btn btn-sm btn-primary" link_nome={<FontAwesomeIcon icon={faSearch} />} link_style={{marginRight: "3%"}} />
                                                <Button botao_class="btn btn-sm btn-danger" botao_texto={<FontAwesomeIcon icon={faTrash} />} botao_tipo="button" botao_value={pedido.id} botao_funcao={remover_pedido}/>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr><td colSpan="5">Nenhum pedido cadastrado</td></tr>
                            )
                        }
                    /> 
                </>
            } />
            
            <Footer />

        </>
        
    );
}