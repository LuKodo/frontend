import { TipoImagen } from '@/admin/domain/entities/TipoImagenEnum.ts';
import { getImage } from '@/shared/utils/checkImage.tsx';
import { createEffect, createSignal } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FC } from "solidjs";

const CarruselImage: FC<{ nombre: string, reload?: boolean }> = ({ nombre, reload }) => {
    const [imageSrc, setImageSrc] = createSignal('');

    createEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getImage(nombre, TipoImagen.CAROUSEL);
                setImageSrc(imagePath);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [nombre, reload]);

    return (
        <LazyLoadImage
            alt={nombre || 'Product Image'}
            height="250px"
            src={imageSrc}
            effect="opacity"
            wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
            }}
            className={"img-fluid rounded shadow-sm"}
        />
    );
};

export default CarruselImage;