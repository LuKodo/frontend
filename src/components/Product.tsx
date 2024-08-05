import { useEffect, useState } from "preact/hooks";
import { Productofinal } from "../interfaces/interfaces"
import { formatPrice } from "../utils/formatPrice"
import { checkImageExists } from "../utils/checkImage";

export const ProductCard = ({ product, show }: { product: Productofinal, show: Function }) => {
    const extensions = ['webp', 'png'];
    const [imagePath, setImagePath] = useState('');

    const imagePathget = async () => {
        const path = await checkImageExists(extensions, product.codigo);
        setImagePath(path)
    }

    useEffect(() => {
        imagePathget()
    }, [product]);

    return (
        <div class="col-lg-4 col-md-6 col-sm-6" onClick={() => show(product)}>
            <div class="card p-3 mb-3" style={{ height: '400px' }}>
                <div class="product__item__pic set-bg" style={`background-image: url("${imagePath}");`} />
                <div class="card-body">
                    <h6 class="card-title fw-bold small" style={{ height: '60px' }}>{product.nombre}</h6>
                    <h5 class="card-text fw-bold small">SKU: {product.codigo}</h5>
                    <h5 class="card-text fw-bold">{formatPrice(product.precioventageneral)}</h5>
                </div>
            </div>
        </div>
    )
}