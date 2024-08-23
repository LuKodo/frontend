import { useMemo, useState } from "preact/hooks"
import { Col, Container, FormSelect, Modal, Row } from "react-bootstrap"
import { Sede } from "@/interfaces/Sede"

interface Props {
    handleClose: Function
    setHeadquarter: Function
    show: boolean
}
export const ModalHeadquarter: preact.FunctionalComponent<Props> = ({ show, handleClose, setHeadquarter }) => {
    const [categories, setCategories] = useState<Sede[]>([] as Sede[])

    useMemo(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/sede`)
            const data = await response.json()

            setCategories(data)
        }
        fetchCategories()
    }, [])

    return (
        <Modal show={show} onHide={() => handleClose()}>
            <Modal.Body className="pt-4">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div className="d-flex">
                                <div className="d-flex flex-column">
                                    <h5>¿Deseas cambiar de sede?</h5>
                                    <p>Te mostraremos sólo los productos disponibles para la zona que selecciones.</p>
                                </div>
                                <button type="button" className="btn-close ms-auto" aria-label="Close" onClick={() => handleClose()}></button>
                            </div>
                        </Col>
                        <Col xs={12} className="mt-3">
                            <FormSelect onChange={(e) => {
                                const target = e.target as HTMLSelectElement
                                setHeadquarter(target.value ?? 'SB')
                                handleClose()
                            }}>
                                <option disabled selected>Seleccionar</option>
                                {
                                    categories.map((category) => (
                                        <option key={category.nombre} value={category.prefijo}>{category.nombre}</option>
                                    ))
                                }
                            </FormSelect>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}