import { useState } from "preact/hooks";
import { Product } from "../../interfaces/interfaces";
import { getCart, setCart } from "../../utils/cart";
import { formatPrice } from "../../utils/formatPrice";
import { Button, Container, InputGroup, Navbar } from "react-bootstrap";
import ImageCart from "../../components/ImageCart";
import { Fragment } from "preact/jsx-runtime";
import { Link } from "wouter";

export const CheckBill = () => {
    const [products, setProducts] = useState<Product[]>(getCart());
    const deleteProduct = (product: Product) => {
        setProducts(products.filter((p: Product) => p.product.codigo !== product.product.codigo));
        setCart(products.filter((p: Product) => p.product.codigo !== product.product.codigo));
    }

    return (
        <Fragment>
            <Navbar expand='lg' className={'bg-success'} sticky="top">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src="/logo.png" alt="" className="img-fluid w-50" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
            <div className="container py-5">
                <div className="row">
                    <div class="col-lg-10 offset-lg-1 col-md-8 offset-md-2">
                        <div class="checkout__form">
                            <form action="#">
                                <div class="row">
                                    <div class="col-lg-5 col-md-6">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <h4>Detalles de envío</h4>
                                                <div class="mb-3">
                                                    <p>Nombres<span>*</span></p>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <div class="mb-3">
                                                    <p>Apellido<span>*</span></p>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <p>Dirección<span>*</span></p>
                                            <div className="d-flex gap-3">
                                                <input type="text" placeholder="Street Address" class="form-control" />
                                                <input type="text" placeholder="Apartment, suite, unite ect (optinal)" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="mb-3">
                                                    <p>Teléfono<span>*</span></p>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-7 col-md-6">
                                        <h4>Tu orden</h4>

                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="shoping__cart__table">
                                                    <table className="table table-sm">
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
                                                                                {formatPrice(product.product.precioventageneral)}
                                                                            </td>
                                                                            <td class="w-25">
                                                                                <InputGroup>{product.quantity}</InputGroup>
                                                                            </td>
                                                                            <td class="shoping__cart__total">
                                                                                {formatPrice(product.product.precioventageneral * product.quantity)}
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
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <Button type="submit" variant="success" className='w-50'>Pagar</Button>
                                            <Link className='w-50 btn btn-danger' to={'/'}>Cancelar</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}