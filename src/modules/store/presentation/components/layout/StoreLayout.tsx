import { Container, Form, InputGroup, Modal } from "solid-bootstrap";
import { createMemo, createSignal } from "solid-js"
import { getCart, getCartQuantity, getTotal } from "../../../../../shared/utils/cart.tsx"
import { Product } from "../../../../../admin/domain/entities/ProductoFinal.ts"
import { get_human_status } from "../../../../../shared/utils/estadosPedidos.enum.ts"
import NavBarPro from '../NavBar.tsx';
import { OffcanvasCategory } from '../category/OffcanvasCategory.tsx';
import { OffcanvasCart } from '../cart/OffcanvasCart.tsx';

export interface iDelivery {
    id_pedido: number
    fecha_pedido: string
    id_estado: number
    prefijo: string
    total: number
    tipodoc: string
    documento: string
    nombres: string
    apellidos: string
    direccion: string
    telefono: string
    forma_pago: string
}

interface iDeliveryDetails {
    nombre: string
    cantidad: number
    precio_unitario: number
    subtotal: number
}

const fetchProducts = async (search = '', page: number = 1, headquarter: string, category?: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const params = {
        "limit": 20,
        "offset": page,
        "sede": headquarter,
        "categoria": category,
        "paginapromo": "SI",
        "query": search
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/products_admin`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return response.json();
};

const StoreLayout = ({ children }: { children: any }) => {
    const [showCart, setShowCart] = createSignal(false)
    const [tracking, setTracking] = createSignal(false)
    const [idPedido, setIdPedido] = createSignal('')
    const [pedido, setPedido] = createSignal<iDelivery | undefined>(undefined)
    const [detallePedido, setDetallePedido] = createSignal<iDeliveryDetails[] | undefined>(undefined)
    const [showListCategories, setShowListCategories] = createSignal(false);

    const LocateShipment = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tracking/${idPedido()}`)
        const data = await response.json()
        setPedido(data.pedido[0])
        setDetallePedido(data.detalle)
    }

    const handleCloseCategories = () => setShowListCategories(false);
    const handleOpenCategories = () => setShowListCategories(true);

    const handleCloseCart = () => setShowCart(false);
    const handleOpenCart = () => setShowCart(true);

    const handleCloseRastreo = () => setTracking(false);
    const handleOpenRastreo = () => setTracking(true);

    return (
        <>
            <NavBarPro
                openCart={handleOpenCart}
                open={handleOpenRastreo}
                openCategories={handleOpenCategories}
            />

            <OffcanvasCategory
                handleClose={handleCloseCategories}
                show={showListCategories}
            />

            <OffcanvasCart
                handleClose={handleCloseCart}
                show={showCart()}
            />

            <Modal show={tracking()} onHide={handleCloseRastreo}>
                <Modal.Header closeButton>
                    <Modal.Title>Rastrea tu pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <InputGroup class="mb-3" size="sm">
                                    <Form.Control
                                        placeholder="Ingrese el ID del pedido"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => {
                                            const field = e.target as HTMLInputElement
                                            setIdPedido(field.value)
                                        }}
                                        value={idPedido()}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                LocateShipment()
                                            }
                                        }}
                                    />
                                    <InputGroup.Text id="basic-addon1" onClick={LocateShipment} class={"bg-warning"}
                                        role={"button"}>
                                        <i class="bi bi-search p-1 text-white" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                {
                                    pedido() !== undefined &&
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p># de pedido: {pedido()?.id_pedido}</p>
                                        <p>Estado: <label
                                            class="badge bg-success">{get_human_status(Number(pedido()?.id_estado))}</label>
                                        </p>
                                    </div>
                                }

                                {
                                    detallePedido &&
                                    <>
                                        <h5 class="fw-bold small">Detalles del pedido</h5>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Cantidad</th>
                                                    <th>Precio</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    detallePedido()?.map((item: iDeliveryDetails) => (
                                                        <tr>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.cantidad}</td>
                                                            <td>{item.precio_unitario}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Container class='mt-3 px-0'>
                {children}
            </Container>

            <div class="footer mt-auto py-3 bg-body-tertiary">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <div class="gi-copy">Copyright © Inversiones La Central de Clemencia<br />
                                all rights reserved. Powered by <a class="site-name"
                                    href="https://me.luiscaraballo.com.co">Ing. Luis
                                    Caraballo </a>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreLayout