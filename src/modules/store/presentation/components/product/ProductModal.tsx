import { createEffect, createSignal, Component } from "solid-js";
import { Modal } from "solid-bootstrap";
import Swal from "sweetalert2";
import { UnLazyImage } from "@unlazy/solid";
import { formatPrice } from "../../../../../shared/utils/formatPrice.tsx";
import { Productofinal } from "../../../../../admin/domain/entities/ProductoFinal.ts";
import { addToCart } from "../../../../../shared/utils/cart.tsx";
import { getImage } from "../../../../../shared/utils/checkImage.tsx";
import { TipoImagen } from "../../../../../admin/domain/entities/TipoImagenEnum.ts";

interface Props {
    product: Productofinal
    handleClose: Function
    show: boolean
    setUpdateCart: Function
}

export const ProductModal: Component<Props> = ({ product, handleClose, show, setUpdateCart }) => {
    const [imagePath, setImagePath] = createSignal('');
    const [quantity, setQuantity] = createSignal(0);

    const handleAddToCart = () => {
        if (quantity() === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Debes seleccionar una cantidad'
            })
            return
        }
        addToCart(product, quantity())
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast: { addEventListener: (arg0: string, arg1: any) => void; }) => {
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

    createEffect(() => {
        imagePathget()
    }, [product]);

    const handleChangeInput = (event: MouseEvent, mov: string) => {
        event.preventDefault()
        let val = 0
        if (mov === 'add') {
            const newVal = quantity() + 0.5;
            val = newVal <= (product.nuevo ?? 0) ? newVal : (product.nuevo ?? 0);
        }

        if (mov === 'sub') {
            const newVal = quantity() - 0.5;
            val = newVal >= 1 ? newVal : 1;
        }

        setQuantity(val)
    }

    return (
        <>
            <Modal show={show} onHide={() => handleClose()} size="sm" style={{ width: "100%", margin: "auto" }}>
                <Modal.Header closeButton class="border-0" />
                <Modal.Body>
                    <div class="row">
                        <div class="col-6">
                            <div class="single-pro-img">
                                <UnLazyImage
                                    alt={product.codigo || 'Product Image'}
                                    class='img-fluid'
                                    src={!imagePath() ? 'https://placehold.co/273x209/png' : imagePath()}
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
                                        <input class="border-0 border-top border-bottom w-50 text-center" type="text" style={{ height: "40px" }} value={quantity()} />
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
        </>
    )
}