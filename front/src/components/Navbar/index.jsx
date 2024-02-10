import { useState } from "react";
import { LinkUrl } from "../LinkUrl";
export const Navbar = () => {
    const [user, setUser] = useState([])

    useState(() => {
        setUser({
            usuario: localStorage.getItem('usuario'),
            is_admin: localStorage.getItem('is_admin')
        })
    })

    return (
        <nav className="navbar navbar-expand-lg" style={{background: "#2C3E50"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><i className="fa fa-store-alt"></i></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <LinkUrl link_url="" link_class="nav-link" link_nome="Produtos" link_style={{color: "white"}} />
                            </li>
                            <li className="nav-item">
                                <LinkUrl link_url="" link_class="nav-link" link_nome="Pedidos" link_style={{color: "white"}} />
                            </li>
                            <li className="nav-item dropdown">
                                <LinkUrl link_url="" link_class="nav-link" link_nome="Ofertas" link_style={{color: "white"}} />
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color: "white"}}>
                                    Olá {user.usuario}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Sair</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}