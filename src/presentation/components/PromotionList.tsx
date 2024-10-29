import {Promotion} from "../../domain/models/Promotion.ts";
import {FC, useEffect, useMemo, useState} from "react";
import {getColSize} from "../../shared/getColSize.ts";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {getDefaultImage, getImage} from "../../shared/getImage.ts";
import {TipoImagen} from "../../domain/TipoImage.ts";

const groupByRow = (array: Promotion[]) => {
    const result: string[][] = [];

    array.map((item) => {
        if (!result[item.rowIndex]) {
            result[item.rowIndex] = [];
        }

        result[item.rowIndex].push(`${item.imageName}`)
    })

    return result;
};

export const PromotionList = () => {
    const [images, setImages] = useState<string[][]>()

    const fetchImages = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/promotions`,
            {
                method: 'POST',
                body: JSON.stringify({
                    "limit": 10,
                    "offset": 1
                })
            }
        )
        const data = await response.json()

        return groupByRow(data);
    }

    useMemo(() => {
        fetchImages().then(response => setImages(response))
    }, [])

    return (
        <div className="container">
            {images?.map((row, reindex) => (
                <div className="row mt-2" key={reindex}>
                    {row.map((col, index) => (
                        <div className={`col-md-${getColSize(row.length, 'auto')} col-sm-${getColSize(row.length, 'sm')}`} key={index}>
                            {
                                col === 'default' ? (
                                    <LazyLoadImage
                                        width="100%"
                                        src={getDefaultImage(row.length)}
                                        effect="opacity"
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: { transitionDelay: "1s" },
                                        }}
                                    />
                                ) : (
                                    <PromoImage image={col} size={getColSize(row.length, 'auto')} />
                                )
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const PromoImage: FC<{ image: string, size: number }> = ({ image, size }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            return await getImage(image, TipoImagen.PROMO, size);
        };

        fetchImage().then(response => setImageSrc(response));
    }, [image, size]);

    return (
        <LazyLoadImage
            alt={image || 'Product Image'}
            className='w-100 img-fluid rounded border-dark'
            src={imageSrc}
            effect="opacity"
            wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
            }}
        />
    );
};