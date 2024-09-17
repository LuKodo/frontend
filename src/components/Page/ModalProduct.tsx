import { useEffect, useState } from "preact/hooks";
import { Productofinal } from "@/interfaces/ProductoFinal"
import { formatPrice } from "@/utils/formatPrice"
import { getImage } from "@/utils/checkImage";
import { Fragment } from "preact/jsx-runtime";
import { Modal } from "react-bootstrap";
import { addToCart } from "@/utils/cart";
import { TipoImagen } from "@/interfaces/TipoImagenEnum";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Swal from "sweetalert2";

interface Props {
    product: Productofinal
    handleClose: Function
    show: boolean
    setUpdateCart: Function
}

export const ModalProduct: preact.FunctionalComponent<Props> = ({ product, handleClose, show, setUpdateCart }) => {
    const [imagePath, setImagePath] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = () => {
        if (quantity === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Debes seleccionar una cantidad'
            })
            return
        }
        addToCart(product, quantity)
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
            icon: 'success',
            title: 'Agregado al carrito'
        })

        setUpdateCart(true)
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

    const handleChangeInput = (event: Event, mov: string) => {
        event.preventDefault()
        let val = 0
        if (mov === 'add') {
            const newVal = quantity + 0.5;
            val = newVal <= (product.nuevo ?? 0) ? newVal : (product.nuevo ?? 0);
        }

        if (mov === 'sub') {
            const newVal = quantity - 0.5;
            val = newVal >= 1 ? newVal : 1;
        }

        setQuantity(val)
    }

    return (
        <Fragment>
            <Modal show={show} onHide={() => handleClose()} size="sm" style={{ width: "100%", margin: "auto" }}>
                <Modal.Header closeButton className="border-0" />
                <Modal.Body>
                    <div class="row">
                        <div class="col-6">
                            <div className="single-pro-img">
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
                        </div>
                        <div class="col-6">
                            <div class="single-pro-desc m-t-991">
                                <div class="single-pro-content">
                                    <h6 class="gi-single-title">{product.nombre}</h6>

                                    <div class="gi-single-price-stoke">
                                        <div class="gi-single-price mb-2">
                                            <div class="final-price w-50 text-center p-1 rounded text-bg-warning fw-bold">{formatPrice((product.precioventageneral ?? 0))}</div>
                                        </div>
                                        <div class="gi-single-stoke">
                                            <span class="gi-single-sku">SKU#: {product.codigo}</span>
                                        </div>
                                    </div>

                                    <div class="d-flex align-items-center my-3 border rounded" style={{ height: "40px", width: "150px" }}>
                                        <div class="w-25 text-center" role="button" onClick={(e) => handleChangeInput(e, 'sub')}>-</div>
                                        <input class="border-0 border-top border-bottom w-50 text-center" type="text" style={{ height: "40px" }} value={quantity} />
                                        <div class="w-25 text-center" role="button" onClick={(e) => handleChangeInput(e, 'add')}>+</div>
                                    </div>

                                    <div class="gi-single-cart">
                                        <button class="btn btn-primary gi-btn-1" onClick={handleAddToCart}>Añadir al carrito</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}