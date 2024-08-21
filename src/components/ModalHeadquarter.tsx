import { Modal } from "react-bootstrap"

interface Props {
    handleClose: Function
    show: boolean
}
export const ModalHeadquarter: preact.FunctionalComponent<Props> = ({ show, handleClose }) => {
    return (
            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton className="border-0" />
                <Modal.Body>
                    <div class="container">
                        <div class="row">

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
    )
}