import { TipoImagen } from "@/interfaces/TipoImagenEnum";
import { getImage } from "@/utils/checkImage";
import { useEffect, useState } from "preact/hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PromoImage: preact.FunctionalComponent<{ image: string }> = ({ image }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getImage(image, TipoImagen.PROMO);
                setImageSrc(imagePath);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [image]);

    return (
        <LazyLoadImage
            alt={image || 'Product Image'}
            className='w-75 h-75 img-fluid'
            src={imageSrc}
            effect="opacity"
            wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
            }}
        />
    );
};

export const getDefaultImage = (relation: number) => {
    switch (relation) {
        case 1:
            return 'https://placehold.co/1416x431/png'
        case 2:
            return 'https://placehold.co/595x370/png'
        case 3:
            return 'https://placehold.co/370x310/png'
        case 4:
            return 'https://placehold.co/290x370/png'
        case 281:
            return 'https://placehold.co/281x281/png'
        default:
            return 'https://placehold.co/595x370/png';
    }
}

export default PromoImage;