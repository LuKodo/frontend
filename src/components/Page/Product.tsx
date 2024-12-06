import { createEffect, createSignal } from "solid-js";
import Swal from "sweetalert2";
import { getImage } from "../../shared/utils/checkImage";
import { TipoImagen } from "../../admin/domain/entities/TipoImagenEnum";
import { addToCart } from "../../shared/utils/cart";
import { Productofinal } from "../../admin/domain/entities/ProductoFinal";
import { UnLazyImage } from "@unlazy/solid";
import { getDefaultImage } from "../../admin/presentation/components/PromoImage";
import { formatPrice } from "../../shared/utils/formatPrice";
import { ProductModal } from "../../modules/store/presentation/components/product/ProductModal";
import { Card } from "solid-bootstrap";

export const ProductCard = ({ product, setUpdateCart }: { product: Productofinal, setUpdateCart: Function }) => {
    const [imagePath, setImagePath] = createSignal('');
    const [show, setShow] = createSignal(false);

    const imagePathget = async () => {
        const path = await getImage(product.codigo, TipoImagen.PRODUCT);
        setImagePath(path)
    }

    createEffect(() => {
        imagePathget()
    }, [product]);

    const addProduct = () => {
        addToCart(product, 1);
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
    }

    return (
        <>
            <ProductModal product={product} handleClose={() => setShow(false)} show={show()} setUpdateCart={setUpdateCart} />
            <Card onClick={() => setShow(true)} class="mb-4">
                <img
                    loading="lazy"
                    alt={product.codigo || 'Product Image'}
                    class='main-image p-4'
                    src={imagePath() ? imagePath() : getDefaultImage(281)}
                />

                <Card.Body>
                    <span class="small fw-bold">{product.categoria}</span>
                    <h5 class="gi-pro-title">{product.nombre}</h5>
                    <div class="gi-pro-rat-price">
                        <span class="gi-price">
                            <span class="new-price">{formatPrice(product.precioventageneral ?? 0)}</span>
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}