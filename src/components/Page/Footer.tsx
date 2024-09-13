export const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-orange">
            <div className="container d-flex justify-content-between align-items-center">
                <span className="text-dark fw-bold">&copy; Inversiones La Central</span>
                <span className="text-dark fw-bold">Todos los derechos reservados</span>
                <span className="text-dark">
                    <img src="/market/logol.png" className="img-fluid" width={25} alt="" />
                </span>
            </div>
        </footer>
    )
}