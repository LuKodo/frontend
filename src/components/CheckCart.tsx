import { Modal } from "react-bootstrap"
import { useEffect, useState } from "preact/hooks";
import { formatPrice } from "../utils/formatPrice";
import { Product, Productofinal } from "../interfaces/interfaces";
import { getCart, setCart } from "../utils/cart";

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
                            <div class="shoping__cart__table" style={{ height: '210px', overflow: 'auto' }}>
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
                                                        <td class="shoping__cart__item">
                                                            <h5>{product.product.nombre}</h5>
                                                        </td>
                                                        <td class="shoping__cart__price">
                                                            {formatPrice(product.product.precioventageneral)}
                                                        </td>
                                                        <td class="shoping__cart__quantity">
                                                            <div class="quantity">
                                                                <div class="pro-qty">
                                                                    <span class="dec qtybtn" onClick={() => addProduct(product.product, -1)}>-</span>
                                                                    <input type="text" value={product.quantity} />
                                                                    <span class="inc qtybtn" onClick={() => addProduct(product.product, 1)}>+</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="shoping__cart__total">
                                                            {formatPrice(product.product.precioventageneral * product.quantity)}
                                                        </td>
                                                        <td class="shoping__cart__item__close">
                                                            <span class="bi bi-trash" onClick={() => deleteProduct(product)}></span>
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
                            <div class="shoping__checkout">
                                <h5>Cart Total</h5>
                                <ul>
                                    <li>Total <span>{formatPrice(products.reduce((total: number, product: Product) => total + product.product.precioventageneral * product.quantity, 0))}</span></li>
                                </ul>
                                <div className="d-flex justify-content-between align-items-center gap-2">
                                    <a href="#" class="btn btn-success w-50">PROCEED TO CHECKOUT</a>
                                    <a href="#" class="btn btn-success w-50">PROCEED TO CHECKOUT</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}