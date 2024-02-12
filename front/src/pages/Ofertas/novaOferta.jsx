import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Tabela";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";


export const NovaOferta = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [ofertatipo, setOfertaTipo] = useState("");
    const [listoferta, setListOferta] = useState([]);
    const [oferta, setOferta] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (ofertatipo) {
            let url = "";

            switch (ofertatipo) {
                case "1":
                    url = "http://localhost:3000/produtos"; 
                break;
                case "2":
                    url = "http://localhost:3000/pedidos";
                break;
                default:
                break;
            }

            fetch(url)
            .then((r) => r.json())
            .then((r) => setListOferta(r))
        }
    }, [ofertatipo])

    const salvar = () => {
        fetch('http://localhost:3000/ofertas', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                descricao: descricao,
                preco: parseFloat(preco.slice(2).replace(',', '.')),
                tipoOferta: ofertatipo,
                ofertaId: oferta
            })

        })
        .then(response => response.json())
        .then(data => navigate("/ofertas"))
        .catch((error) => {
            navigate("/ofertas/novo");
            alert(error.message);
        });
    }

    const handleChange = (event) => {
        const rawValue = event.target.value.replace(/[^0-9]/g, '');
    
        let formattedValue = '';
        if (rawValue.length > 2) {
          formattedValue = `${rawValue.slice(0, -2)},${rawValue.slice(-2)}`;
        } else if (rawValue.length === 2) {
          formattedValue = `0,${rawValue}`;
        } else if (rawValue.length === 1) {
          formattedValue = `0,0${rawValue}`;
        }
    
        setPreco(formatarValorMonetario(formattedValue));
    };

    const formatarValorMonetario = (valor) => {
        // Remover todos os caracteres não numéricos do valor
        const valorNumerico = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));
    
        // Verificar se o valor é um número válido
        if (isNaN(valorNumerico)) {
            return '';
        }
    
        // Formatar o valor como um valor monetário
        const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    
        return valorFormatado;
    }

    const verifOferta = (id, opcao) => {
        if (opcao === "+"){
            setOferta(id);
        } else {
            setOferta("");
        }

    }

    const disabledAddOferta = (item) => {
        console.log(item);
        if (oferta === item) {
            return true;
        }
        
        return false;
    }

    const disabledRemoveOferta = (item) => {
        if (oferta) {
            if (oferta === item) {
                return false;
            }
        }
        
        return true;
    }

    return (
        <>
            <Navbar />
                <AreaConteudo conteudo_titulo="Adicionar Oferta" conteudo_corpo={
                    <div className="row">
                        <div className="col-12 mb-3 d-flex justify-content-end">
                            <Button botao_tipo="button" botao_class="btn btn-success" botao_funcao={salvar} botao_texto="Salvar"></Button>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <Input input_tipo="text" input_class="form-control" input_id="nome" input_funcao={(e)=> { setNome(e.target.value) }} />
                            
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="descricao" className="form-label">Descrição</label>
                            <Input input_tipo="text" input_class="form-control" input_id="descricao" input_funcao={(e)=> { setDescricao(e.target.value) }} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="preco" className="form-label">Preço</label>
                            <InputMask type="text" className="form-control" placeholder="R$ 0,00" id="money" name="money" value={preco} onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-6">
                            Escolha uma opção onde será aplicada a oferta
                            <select className="form-control" onChange={(e) => setOfertaTipo(e.target.value)}>
                                <option value="">Selecione</option>
                                <option value="1">Produto</option>
                                <option value="2">Pedido</option>
                            </select>
                        </div>
                        <div className="col-12">
                         { (listoferta.length > 0 && ofertatipo) && (
                            <Table 
                                thead = {
                                    <tr>
                                        <th>#</th>
                                        {ofertatipo === "1" ? 
                                            <th>Produto</th>
                                            :
                                            <th>Atendimento</th>
                                        }
                                        <th>Opções</th>
                                    </tr>
                                }

                                tbody = {
                                    listoferta.map((list, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{list.id}</td>
                                                {ofertatipo === "1" ? 
                                                    <td>{list.nome}</td>
                                                    :
                                                    <td>{list.numero_pedido}</td>
                                                }
                                                <td>
                                                    <button className="btn btn-sm btn-success bg-success m-2" onClick={()=> verifOferta(list.id, "+")} disabled = {disabledAddOferta(list.id)} ><FontAwesomeIcon icon={faPlus} /></button>
                                                    
                                                    <button className="btn btn-danger btn-sm bg-danger" onClick={() => verifOferta(list.id, "-")} disabled={disabledRemoveOferta(list.id)} ><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            />
                         )}
                        </div>
                    </div>
                }/>
            <Footer />
        </>
    )
}