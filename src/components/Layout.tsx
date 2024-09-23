import { useMemo, useState } from "preact/hooks"
import NavBarPro from "./NavBar"
import { CarouselCategories } from "./Page/CarouselCategories"
import { Fragment } from "preact/jsx-runtime"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { getCart, getCartQuantity, getTotal } from "@/utils/cart"
import { CheckCart } from "./Page/CheckCart"
import { formatPrice } from "@/utils/formatPrice"
import { Product } from "@/interfaces/ProductoFinal"
import { Form, InputGroup, Modal } from "react-bootstrap"
import '@/assets/css/responsive.css'
import '@/assets/css/main.css'
import '@/assets/css/color.css'

const Layout = ({ children, updateCart, setUpdateCart, headquarter, setHeadquarter }: { children: JSX.Element, updateCart: boolean, setUpdateCart: Function, headquarter: string, setHeadquarter: Function }) => {
    const params = useParams();
    const [showCart, setShowCart] = useState(false)
    let [searchParams, _setSearchParams] = useSearchParams();
    const location = useLocation()
    let query = searchParams.get("q");
    const [pedidos, setPedidos] = useState(false)
    const [_pedido, setPedido] = useState('')

    const [quantity, setQuantity] = useState(getCartQuantity())
    const [total, setTotal] = useState(getTotal())
    const [products, setProducts] = useState<Product[]>(getCart());

    useMemo(() => {
        if (updateCart) {
            setUpdateCart(false)
            setQuantity(getCartQuantity())
            setTotal(getTotal())
            setProducts(getCart())
        }
    }, [updateCart])

    const handleChangePedido = (event: Event) => {
        event.preventDefault()
        const field = event.target as HTMLInputElement | HTMLSelectElement

        if (field.name === 'idPedido') {
            setPedido(field.value)
        }
    }

    return (
        <Fragment>
            <NavBarPro setShowCart={setShowCart} quantity={quantity} headquarter={headquarter} setHeadquarter={setHeadquarter} setShowModal={setPedidos} />
            <div class="gi-side-cart-overlay" style={`display: ${showCart ? "block" : "none"}`} onClick={() => setShowCart(false)}></div>
            <div id="gi-side-cart" class={`gi-side-cart ${showCart ? "gi-open-cart" : ""}`} tabindex={-1}>
                <div class="gi-cart-inner">
                    <div class="gi-cart-top">
                        <div class="gi-cart-title">
                            <span class="cart_title">Mi Carrito</span>
                            <a href="javascript:void(0)" onClick={() => { setShowCart(false); setUpdateCart(true) }} class="gi-cart-close">
                                <i class="bi bi-x"></i>
                            </a>
                        </div>
                        <CheckCart setReload={setUpdateCart} products={products} setProducts={setProducts} />
                    </div>
                    <div class="gi-cart-bottom">
                        <div class="cart-sub-total">
                            <table class="table cart-table">
                                <tbody>
                                    <tr>
                                        <td class="text-left">Total :</td>
                                        <td class="text-right primary-color">{formatPrice(total)}</td>
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
                <div class="container">
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

            <Modal show={pedidos} onHide={() => setPedidos(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Rastrea tu pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <InputGroup className="mb-3" size="sm">
                                    <Form.Control
                                        placeholder="Ingrese el ID del pedido"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={handleChangePedido}
                                    />
                                    <InputGroup.Text id="basic-addon1" className={"bg-warning"} role={"button"}>
                                        <i className="bi bi-search p-1 text-white" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">

                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {location.pathname !== '/market/bill' && (<CarouselCategories />)}

            {children}

            <div class="footer-bottom m-t-40">
                <div class="container">
                    <div class="row">
                        <div class="gi-bottom-info">
                            <div class="footer-copy">
                                <div class="footer-bottom-copy ">
                                    <div class="gi-copy">Copyright © Inversiones La Central de Clemencia<br />
                                        all rights reserved. Powered by <a class="site-name" href="https://me.luiscaraballo.com.co">Ing. Luis Caraballo </a>.</div>
                                </div>
                            </div>
                            <div class="footer-bottom-right">
                                <div class="footer-bottom-payment d-flex justify-content-center">
                                    <div class="payment-link">
                                        <img src="/market/payment.png" alt="payment" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Layout