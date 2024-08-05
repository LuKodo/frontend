import { useEffect, useState } from "preact/hooks";
import { Productofinal } from "../interfaces/interfaces"
import { formatPrice } from "../utils/formatPrice"
import { checkImageExists } from "../utils/checkImage";
import { Fragment } from "preact/jsx-runtime";
import { Modal } from "react-bootstrap";
import { addToCart } from "../utils/cart";

export const ModalProduct = ({ product, handleClose, show }: { product: Productofinal, handleClose: Function, show: boolean }) => {
    const extensions = ['webp', 'png'];
    const [imagePath, setImagePath] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setQuantity(1)
        handleClose()
    }

    const add = () => {
        if (quantity < product.nuevo) {
            setQuantity(quantity + 1)
        }
    }

    const sub = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const imagePathget = async () => {
        const path = await checkImageExists(extensions, product.codigo);
        setImagePath(path)
    }

    useEffect(() => {
        imagePathget()
    }, [product]);

    return (
        <Fragment>
            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton className="border-0" />
                <Modal.Body>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <div class="product__details__pic">
                                    <div class="product__details__pic__item">
                                        <img class="product__details__pic__item--large" src={imagePath} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="product__details__text">
                                    <h3 class="fs-4">{product.nombre}</h3>
                                    <div class="product__details__price fw-bold">{formatPrice(product.precioventageneral)}</div>
                                    <div class="product__details__quantity">
                                        <div class="quantity">
                                            <div class="pro-qty">
                                                <span class="dec qtybtn" onClick={() => sub()}>-</span>
                                                <input type="text" value={quantity} />
                                                <span class="inc qtybtn" onClick={() => add()}>+</span>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" class="primary-btn px-3" onClick={() => handleAddToCart()}>
                                        <i class="bi bi-cart-fill" />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}