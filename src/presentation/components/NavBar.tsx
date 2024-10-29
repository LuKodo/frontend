export const NavBar = () => {
    return (
        <div className="border-bottom">
            <div className="py-5 bg-warning">
                <div className="container-fluid px-8">
                    <div className="row w-100 align-items-center gx-lg-2 gx-0">
                        <div className="col-xxl-2 col-lg-3 col-md-6 col-5">
                            <a className="navbar-brand d-none d-lg-block" href="/">
                                <img src="/logo.png" width={"80%"} alt="Inversiones La Central"/>
                            </a>
                            <div className="d-flex justify-content-between w-100 d-lg-none">
                                <a className="navbar-brand" href="/">
                                    <img src="/logo.png" width={"90%"} alt="Inversiones La Central"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-xxl-5 col-lg-5 d-none d-lg-block">
                            <form action="#">
                                <div className="input-group">
                                    <input className="form-control rounded" type="search"
                                           placeholder="Buscar productos"/>
                                    <span className="input-group-append">
                              <button className="btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end"
                                      type="button">
                                 <i className="bi bi-search"/>
                              </button>
                           </span>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-2 col-xxl-3 d-none d-lg-block">
                            <button type="button" className="btn btn-outline-warning-400 text-muted" data-bs-toggle="modal"
                                    data-bs-target="#locationModal">
                                <i className="bi bi-geo-alt-fill me-2"></i>
                                Sede:
                            </button>
                        </div>
                        <div className="col-lg-2 col-xxl-2 text-end col-md-6 col-7">
                            <div className="list-inline">
                                <div className="list-inline-item me-5 me-lg-0">
                                    <a className="text-muted position-relative" data-bs-toggle="offcanvas"
                                       data-bs-target="#offcanvasRight" href="#offcanvasExample" role="button"
                                       aria-controls="offcanvasRight">
                                        <i className="bi bi-cart-fill fs-3" aria-hidden="true"/>
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                 1
                                 <span className="visually-hidden">unread messages</span>
                              </span>
                                    </a>
                                </div>
                                <div className="list-inline-item d-inline-block d-lg-none">
                                    <button className="navbar-toggler collapsed" type="button"
                                            data-bs-toggle="offcanvas" data-bs-target="#navbar-default"
                                            aria-controls="navbar-default" aria-label="Toggle navigation">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                             fill="currentColor" className="bi bi-text-indent-left text-primary"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}