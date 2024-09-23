import { useAuth } from "@/contexts/AuthContext";
import { Fragment } from "preact/jsx-runtime"
import { Col, Container, Row } from "react-bootstrap"
import '@/assets/css/admin.css';

interface Props {
    children: any;
}

export const Template: preact.FunctionComponent<Props> = ({ children }) => {
    const { logout } = useAuth();

    return (
        <Fragment>
            <div class="navbar navbar-expand-lg fixed-top bg-primary" data-bs-theme="dark">
                <div class="container">
                    <a href="../" class="navbar-brand">Market Admin Panel</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/market/admin/products">
                                    <i className="bi bi-box ms-2" /> Productos
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/market/admin/categories">
                                    <i className="bi bi-list ms-2" /> Categorias
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/market/admin/promo">
                                    <i className="bi bi-bag-fill ms-2" /> Promociones
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/market/admin/carousel">
                                    <i className="bi bi-images ms-2" /> Carrusel
                                </a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ms-md-auto">
                            <li class="nav-item">
                                <a target="_blank" rel="noopener" onClick={logout} class="nav-link" href="https://github.com/thomaspark/bootswatch/"><i class="bi bi-box-arrow-in-right me-2" />Salir</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Container>
                <div className="bs-docs-section clearfix">
                <Row>
                    <Col md={12}>
                        {children}
                    </Col>
                </Row>
                </div>
            </Container>
        </Fragment>
    )
}