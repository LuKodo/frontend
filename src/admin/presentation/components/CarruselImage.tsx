import { Component, createEffect, createSignal } from 'solid-js';
import { getImage } from '../../../shared/utils/checkImage';
import { TipoImagen } from '../../domain/entities/TipoImagenEnum';
import { getDefaultImage } from './PromoImage';

const CarruselImage: Component<{ nombre: string, reload?: boolean }> = ({ nombre, reload }) => {
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
        <img
            loading="lazy"
            alt={nombre || 'Product Image'}
            height="400px"
            src={imageSrc()}
            data-srcset={getDefaultImage(1)}
            class={"d-block w-100 rounded shadow-sm"}
        />
    );
};

export default CarruselImage;