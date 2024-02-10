import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AreaConteudo } from "../../components/AreaConteudo";

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
                <div>Corpo</div>
            } />
            {/* <div className="card container" style={{marginTop: "80px"}}> 
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
            </div> */}
            
            <Footer />

        </>
        
    );
}