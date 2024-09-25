import { Fragment, useEffect, useState } from "react";
import { getImage } from "@/utils/checkImage";
import { formatPrice } from "@/utils/formatPrice";
import { Productofinal } from "@/interfaces/ProductoFinal";
import { TipoImagen } from "@/interfaces/TipoImagenEnum";
import { getDefaultImage } from "../Admin/PromoImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Swal from "sweetalert2";
import { addToCart } from "@/utils/cart";
import { ModalProduct } from "./ModalProduct";

export const ProductCard = ({ product, setUpdateCart }: { product: Productofinal, setUpdateCart: Function }) => {
    const [imagePath, setImagePath] = useState('');
    const [show, setShow] = useState(false);

    const imagePathget = async () => {
        const path = await getImage(product.codigo, TipoImagen.PRODUCT);
        setImagePath(path)
    }

    useEffect(() => {
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
        <Fragment>
            <ModalProduct product={product} handleClose={() => setShow(false)} show={show} setUpdateCart={setUpdateCart} />
            <div class="gi-product-content" >
                <div class="gi-product-inner">
                    <div class="gi-pro-image-outer">
                        <div class="gi-pro-image" onClick={() => setShow(true)}>
                            <a href="javascript:void(0)" onClick={() => setShow(true)} class="image">
                                <span class="label nonveg">
                                    <span class="dot"></span>
                                </span>
                                <LazyLoadImage
                                    alt={product.codigo || 'Product Image'}
                                    className='main-image p-4'
                                    src={imagePath ? imagePath : getDefaultImage(281)}
                                    effect="opacity"
                                    wrapperProps={{
                                        style: { transitionDelay: "1s" },
                                    }}
                                />
                            </a>
                            <div class="gi-pro-actions">
                                <a href="javascript:void(0)" onClick={() => setShow(true)} class="gi-btn-group quickview" title="Vista rápida"><i class="bi bi-eye"></i></a>
                                <a href="javascript:void(0)" onClick={addProduct} title="Añadir al carrito" class="gi-btn-group add-to-cart"><i class="bi bi-bag"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="gi-pro-content">
                        <a href="javascript:void(0)">
                            <h6 class="gi-pro-stitle">{product.categoria}</h6>
                        </a>
                        <h5 class="gi-pro-title"><a href="javascript:void(0)" onClick={() => setShow(true)}>{product.nombre}</a></h5>
                        <div class="gi-pro-rat-price">
                            <span class="gi-price">
                                <span class="new-price">{formatPrice(product.precioventageneral ?? 0)}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}