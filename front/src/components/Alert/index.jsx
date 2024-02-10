export const Alert = ({alert_mensagem, alerta_class }) => {
    return (
        <div className="col-12 mt-5">
            <div className="d-flex justify-content-end">
                <div className={alerta_class} role="alert">
                    { alert_mensagem }
                </div>
            </div>
        </div>
    )
}