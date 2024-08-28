import { Category } from '@interfaces/Categoria';
import { TipoImagen } from '@interfaces/TipoImagenEnum';
import { getImage } from '@utils/checkImage';
import { useEffect, useState } from 'preact/hooks';

const CategoryImage: preact.FunctionalComponent<{ category: Category, reload?: boolean }> = ({ category, reload }) => {
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
    }, [category.descripcion, reload]);

    return (
        <img
            src={imageSrc}
            alt={category.descripcion}
            width="50"
            height="50"
            onError={() => setImageSrc('https://placehold.co/100x100/png')}
        />
    );
};

export default CategoryImage;