import { UnLazyImage } from '@unlazy/solid';
import { Component, createEffect, createSignal } from 'solid-js';
import { Category } from '../../domain/entities/Categoria';
import { getImage } from '../../../shared/utils/checkImage';
import { TipoImagen } from '../../domain/entities/TipoImagenEnum';

const CategoryImage: Component<{ category: Category }> = ({ category }) => {
    const [imageSrc, setImageSrc] = createSignal('');

    createEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getImage(category.descripcion, TipoImagen.CATEGORY);
                setImageSrc(imagePath);
            } catch (error) {
                console.error('Error fetching image:', error);
                setImageSrc('https://placehold.co/100x100/png')
            }
        };

        fetchImage();
    });

    return (
        <UnLazyImage
            alt={category.descripcion || 'Product Image'}
            height="150px"
            srcSet={imageSrc()}
            onError={() => setImageSrc('https://placehold.co/100x100/png')}
            class={"img-fluid rounded"}
        />
    );
};

export default CategoryImage;