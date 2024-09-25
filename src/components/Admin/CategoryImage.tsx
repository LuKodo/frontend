import { Category } from '@/interfaces/Categoria';
import { TipoImagen } from '@/interfaces/TipoImagenEnum';
import { getImage } from '@/utils/checkImage';
import { useEffect, useState } from 'preact/hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CategoryImage: preact.FunctionalComponent<{ category: Category }> = ({ category }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
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
    }, [category.descripcion]);

    return (
        <LazyLoadImage
            alt={category.descripcion || 'Product Image'}
            height="250px"
            src={imageSrc}
            effect="opacity"
            wrapperProps={{
                style: { transitionDelay: "1s" },
            }}
            onError={() => setImageSrc('https://placehold.co/100x100/png')}
            className={"img-fluid rounded"}
        />
    );
};

export default CategoryImage;