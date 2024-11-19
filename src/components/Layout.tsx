import NavBarPro from "./NavBar"
import '@/css/responsive.css'
import '@/css/main.css'
import '@/css/color.css'
import { Form, InputGroup, Modal } from "solid-bootstrap";
import { useParams, useSearchParams } from "@solidjs/router"
import { createMemo, createSignal } from "solid-js"
import { getCart, getCartQuantity, getTotal } from "../shared/utils/cart"
import { Product } from "../admin/domain/entities/ProductoFinal"
import { CheckCart } from "./Page/CheckCart"
import { formatPrice } from "../shared/utils/formatPrice"
import { get_human_status } from "../shared/utils/estadosPedidos.enum"

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

const Layout = ({ children, updateCart, setUpdateCart, headquarter, setHeadquarter }: { children: any, updateCart: boolean, setUpdateCart: Function, headquarter: string, setHeadquarter: Function }) => {
    const params = useParams();
    const [showCart, setShowCart] = createSignal(false)
    let [searchParams, _setSearchParams] = useSearchParams();
    let query = searchParams.q;
    const [rastreo, setRastreo] = createSignal(false)
    const [idPedido, setIdPedido] = createSignal('')
    const [pedido, setPedido] = createSignal<iDelivery | undefined>(undefined)
    const [detallePedido, setDetallePedido] = createSignal<iDeliveryDetails[] | undefined>(undefined)
    const [showListCategories, setShowListCategories] = createSignal(false);

    const [quantity, setQuantity] = createSignal(getCartQuantity())
    const [total, setTotal] = createSignal(getTotal())
    const [products, setProducts] = createSignal<Product[]>(getCart());

    createMemo(() => {
        if (updateCart) {
            setUpdateCart(false)
            setQuantity(getCartQuantity())
            setTotal(getTotal())
            setProducts(getCart())
        }
    })

    const rastrear = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tracking/${idPedido}`)
        const data = await response.json()
        setPedido(data.pedido[0])
        setDetallePedido(data.detalle)
    }

    const closeModal = () => {
        setRastreo(false)
        setIdPedido('')
        setPedido(undefined)
        setDetallePedido(undefined)
    }

    return (
        <>
            <NavBarPro
                setShowCart={setShowCart}
                quantity={quantity()}
                headquarter={headquarter}
                setHeadquarter={setHeadquarter}
                setShowModal={setRastreo}
                setShowListCategories={setShowListCategories}
            />

            <div class={`offcanvas offcanvas-start ${showListCategories() ? 'show' : ''}`} tabIndex={-1} id="offcanvas" aria-labelledby="offcanvasLabel">
                <div class="offcanvas-header shadow-sm">
                    <h5 class="offcanvas-title fw-bold" id="offcanvasLabel">Categorías</h5>
                    <button type="button" onClick={() => setShowListCategories(false)} class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    Content for the offcanvas goes here. You can place just about any Bootstrap component or custom
                    elements here.
                </div>
            </div>

            <div class={`gi-side-cart-overlay ${showCart() ? "block" : "none"}`}
                onClick={() => setShowCart(false)}></div>
            <div id="gi-side-cart" class={`gi-side-cart ${showCart() ? "gi-open-cart" : ""}`} style={{ "z-index": 1030 }}
                tabIndex={-1}>
                <div class="gi-cart-inner">
                    <div class="gi-cart-top">
                        <div class="gi-cart-title">
                            <span class="cart_title">Mi Carrito</span>
                            <a href="javascript:void(0)" onClick={() => {
                                setShowCart(false);
                                setUpdateCart(true)
                            }} class="gi-cart-close">
                                <i class="bi bi-x"></i>
                            </a>
                        </div>
                        <CheckCart setReload={setUpdateCart} products={products()} setProducts={setProducts} />
                    </div>
                    <div class="gi-cart-bottom">
                        <div class="cart-sub-total">
                            <table class="table cart-table">
                                <tbody>
                                    <tr>
                                        <td class="text-left">Total :</td>
                                        <td class="text-right primary-color">{formatPrice(total())}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="cart_btn">
                            <a href="/market/bill" class="gi-btn-2 w-100">Realizar pedido</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="gi-breadcrumb m-b-40">
                <div class="container mt-5">
                    <div class="row">
                        <div class="col-12">
                            <div class="row gi_breadcrumb_inner">
                                <div class="col-md-6 col-sm-12">
                                    <h2 class="gi-breadcrumb-title">{query && `Resultados para:`} <i>{query}</i></h2>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <ul class="gi-breadcrumb-list">
                                        <li class="gi-breadcrumb-item">
                                            <a href="/market/">
                                                <i class="bi bi-house-fill" />
                                            </a>
                                        </li>
                                        <li class="gi-breadcrumb-item active">{params.category ? params.category === 'all' ? 'Todos' : params.category : "Pagina Principal"}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={rastreo()} onHide={closeModal}>
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
                                                rastrear()
                                            }
                                        }}
                                    />
                                    <InputGroup.Text id="basic-addon1" onClick={rastrear} class={"bg-warning"}
                                        role={"button"}>
                                        <i class="bi bi-search p-1 text-white" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                {
                                    pedido !== undefined &&
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

            {children}

            <div class="footer-bottom m-t-40">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="gi-copy">Copyright © Inversiones La Central de Clemencia<br />
                                all rights reserved. Powered by <a class="site-name"
                                    href="https://me.luiscaraballo.com.co">Ing. Luis
                                    Caraballo </a>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <a href="#" class="position-fixed bottom-0 end-0 me-3 mb-3 hover-pedido" style={{ "z-index": 1030 }}>
                <img
                    src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo-whatsapp-256.png"
                    width={"60"} height={"60"} alt="" />
                <span class="tooltip-top small">
                    Rastrea tu pedido
                </span>
            </a>
        </>
    )
}

export default Layout