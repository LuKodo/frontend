import { Component, createEffect, createSignal } from "solid-js";
import { getImage } from "../../../shared/utils/checkImage";
import { TipoImagen } from "../../domain/entities/TipoImagenEnum";
import { UnLazyImage } from "@unlazy/solid";


const PromoImage: Component<{ image: string }> = ({ image }) => {
    const [imageSrc, setImageSrc] = createSignal('');

    createEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getImage(image, TipoImagen.PROMO);
                setImageSrc(imagePath);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    });

    return (
        <UnLazyImage
            alt={image || 'Product Image'}
            class='w-75 h-75 img-fluid'
            srcSet={imageSrc()}
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