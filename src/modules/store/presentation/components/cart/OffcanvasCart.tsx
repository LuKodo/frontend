import { Offcanvas } from "solid-bootstrap"
import { Component } from "solid-js"
import { CheckCart } from "../../../../../components/Page/CheckCart.tsx"

export const OffcanvasCart: Component<{ show: boolean, handleClose: Function }> = ({ show, handleClose }) => {
    return (
        <Offcanvas show={show} onHide={handleClose()} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Mi Carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <CheckCart />

                <div class="d-flex">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td class="text-left">Total :</td>
                                <td class="text-right primary-color">{ }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <a href="/bill" class="btn btn-warning text-white fw-bold w-100">Realizar pedido</a>
            </Offcanvas.Body>
        </Offcanvas>
    )
}