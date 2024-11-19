import { Fragment, createEffect, createSignal } from "solidjs";
import { getImage } from "@/shared/utils/checkImage";
import { formatPrice } from "@/shared/utils/formatPrice";
import { Productofinal } from "@/admin/domain/entities/ProductoFinal.ts";
import { TipoImagen } from "@/admin/domain/entities/TipoImagenEnum.ts";
import { getDefaultImage } from "@/admin/presentation/components/PromoImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Swal from "sweetalert2";
import { addToCart } from "@/shared/utils/cart";
import { ModalProduct } from "./ModalProduct";

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
        <Fragment>
            <ModalProduct product={product} handleClose={() => setShow(false)} show={show} setUpdateCart={setUpdateCart} />
            <div className="gi-product-content" >
                <div className="gi-product-inner">
                    <div className="gi-pro-image-outer">
                        <div className="gi-pro-image" onClick={() => setShow(true)}>
                            <a href="javascript:void(0)" onClick={() => setShow(true)} className="image">
                                <span className="label nonveg">
                                    <span className="dot"></span>
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
                            <div className="gi-pro-actions">
                                <a href="javascript:void(0)" onClick={() => setShow(true)} className="gi-btn-group quickview" title="Vista rápida"><i className="bi bi-eye"></i></a>
                                <a href="javascript:void(0)" onClick={addProduct} title="Añadir al carrito" className="gi-btn-group add-to-cart"><i className="bi bi-bag"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="gi-pro-content">
                        <a href="javascript:void(0)">
                            <h6 className="gi-pro-stitle">{product.categoria}</h6>
                        </a>
                        <h5 className="gi-pro-title"><a href="javascript:void(0)" onClick={() => setShow(true)}>{product.nombre}</a></h5>
                        <div className="gi-pro-rat-price">
                            <span className="gi-price">
                                <span className="new-price">{formatPrice(product.precioventageneral ?? 0)}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}