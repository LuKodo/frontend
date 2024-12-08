import { Component, createEffect, createSignal } from 'solid-js';
import { TipoImagen } from '../../domain/entities/TipoImagenEnum';
import { getImage } from '../../../shared/utils/checkImage';
import { UnLazyImage } from '@unlazy/solid';

const ProductImage: Component<{ nombre: string }> = ({ nombre }) => {
    const [imageSrc, setImageSrc] = createSignal('');

    createEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getImage(nombre, TipoImagen.PRODUCT);
                setImageSrc(imagePath);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        if (nombre !== 'undefined') {
            fetchImage();
        }
    });

    return (
        <>
            <UnLazyImage
                alt={nombre || 'Product Image'}
                width="50"
                height="50"
                srcSet={imageSrc() !== 'undefined' ? imageSrc() : 'https://placehold.co/100x100/png'}
            />
        </>
    );
};

export default ProductImage;