import { useState } from "react";
import { LinkUrl } from "../Link";
export const Navbar = () => {
    const [user, setUser] = useState(
     [
        {
            usuario: localStorage.getItem('usuario')
        }
     ]   
    )
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
                        <form className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div>

                    </div>
                </div>
            </nav>
    )
}