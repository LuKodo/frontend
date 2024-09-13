import { useEffect, useState } from "react";
import { getImage } from "@/utils/checkImage";
import { formatPrice } from "@/utils/formatPrice";
import { Productofinal } from "@/interfaces/ProductoFinal";
import { TipoImagen } from "@/interfaces/TipoImagenEnum";
import { getDefaultImage } from "../Admin/PromoImage";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ProductCard = ({ product, show }: { product: Productofinal, show: Function }) => {
    const [imagePath, setImagePath] = useState('');

    const imagePathget = async () => {
        const path = await getImage(product.codigo, TipoImagen.PRODUCT);
        setImagePath(path)
    }

    useEffect(() => {
        imagePathget()
    }, [product]);

    return (
        <div class="gi-product-content">
            <div class="gi-product-inner">
                <div class="gi-pro-image-outer">
                    <div class="gi-pro-image">
                        <a href="product-left-sidebar.html" class="image">
                            <span class="label nonveg">
                                <span class="dot"></span>
                            </span>
                            <LazyLoadImage
                                alt={product.codigo || 'Product Image'}
                                className='main-image'
                                height="281px"
                                src={imagePath ? imagePath : getDefaultImage(281)}
                                effect="opacity"
                                wrapperProps={{
                                    style: { transitionDelay: "1s" },
                                }}
                            />
                        </a>
                        <div class="gi-pro-actions">
                            <a href="#" class="gi-btn-group quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#gi_quickview_modal"><i class="bi bi-eye"></i></a>
                            <a href="javascript:void(0)" title="Añadir al carrito" class="gi-btn-group add-to-cart"><i class="bi bi-bag"></i></a>
                        </div>
                    </div>
                </div>
                <div class="gi-pro-content">
                    <a href="shop-left-sidebar-col-3.html">
                        <h6 class="gi-pro-stitle">{product.categoria}</h6>
                    </a>
                    <h5 class="gi-pro-title"><a href="product-left-sidebar.html">{product.nombre}</a></h5>
                    <div class="gi-pro-rat-price">
                        <span class="gi-price">
                            <span class="new-price">{formatPrice(product.precioventageneral ?? 0)}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}