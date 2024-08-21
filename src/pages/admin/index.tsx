import { Col, Container, Row } from "react-bootstrap"

export const Admin = () => {
    return (
        <Container>
            <Row className="mt-3">
                <Col md={2}>
                    <div class="card bg-info w-100 shadow-none" role="button">
                        <div class="card-body">
                            <span class="fw-bold fs-4 text-white mb-0">Categorias <i className="bi bi-list ms-2" /></span>
                        </div>
                    </div>
                </Col>
                <Col md={2}>
                    <div class="card bg-info w-100 shadow-none" role="button">
                        <div class="card-body">
                            <span class="fw-bold fs-4 text-white mb-0">Promociones <i className="bi bi-bag-fill ms-2" /></span>
                        </div>
                    </div>
                </Col>
                <Col md={2}>
                    <div class="card bg-info w-100 shadow-none" role="button">
                        <div class="card-body">
                            <span class="fw-bold fs-4 text-white mb-0">Carrusel <i className="bi bi-images ms-2" /></span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}