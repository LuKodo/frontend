import { useAuth } from "@contexts/AuthContext";
import { Fragment } from "preact/jsx-runtime"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useLocation } from "wouter";

interface Props {
    children: any;
}

export const Template: preact.FunctionComponent<Props> = ({ children }) => {
    const [_location, setLocation] = useLocation();
    const { logout } = useAuth();

    return (
        <Fragment>
            <Container>
                <div className="mx-3 my-3 d-flex align-items-center justify-content-between gap-3">
                    <div className="mx-3 my-3 d-flex align-items-center justify-content-start gap-3">
                        <Button variant="warning" size="sm" className="" onClick={() => setLocation('/admin/products')}>
                            <i className="bi bi-box ms-2" /> Productos
                        </Button>
                        <Button variant="warning" size="sm" className="" onClick={() => setLocation('/admin/categories')}>
                            <i className="bi bi-list ms-2" /> Categorias
                        </Button>
                        <Button variant="warning" size="sm" className="" onClick={() => setLocation('/admin/promo')}>
                            <i className="bi bi-bag-fill ms-2" /> Promociones
                        </Button>
                        <Button variant="warning" size="sm" className="" onClick={() => setLocation('/admin/carousel')}>
                            <i className="bi bi-images ms-2" /> Carrusel
                        </Button>
                    </div>

                    <Button variant="danger" size="sm" className="" onClick={logout}>
                        <i className="bi bi-arrow-clockwise me-1" /> Salir
                    </Button>
                </div>
            </Container>

            <Container>
                <Row>
                    <Col md={12}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}