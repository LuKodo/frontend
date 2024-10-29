import {FC, useCallback, useEffect, useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Product as ProductModel} from "../../domain/models/Product.ts";
import {getDefaultImage, getImage} from "../../shared/getImage.ts";
import {TipoImagen} from "../../domain/TipoImage.ts";
import {formatPrice} from "../../shared/formatPrice.ts";

interface props {
    product: ProductModel
}

export const Product: FC<props> = ({product}) => {
    const [imagePath, setImagePath] = useState(getDefaultImage(281));

    const getImagePath = useCallback(async () => {
        try {
            return await getImage(product.codigo, TipoImagen.PRODUCT, 281);
        } catch (e) {
            console.error(e)
        }
    }, [product.codigo])

    useEffect(() => {
        getImagePath().then((response) => response ? setImagePath(response) : setImagePath(getDefaultImage(281)));
    }, [getImagePath, product]);

    return (
        <>
            <div className="card card-product">
                <div className="card-body">

                </div>
                <a href="javascript:void(0)">
                    <LazyLoadImage
                        alt={product.codigo || 'Product Image'}
                        src={imagePath}
                        style={{height: '208px'}}
                        className={"w-full"}
                        effect="opacity"
                        wrapperProps={{
                            style: {transitionDelay: "1s"},
                        }}
                    />
                </a>
                <div className="p-3">
                    <p className="text-orange-700 font-bold">{formatPrice(product.precioventageneral ?? 0)}</p>
                    <p className="font-bold" style={{height: "48px"}}>
                        <a href="javascript:void(0)">{product.nombre}</a>
                    </p>
                    <button
                        className="rounded-lg w-full bg-orange-600 px-3 py-2 mt-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                        Agregar <i className="bi bi-cart3"/>
                    </button>
                </div>
            </div>
        </>
    )
}