export const Aviso = ({aviso_class, mensagem}) => {
    return (
        <div style={{ position: "relative" }}>
            <div className="d-flex justify-content-end mt-5 col-8" style={{ position: "absolute", right: 0, zIndex: 999 }}>
                <div className={aviso_class} role="alert">
                    {mensagem}
                </div>
            </div>
        </div>
    );
}