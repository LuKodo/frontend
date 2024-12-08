import {Component, createMemo, createSignal} from "solid-js"
import { Col, Container, FormSelect, Modal, Row } from "solid-bootstrap"
import {Sede} from "../../admin/domain/entities/Sede.ts";
import {getHeadquarter, setHeadquarterLocal} from "../../shared/utils/cart.tsx";

interface Props {
    handleClose: Function
    setHeadquarter: Function
    show: boolean
}
export const ModalHeadquarter: Component<Props> = ({ show, handleClose, setHeadquarter }) => {
    const [categories, setCategories] = createSignal<Sede[]>([] as Sede[])

    createMemo(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/headquarters`)
            const data = await response.json()

            const headquarter = getHeadquarter()
            if (headquarter) {
                setHeadquarter(headquarter)
            }

            setCategories(data)
        }
        fetchCategories()
    }, [])

    const setHeadquarterL = (hq: string) => {
        setHeadquarter(hq)
        setHeadquarterLocal(hq)
    }


    return (
        <Modal show={show} onHide={() => handleClose()}>
            <Modal.Body class="pt-4">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div class="d-flex">
                                <div class="d-flex flex-column">
                                    <h5>¿Deseas cambiar de sede?</h5>
                                    <p>Te mostraremos sólo los productos disponibles para la zona que selecciones.</p>
                                </div>
                                <button type="button" class="btn-close ms-auto" aria-label="Close" onClick={() => handleClose()}></button>
                            </div>
                        </Col>
                        <Col xs={12} class="mt-3">
                            <FormSelect onChange={(e) => {
                                const target = e.target as HTMLSelectElement
                                setHeadquarterL(target.value ?? 'SB')
                                handleClose()
                            }}>
                                <option disabled selected>Seleccionar</option>
                                {
                                    categories().map((category) => (
                                        <option value={category.prefijo}>{category.nombre}</option>
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