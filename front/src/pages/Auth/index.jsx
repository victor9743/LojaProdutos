import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AreaLogin } from "../../components/AreaLogin";
import { Footer } from "../../components/Footer";

export const Auth = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    localStorage.removeItem("usuario");
    localStorage.removeItem("acesso");
    localStorage.removeItem("is_admin");

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then((r) => r.json())
        .then((r) => setUsuarios(r))
    }, []);

    const login = () => {
        const user = usuarios.find(user => user.usuario === usuario  && user.password === CryptoJS.MD5(senha).toString());
        if (user) {
            localStorage.setItem("usuario", user.usuario);
            localStorage.setItem("acesso", true);
            localStorage.setItem("is_admin", user.is_admin);
            
            navigate("/produtos");
        } else {
            navigate("/");
        }
    }

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
            <Footer />
        </>
    );

}