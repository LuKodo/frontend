import { Col, Container, Row } from "solid-bootstrap"
import '@/css/admin.css';
import { useAuth } from "../contexts/AuthContext";
import { lazy } from "solid-js";

const ProtectedRoute = lazy(() => import('../../../components/ProtectedRoute'));

export const Template = (props: { children: any }) => {
    const { logout } = useAuth();

    return (
        <ProtectedRoute>
            <div class="navbar navbar-expand-lg fixed-top bg-primary" data-bs-theme="dark">
                <div class="container">
                    <a href="../../../pages" class="navbar-brand">Market Admin Panel</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/admin/products">
                                    <i class="bi bi-box ms-2" /> Productos
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/admin/categories">
                                    <i class="bi bi-list ms-2" /> Categorias
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/admin/promo">
                                    <i class="bi bi-bag-fill ms-2" /> Promociones
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/admin/carousel">
                                    <i class="bi bi-images ms-2" /> Carrusel
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
                <div class="bs-docs-section clearfix">
                <Row>
                    <Col md={12}>
                        {props.children}
                    </Col>
                </Row>
                </div>
            </Container>
        </ProtectedRoute>
    )
}