import { useEffect } from "preact/hooks";
import { formatPrice } from "@/utils/formatPrice";
import { Product, Productofinal } from "@/interfaces/ProductoFinal";
import { getCart, setCart } from "@/utils/cart";
import { Fragment } from "preact/jsx-runtime";
import ImageCart from "./ImageCart";

export const CheckCart = ({ setReload, setProducts, products }: { setReload: Function, setProducts: Function, products: Product[] }) => {
    useEffect(() => {
        setProducts(getCart());
    }, [])

    const addProduct = (product: Productofinal, quantity: number) => {
        const existingProduct = products.find((p: Product) => p.product.codigo === product.codigo);
        let newProducts = [];

        if (existingProduct) {
            newProducts = products.map((p: Product) => p.product.codigo === product.codigo ? { ...p, quantity: quantity } : p)
        } else {
            products.push({ product, quantity });
            newProducts = [...products, { product, quantity }];
        }

        setProducts(newProducts);
        setCart(newProducts);
        setReload(true)
    }


    const increase = (value: number, max: number, product: Productofinal) => {
        const newVal = value + 0.5;
        const val = newVal <= max ? newVal : max;
        addProduct(product, val);
        setReload(true)
    }

    const decrease = (value: number, min: number, product: Productofinal) => {
        const newVal = value - 0.5;
        const val = newVal >= min ? newVal : min;
        addProduct(product, val);
        setReload(true)
    }


    const deleteProduct = (product: Product) => {
        const newData = products.filter((p: Product) => p.product.codigo !== product.product.codigo);
        setProducts(newData);
        setCart(newData);
        setReload(true)
    }

    return (
        <Fragment>
            <ul class="gi-cart-pro-items">
                {
                    products.length === 0 ? (
                        <tr>
                            <td colSpan={5} class="shoping__cart__item">
                                <h5>No hay productos en el carrito</h5>
                            </td>
                        </tr>
                    ) : (
                        products.map((product: Product) => (
                            <li key={product.product.codigo}>
                                <a href="product-left-sidebar.html" class="gi-pro-img">
                                    <ImageCart imageName={product.product.codigo} />
                                </a>
                                <div class="gi-pro-content">
                                    <a href="product-left-sidebar.html" class="cart-pro-title">{product.product.nombre}</a>
                                    <span class="cart-price"><span>{formatPrice((product.product.precioventageneral ?? 0))}</span> x {product.quantity}</span>
                                    <div class="qty-plus-minus">
                                        <div class="dec gi-qtybtn" onClick={() => decrease(product.quantity, 0, product.product)}>-</div>
                                        <input class="qty-input" type="text" name="gi-qtybtn" value={product.quantity} />
                                        <div class="inc gi-qtybtn" onClick={() => increase(product.quantity, (product.product.nuevo ?? 0), product.product)}>+</div>
                                    </div>
                                    <a href="javascript:void(0)" class="remove" onClick={() => deleteProduct(product)}>×</a>
                                </div>
                            </li>
                        ))
                    )
                }
            </ul>
        </Fragment>
    )
}