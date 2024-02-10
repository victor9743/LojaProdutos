import React, { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "../../components/Alert";
import { AreaLogin } from "../../components/AreaLogin";

export const Auth = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then((r) => r.json())
        .then((r) => setUsuarios(r))
    }, []);

    const login = () => {
        if (usuarios.find(user => user.usuario === usuario  && user.password === CryptoJS.MD5(senha).toString())) {
            console.log("pode logar")
        } else {
            setMensagem("usuário ou senha inválido(s)");
        }
    }

    setTimeout(()=> {
        setMensagem("");
    }, 5000);

    return (
        <>
            <AreaLogin>
                    <div className="card-title text-center">
                        <h3>Área de acesso</h3>
                    </div>
                    <div className=" card-body ">
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label">Usuário</label>
                            <Input input_tipo="text" input_class="form-control" input_id="usuario" input_funcao={(e)=> { setUsuario(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="senha" className="form-label">Senha</label>
                            <Input input_tipo="password" input_class="form-control" input_id="senha" input_funcao={(e)=> { setSenha(e.target.value) }} />
                        </div>
                        <Button botao_tipo="button" botao_class="btn btn-primary col-12" botao_funcao={login}  botao_texto={"Entrar"} />
                    </div>
            </AreaLogin>
            {
                mensagem && <Alert alert_mensagem={mensagem} alerta_class="alert alert-danger col-6" />
            }
            
        </>
    );

}