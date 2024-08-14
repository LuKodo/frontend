import { Button, FormControl, InputGroup, Modal } from "react-bootstrap"
import { useEffect, useState } from "preact/hooks";
import { formatPrice } from "../utils/formatPrice";
import { Product, Productofinal } from "../interfaces/interfaces";
import { getCart, setCart } from "../utils/cart";
import ImageCart from "./ImageCart";
import Swal from "sweetalert2";
import { Link } from "wouter";

export const CheckCart = ({ show, handleClose }: { show: boolean, handleClose: Function }) => {
    const [products, setProducts] = useState<Product[]>(getCart());

    useEffect(() => {
        if (show) {
            setProducts(getCart())
        }
    }, [show])

    const addProduct = (product: Productofinal, quantity: number) => {
        const existingProduct = products.find((p: Product) => p.product.codigo === product.codigo);
        let newProducts = [];

        if (existingProduct) {
            if (existingProduct.quantity + quantity > product.nuevo) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No hay suficientes productos',
                })
                return
            }
            const newQuantity = existingProduct.quantity + quantity;
            newProducts = products.map((p: Product) => p.product.codigo === product.codigo ? { ...p, quantity: newQuantity } : p)
        } else {
            products.push({ product, quantity });
            newProducts = [...products, { product, quantity }];
        }

        setProducts(newProducts);
        setCart(newProducts);
    }

    const deleteProduct = (product: Product) => {
        setProducts(products.filter((p: Product) => p.product.codigo !== product.product.codigo));
        setCart(products.filter((p: Product) => p.product.codigo !== product.product.codigo));
    }

    return (
        <Modal show={show} onHide={() => handleClose()} size="lg">
            <Modal.Header closeButton className="border-0" />
            <Modal.Body>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="shoping__cart__table" style={{ height: '250px', overflow: 'auto' }}>
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th class="shoping__product">Producto</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
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
                                                            <InputGroup>
                                                                <InputGroup.Text class="btn btn-success" role="button" onClick={() => addProduct(product.product, -1)}>-</InputGroup.Text>
                                                                <FormControl value={product.quantity} />
                                                                <InputGroup.Text class="btn btn-success" role="button" onClick={() => addProduct(product.product, 1)}>+</InputGroup.Text>
                                                            </InputGroup>
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
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="">
                                <h6 class="text-end mb-3 fw-bold bg-light p-2">Total <span>{formatPrice(products.reduce((total: number, product: Product) => total + product.product.precioventageneral * product.quantity, 0))}</span></h6>

                                <div className="d-flex justify-content-between align-items-center gap-2">
                                    <Link href="/bill" class="btn btn-success w-50">Realizar pedido</Link>
                                    <span onClick={() => handleClose()} class="btn btn-danger w-50">Cancelar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}