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

export const Ofertas = () => {
    const [ofertas, setOfertas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/ofertas")
        .then((r) => r.json())
        .then((r) => setOfertas(r))

    }, []);

    const remover_oferta = (id) => {
        fetch(`http://localhost:3000/ofertas/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => navigate("/ofertas", { state: data }))
        .catch((error) => {
            navigate("/ofertas", { state: error })
        });

    }

    return (
        <>
            <Navbar />
            <AreaConteudo conteudo_titulo="Ofertas" conteudo_corpo= {
                <>
                    <div className="d-flex justify-content-end">
                        <LinkUrl link_url="/ofertas/novo" link_class="btn btn-success" link_nome="Adicionar" link_style={{color: "white"}} />
                    </div>
                   <Table 
                        thead = {
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Opções</th>
                            </tr>
                        } 

                        tbody = {
                            ofertas.length > 0 ? (
                                ofertas.map((oferta, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{oferta.id}</td>
                                            <td>{oferta.descricao}</td>
                                            <td>
                                                <LinkUrl link_url={`/ofertas/mostrar/${oferta.id}`} link_class="btn btn-sm btn-primary" link_nome={<FontAwesomeIcon icon={faSearch} />} link_style={{marginRight: "3%"}} />
                                                <Button botao_class="btn btn-sm btn-danger" botao_texto={<FontAwesomeIcon icon={faTrash} />} botao_tipo="button" botao_value={oferta.id} botao_funcao={() => remover_oferta(oferta.id)}/>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr><td colSpan="5">Nenhum oferta cadastrada</td></tr>
                            )
                        }
                    /> 
                </>
            } />
            
            <Footer />

        </>
        
    );
}