import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export const NotFound  = () => {

    return (
        <>
            <Navbar />
                <div className="text-center" style={{marginTop: "200px"}}>
                    <h1>Not Found - 404</h1>
                </div>
            <Footer />
        </>
    )

}