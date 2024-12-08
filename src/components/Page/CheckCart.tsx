import ImageCart from "./ImageCart";
import { Product } from "../../admin/domain/entities/ProductoFinal";
import { formatPrice } from "../../shared/utils/formatPrice";
import { IconBackground } from "@tabler/icons-solidjs";
import { useCart } from "../../modules/store/presentation/hooks/useCart";

export const CheckCart = () => {
    const { cart, addToCart, removeFromCart } = useCart();

    return (
        <>
            <div class="h-75 d-flex flex-column">
                {
                    cart.length === 0 ? (
                        <span class="text-center">
                            <h6>No has agregado productos a tu carrito.</h6>
                            <IconBackground size={150} />
                        </span>
                    ) : (
                        <ul>
                            {cart.map((product: Product) => (
                                <li>
                                    <a href="product-left-sidebar.html" class="gi-pro-img">
                                        <ImageCart imageName={product.product.codigo} />
                                    </a>
                                    <div class="gi-pro-content">
                                        <a href="product-left-sidebar.html" class="cart-pro-title">{product.product.nombre}</a>
                                        <span class="cart-price"><span>{formatPrice((product.product.precioventageneral ?? 0))}</span> x {product.quantity}</span>
                                        <div class="qty-plus-minus">
                                            <div class="dec gi-qtybtn" onClick={() => addToCart(product, 'remove')}>-</div>
                                            <input class="qty-input" type="text" name="gi-qtybtn" value={product.quantity} />
                                            <div class="inc gi-qtybtn" onClick={() => addToCart(product, 'add')}>+</div>
                                        </div>
                                        <a href="javascript:void(0)" class="remove" onClick={() => removeFromCart(product.product.codigo)}>×</a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </>
    )
}