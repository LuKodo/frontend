import { createSignal } from "solid-js";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "solid-bootstrap";
import { getCart, getHeadquarter, setCart } from "../../../../shared/utils/cart.tsx";
import { Product, Productofinal } from "../../../../admin/domain/entities/ProductoFinal.ts";
import { EstadoPedido } from "../../../../shared/utils/estadosPedidos.enum.ts";
import Layout from "../components/StoreLayout.tsx";
import { formatPrice } from "../../../../shared/utils/formatPrice.tsx";
import ImageCart from "../../../../components/Page/ImageCart.tsx";

export interface iDelivery {
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
    detalles?: iDeliveryDetails[]
}

interface Client {
    tipodoc: string
    documento: string
    nombres: string
    apellidos: string
    direccion: string
    telefono: string
    forma_pago: string
}

interface iDeliveryDetails {
    id_detalle: number
    id_pedido: number
    codigo: string
    cantidad: number
    precio_unitario: number
    subtotal: number
}

const CheckBill = () => {
    const [headquarter, setHeadquarter] = createSignal(getHeadquarter())
    const [updateCart, setUpdateCart] = createSignal(false)
    const [products, setProducts] = createSignal<Product[]>(getCart());
    const [client, setClient] = createSignal<Client>({} as Client)
    const [loading, setLoading] = createSignal(false)
    const navigate = useNavigate()

    const [buscar, setBuscar] = createSignal(true);

    const handleChangeClient = (event: { preventDefault: () => void; target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement; }) => {
        event.preventDefault()
        const field = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

        if (field.name === 'forma_pago') {
            setClient({
                ...client(),
                [field.name]: field.value
            })
            return
        }

        setClient({
            ...client(),
            [field.name]: field.value
        })
    }

    const deleteProduct = (product: Product) => {
        setProducts(products().filter((p: Product) => p.product.codigo !== product.product.codigo));
        setCart(products().filter((p: Product) => p.product.codigo !== product.product.codigo));
    }

    const createDelivery = async () => {
        if (!client().nombres) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta el nombre',
            })
            return
        }

        if (!client().apellidos) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta el apellido',
            })
            return
        }

        if (!client().direccion) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta la dirección',
            })
            return
        }

        if (!client().telefono) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta el teléfono',
            })
            return
        }

        if (!client().forma_pago) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta la forma de pago',
            })
            return
        }
        setLoading(true)

        const newDelivery: iDelivery = {
            fecha_pedido: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            id_estado: EstadoPedido.PENDIENTE,
            prefijo: headquarter() ?? 'SB',
            total: products().reduce((total: number, product: Product) => total + product.quantity * (product.product.precioventageneral ?? 0), 0),
            tipodoc: client().tipodoc,
            documento: client().documento,
            nombres: client().nombres,
            apellidos: client().apellidos,
            direccion: client().direccion,
            telefono: client().telefono,
            forma_pago: client().forma_pago,
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/delivery`, {
            method: 'POST',
            body: JSON.stringify(newDelivery)
        })

        const data = await response.json()

        if (data) {
            const deliveryDetails = products().map((product: Product) => {
                return {
                    id_detalle: 0,
                    id_pedido: data,
                    codigo: product.product.codigo,
                    cantidad: product.quantity,
                    precio_unitario: product.product.precioventageneral ?? 0,
                    subtotal: product.quantity * (product.product.precioventageneral ?? 0)
                }
            })

            await fetch(`${import.meta.env.VITE_API_URL}/deliverydetail`, {
                method: 'POST',
                body: JSON.stringify(deliveryDetails)
            }).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Listo',
                    text: 'Se ha generado la orden, tu numero de pedido es: ' + data,
                })
                setProducts([])
                setCart([])
                setClient({} as Client)
                navigate('/market/')
            })
        }
    }

    const handleSearch = async () => {
        if (client().documento === '' || client().documento === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta el documento',
            })
            return
        }

        await fetch(`${import.meta.env.VITE_API_URL}/client/${client().documento}`).then((res) => {
            if (res.status !== 404) {
                res.json().then((data) => {
                    setClient({
                        tipodoc: data[0].tipodoc,
                        documento: data[0].documento,
                        nombres: data[0].nombres,
                        apellidos: data[0].apellidos,
                        direccion: data[0].direccion,
                        telefono: data[0].telefono,
                        forma_pago: data[0].forma_pago
                    })
                })
            } else {
                setBuscar(false)
            }
        })
    }

    const addProduct = (product: Productofinal, quantity: number) => {
        const existingProduct = products().find((p: Product) => p.product.codigo === product.codigo);
        let newProducts = [];

        if (existingProduct) {
            newProducts = products().map((p: Product) => p.product.codigo === product.codigo ? { ...p, quantity: quantity } : p)
        } else {
            products().push({ product, quantity });
            newProducts = [...products(), { product, quantity }];
        }

        setProducts(newProducts);
        setCart(newProducts);
    }

    const increase = (value: number, max: number, product: Productofinal) => {
        const newVal = value + 0.5;
        const val = newVal <= max ? newVal : max;
        addProduct(product, val);
    }

    const decrease = (value: number, min: number, product: Productofinal) => {
        const newVal = value - 0.5;
        const val = newVal >= min ? newVal : min;
        addProduct(product, val);
    }

    return (
        <Layout headquarter={headquarter() ?? 'SB'} setHeadquarter={setHeadquarter} updateCart={updateCart()} setUpdateCart={setUpdateCart}>
            {
                loading() ?
                    <div id="gi-overlay" class="text-center" style={{ display: "block;" }}>
                        <div class="loader"></div>
                        <img src="/market/logo.png" alt="" />
                    </div> :
                    <div class="container">
                        <div class="row">
                            <div class="gi-cart-rightside col-lg-4 col-md-12">
                                <div class="gi-sidebar-wrap">
                                    <div class="gi-sidebar-block">
                                        <div class="gi-sb-title">
                                            <h3 class="gi-sidebar-title">Detalles del Pedido<div class="gi-sidebar-res"><i class="gicon gi-angle-down"></i></div></h3>
                                        </div>
                                        <div class="gi-sb-block-content gi-sidebar-dropdown bg-white">
                                            <div class="gi-cart-form p-3">
                                                <div>
                                                    <span class="gi-cart-wrap">
                                                        <label>Número de Documento</label>
                                                        <InputGroup class={"mb-3"}>
                                                            <input type="text" name="documento" disabled={!buscar()} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} onChange={handleChangeClient} class="form-control mb-0" value={client().documento} />
                                                            <button type="button" class="btn btn-primary" onClick={handleSearch}> {buscar() ? <i class="bi bi-search" /> : <i class="bi bi-check" />} </button>
                                                        </InputGroup>
                                                    </span>
                                                    <span class="gi-cart-wrap">
                                                        <label>Nombres</label>
                                                        <input type="text" name="nombres" disabled={buscar()} onChange={handleChangeClient} class="form-control" value={client().nombres} />
                                                    </span>
                                                    <span class="gi-cart-wrap">
                                                        <label>Apellidos</label>
                                                        <input type="text" name="apellidos" disabled={buscar()} onChange={handleChangeClient} class="form-control" value={client().apellidos} />
                                                    </span>
                                                    <span class="gi-cart-wrap">
                                                        <label>Dirección</label>
                                                        <textarea name="direccion" disabled={buscar()} onChange={handleChangeClient} class="form-control" value={client().direccion} />
                                                    </span>
                                                    <span class="gi-cart-wrap">
                                                        <label>Teléfono</label>
                                                        <input type="text" name="telefono" disabled={buscar()} onChange={handleChangeClient} class="form-control" value={client().telefono} />
                                                    </span>
                                                    <span class="gi-cart-wrap">
                                                        <label>Forma de pago</label>
                                                        <span class="gi-cart-select-inner">
                                                            <select onChange={handleChangeClient} name="forma_pago" id="gi-cart-select-state" class="form-select">
                                                                <option selected disabled>Seleccionar</option>
                                                                <option value="EFECTIVO">Efectivo</option>
                                                                <option value="TRANSFERENCIA">Transferencia / Datafono</option>
                                                            </select>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="gi-sb-block-content gi-sidebar-dropdown">
                                            <div class="gi-cart-summary-bottom">
                                                <div class="gi-cart-summary">
                                                    <div>
                                                        <span class="text-left">Sub-Total</span>
                                                        <span class="text-right">{formatPrice(products().reduce((total: number, product: Product) => total + product.quantity * (product.product.precioventageneral ?? 0), 0))}</span>
                                                    </div>
                                                    <div>
                                                        <span class="text-left">Valor del Domicilio</span>
                                                        <span class="text-right">$1500</span>
                                                    </div>
                                                    <div class="gi-cart-summary-total">
                                                        <span class="text-left">Total</span>
                                                        <span class="text-right">{formatPrice((products().reduce((total: number, product: Product) => total + product.quantity * (product.product.precioventageneral ?? 0), 0)) + 1500)}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="gi-cart-leftside col-lg-8 col-md-12 m-t-991">
                                <div class="gi-cart-content">
                                    <div class="gi-cart-inner">
                                        <div class="row">
                                            <div>
                                                <div class="table-content cart-table-content">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Producto</th>
                                                                <th>Precio</th>
                                                                <th style={{ "text-align": "center" }}>Cantidad</th>
                                                                <th>Total</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                products.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan={5} class="shoping__cart__item">
                                                                            <h5>No hay productos en el carrito</h5>
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    products().map((product: Product) => (
                                                                        <tr>
                                                                            <td data-label="Product" class="gi-cart-pro-name">
                                                                                <a href="javascript:void(0)">
                                                                                    <ImageCart imageName={product.product.codigo} /> {product.product.nombre}
                                                                                </a>
                                                                            </td>
                                                                            <td data-label="Price" class="gi-cart-pro-price">
                                                                                <span class="amount">{formatPrice(product.product.precioventageneral ?? 0)}</span>
                                                                            </td>
                                                                            <td data-label="Quantity" class="gi-cart-pro-qty" style={{ 'text-align': "center" }}>
                                                                                <div class="cart-qty-plus-minus">
                                                                                    <input class="cart-plus-minus" type="text" name="cartqtybutton" value={product.quantity} />
                                                                                    <div class="ms_cart_qtybtn">
                                                                                        <div class="inc ms_qtybtn" onClick={() => increase(product.quantity, 10, product.product)}>+</div>
                                                                                        <div class="dec ms_qtybtn" onClick={() => decrease(product.quantity, 1, product.product)}>-</div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td class="shoping__cart__total">
                                                                                {formatPrice((product.product.precioventageneral ?? 0) * product.quantity)}
                                                                            </td>
                                                                            <td data-label="Remove" class="gi-cart-pro-remove">
                                                                                <a href="#" onClick={() => deleteProduct(product)}><i class="gicon bi bi-trash"></i></a>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="gi-cart-update-bottom">
                                                            <a href="/market/shop/all">Seguir Comprando</a>
                                                            <button class="gi-btn-2" onClick={createDelivery}>Realizar pedido</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }


        </Layout>
    )
}

export default CheckBill