import { useEffect, useState } from "preact/hooks";
import { Productofinal } from "../interfaces/interfaces"
import { formatPrice } from "../utils/formatPrice"
import { checkImageExists } from "../utils/checkImage";
import { Fragment } from "preact/jsx-runtime";
import { FormControl, InputGroup, Modal } from "react-bootstrap";
import { addToCart } from "../utils/cart";
import Swal from "sweetalert2";

interface Props {
    product: Productofinal
    handleClose: Function
    show: boolean
}

export const ModalProduct: preact.FunctionalComponent<Props> = ({ product, handleClose, show }) => {
    const extensions = ['webp', 'png'];
    const [imagePath, setImagePath] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setQuantity(1)
        handleClose()
    }

    const add = () => {
        if (quantity < (product.nuevo ?? 0)) {
            setQuantity(quantity + 1)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay suficientes productos',
            })
            return
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
                            <div class="col-7">
                                <img class="img-fluid" src={imagePath} alt="" />
                            </div>
                            <div class="col-5">
                                <div class="d-flex flex-column gap-2">
                                    <h5>{product.nombre}</h5>
                                    <h4>{formatPrice((product.precioventageneral ?? 0))}</h4>
                                    <InputGroup>
                                        <InputGroup.Text role="button" className="btn btn-success" onClick={() => sub()}>-</InputGroup.Text>
                                        <FormControl type="text" value={quantity} />
                                        <InputGroup.Text role="button" className="btn btn-success" onClick={() => add()}>+</InputGroup.Text>
                                    </InputGroup>
                                    <a href="#" class="btn btn-success" onClick={() => handleAddToCart()}>
                                        <i class="bi bi-cart-fill me-2" />
                                        Añadir
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