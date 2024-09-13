import { useState } from "preact/hooks";
import { Product } from "@/interfaces/ProductoFinal";
import { getCart, getCartQuantity, setCart } from "@/utils/cart";
import { formatPrice } from "@/utils/formatPrice";
import { Button, Card, InputGroup } from "react-bootstrap";
import ImageCart from "@/components/Page/ImageCart";
import { Fragment } from "preact/jsx-runtime";
import { ModalHeadquarter } from "@/components/Page/ModalHeadquarter";
import { CheckCart } from "@/components/Page/CheckCart";
import { EstadoPedido } from "@/utils/estadosPedidos.enum";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { NavBarPro } from "@/components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Page/Footer";

interface iDelivery {
    fecha_pedido: string
    id_estado: number
    prefijo: string
    total: number
    nombres: string
    apellidos: string
    direccion: string
    telefono: string
    forma_pago: string
    detalles?: iDeliveryDetails[]
}

interface Client {
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
    const [headquarter, setHeadquarter] = useState('SB')
    const [headquarterShow, setHeadquarterShow] = useState(false)
    const [cartShow, setCartShow] = useState(false)
    const [products, setProducts] = useState<Product[]>(getCart());
    const [cartQuantity, setCartQuantity] = useState(0)
    const [client, setClient] = useState<Client>({} as Client)
    const navigate = useNavigate()

    const handleChangeClient = (event: Event) => {
        event.preventDefault()
        const field = event.target as HTMLInputElement | HTMLSelectElement

        if (field.name === 'forma_pago') {
            setClient({
                ...client,
                [field.name]: field.value
            })
            return
        }

        setClient({
            ...client,
            [field.name]: field.value
        })
    }

    const deleteProduct = (product: Product) => {
        setProducts(products.filter((p: Product) => p.product.codigo !== product.product.codigo));
        setCart(products.filter((p: Product) => p.product.codigo !== product.product.codigo));
    }

    const createDelivery = async () => {
        if (!client.nombres) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta el nombre',
            })
            return
        }

        if (!client.apellidos) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta el apellido',
            })
            return
        }

        if (!client.direccion) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta la dirección',
            })
            return
        }

        if (!client.telefono) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta el teléfono',
            })
            return
        }

        if (!client.forma_pago) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta la forma de pago',
            })
            return
        }

        const newDelivery: iDelivery = {
            fecha_pedido: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            id_estado: EstadoPedido.PENDIENTE,
            prefijo: headquarter,
            total: products.reduce((total: number, product: Product) => total + product.quantity * (product.product.precioventageneral ?? 0), 0),
            nombres: client.nombres,
            apellidos: client.apellidos,
            direccion: client.direccion,
            telefono: client.telefono,
            forma_pago: client.forma_pago,
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/delivery`, {
            method: 'POST',
            body: JSON.stringify(newDelivery)
        })

        const data = await response.json()

        if (data) {
            const deliveryDetails = products.map((product: Product) => {
                return {
                    id_detalle: 0,
                    id_pedido: data.id,
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
                    text: 'Se ha generado la orden, tu numero de pedido es: ' + data.id,
                })

                setProducts([])
                setCart([])
                setClient({} as Client)
                navigate('/market/')
            })
        }
    }

    const getQty = getCartQuantity()
    setCartQuantity(getQty)

    const handleCloseCart = () => setCartShow(false)

    return (
        <Fragment>
            <CheckCart show={cartShow} handleClose={handleCloseCart} setQty={setCartQuantity} />
            <ModalHeadquarter show={headquarterShow} handleClose={() => setHeadquarterShow(false)} setHeadquarter={setHeadquarter} />
            <NavBarPro headquarter={headquarter} setHeadquarterShow={setHeadquarterShow} cartQuantity={cartQuantity} setCartShow={setCartShow} />

            <div className="container py-5">
                <div className="row">
                    <div class="col-12">
                        <div class="checkout__form">
                            <form action="#">
                                <div class="row">
                                    <div class="col-lg-5 col-12">
                                        <Card>
                                            <Card.Body>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <h4>Detalles de envío</h4>
                                                        <div class="mb-3">
                                                            <p>Nombres<span>*</span></p>
                                                            <input type="text" name="nombres" onChange={handleChangeClient} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <div class="mb-3">
                                                            <p>Apellidos<span>*</span></p>
                                                            <input type="text" name="apellidos" onChange={handleChangeClient} className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <p>Dirección<span>*</span></p>
                                                    <div className="d-flex gap-3">
                                                        <textarea type="text" name="direccion" onChange={handleChangeClient} placeholder="" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="mb-3">
                                                            <p>Teléfono<span>*</span></p>
                                                            <input type="text" name="telefono" onChange={handleChangeClient} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <div class="mb-3">
                                                            <p>Forma de pago<span>*</span></p>
                                                            <select name="forma_pago" onChange={handleChangeClient} class="form-select">
                                                                <option value="" disabled selected>Seleccionar</option>
                                                                <option value="EFECTIVO">Efectivo</option>
                                                                <option value="TRANSFERENCIA">Transferencia / Datafono</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div class="col-lg-7 col-md-12">
                                        <Card>
                                            <Card.Body>
                                                <h4>Tu orden</h4>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="shoping__cart__table">
                                                            <table className="table table-responsive table-sm table-borderless table-hover align-middle">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="shoping__product">Producto</th>
                                                                        <th>Precio</th>
                                                                        <th>Cant.</th>
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
                                                                            products.map((product: Product) => (
                                                                                <tr key={product.product.codigo}>
                                                                                    <td class="d-flex align-items-center gap-2">
                                                                                        <ImageCart imageName={product.product.codigo} />
                                                                                        <h5 class="small">{product.product.nombre}</h5>
                                                                                    </td>
                                                                                    <td class="shoping__cart__price">
                                                                                        {formatPrice(product.product.precioventageneral ?? 0)}
                                                                                    </td>
                                                                                    <td class="w-25">
                                                                                        <InputGroup>{product.quantity}</InputGroup>
                                                                                    </td>
                                                                                    <td class="shoping__cart__total">
                                                                                        {formatPrice((product.product.precioventageneral ?? 0) * product.quantity)}
                                                                                    </td>
                                                                                    <td>
                                                                                        <Button variant="danger" size="sm">
                                                                                            <i class="bi bi-trash" onClick={() => deleteProduct(product)}></i>
                                                                                        </Button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        )
                                                                    }
                                                                    <tr>
                                                                        <td colSpan={3} class="shoping__cart__total">
                                                                            <h5>Total</h5>
                                                                        </td>
                                                                        <td class="shoping__cart__total" colSpan={2}>
                                                                            <h5>
                                                                                {formatPrice(getCart().reduce((acc: number, product: Product) => acc + (product.product.precioventageneral ?? 0) * product.quantity, 0))}
                                                                            </h5>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3">
                                                    <Button onClick={createDelivery} variant="success" className='w-50'>Pagar</Button>
                                                    <Link className='w-50 btn btn-danger' to={'/market'}>Cancelar</Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default CheckBill