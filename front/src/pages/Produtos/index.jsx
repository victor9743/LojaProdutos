export const Produtos = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Produtos</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#">Pedidos</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#">Ofertas</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="card container" style={{marginTop: "80px"}}> 
                <div className="container mt-3">
                    <h3>Produtos</h3>
                </div>
                <div className="card-body">
                    <table class="table table-bordered table-striped table-hover " >
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </>
        
    );
}