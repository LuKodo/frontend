import { useEffect, useState } from "preact/hooks";
import { Productofinal } from "@/interfaces/ProductoFinal"
import { formatPrice } from "@/utils/formatPrice"
import { getImage } from "@/utils/checkImage";
import { Fragment } from "preact/jsx-runtime";
import { Modal } from "react-bootstrap";
import { addToCart } from "@/utils/cart";
import { TipoImagen } from "@/interfaces/TipoImagenEnum";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NumberInput } from "../NumberInput";

interface Props {
    product: Productofinal
    handleClose: Function
    show: boolean
}

export const ModalProduct: preact.FunctionalComponent<Props> = ({ product, handleClose, show }) => {
    const [imagePath, setImagePath] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setQuantity(1)
        handleClose()
    }

    const imagePathget = async () => {
        const path = await getImage(product.codigo, TipoImagen.PRODUCT);
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
                                <LazyLoadImage
                                    alt={product.codigo || 'Product Image'}
                                    className='img-fluid'
                                    src={!imagePath ? 'https://placehold.co/273x209/png' : imagePath}
                                    effect="opacity"
                                    wrapperProps={{
                                        // If you need to, you can tweak the effect transition using the wrapper style.
                                        style: { transitionDelay: "1s" },
                                    }}
                                />
                            </div>
                            <div class="col-5">
                                <div class="d-flex flex-column gap-2">
                                    <h5>{product.nombre}</h5>
                                    <h4>Precio: {formatPrice((product.precioventageneral ?? 0))}</h4>
                                    <NumberInput initialValue={quantity ?? 0} max={(product.nuevo ?? 0)} min={0.5} onChange={(value: number) => setQuantity(value)} />
                                    <h4>Total: {formatPrice((product.precioventageneral ?? 0)*quantity)}</h4>
                                    <a href="#" class="btn btn-warning" onClick={() => handleAddToCart()}>
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