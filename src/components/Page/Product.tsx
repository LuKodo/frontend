import { useEffect, useState } from "react";
import { getImage } from "@utils/checkImage";
import { formatPrice } from "@utils/formatPrice";
import { Productofinal } from "@interfaces/ProductoFinal";
import { TipoImagen } from "@interfaces/TipoImagenEnum";
import { getDefaultImage } from "../Admin/PromoImage";

export const ProductCard = ({ product, show }: { product: Productofinal, show: Function }) => {
    const extensions = ['webp', 'png', 'jpg', 'jpeg'];
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
                    <img src={`${imagePath ? imagePath : getDefaultImage(281)}`} className="card-img-top rounded-0" height="281px" alt="materialm-img" />
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