import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { LinkUrl } from "../../components/LinkUrl";
import { Table } from "../../components/Tabela";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { Aviso } from "../../components/Aviso";

export const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const location = useLocation();
    const [aviso, setAviso] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/pedidos")
        .then((r) => r.json())
        .then((r) => setPedidos(r))

    }, []);

    useEffect(() => {
        setTimeout(()=> {
            setAviso(false);
        }, 5000)
        
    }, [location]);

    return (
        <>
            <Navbar />
            { aviso && <Aviso aviso_class="alert alert-info" mensagem={"Pedido Salvo com sucesso"} /> }
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
                                            <td scope="row">{pedido.numero_pedido}</td>
                                            <td>
                                                <LinkUrl link_url={`/pedidos/mostrar/${pedido.id}`} link_class="btn btn-sm btn-primary" link_nome={<FontAwesomeIcon icon={faSearch} />} link_style={{marginRight: "3%"}} />
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