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
        <div className="card overflow-hidden rounded-2 border" style={{ height: '400px' }} onClick={() => show(product)}>
            <div className="position-relative">
                <a href="#" className="hover-img d-block overflow-hidden">

                    <LazyLoadImage
                        alt={product.codigo || 'Product Image'}
                        className='card-img-top rounded-0'
                        height="281px"
                        src={imagePath ? imagePath : getDefaultImage(281)}
                        effect="opacity"
                        wrapperProps={{
                            // If you need to, you can tweak the effect transition using the wrapper style.
                            style: { transitionDelay: "1s" },
                        }}
                    />
                </a>
                <a href="#" className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
                    <i className="bi bi-basket fs-4"></i>
                </a>
            </div>
            <div className="card-body pt-3 p-4">
                <h6 className="fw-semibold fs-4">{product.nombre}</h6>
                <div className="d-flex align-items-center justify-content-between">
                    <h6 className="fw-semibold fs-4 mb-0">{formatPrice(product.precioventageneral ?? 0)}</h6>
                </div>
            </div>
        </div>
    )
}