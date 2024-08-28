import { TipoImagen } from "@interfaces/TipoImagenEnum";
import { getImage } from "@utils/checkImage";
import { useEffect, useState } from "preact/hooks";

const PromoImage: preact.FunctionalComponent<{ image: string }> = ({ image }) => {
    const extensions = ['webp', 'png', 'jpg', 'jpeg'];
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
        <img
            src={imageSrc}
            alt={image}
            className='w-75 h-75 img-fluid'
            onError={() => setImageSrc(getDefaultImage(1))}
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