import { Category } from '@/interfaces/Categoria';
import { getCategoryImage } from '@/utils/checkImage';
import { useEffect, useState } from 'preact/hooks';

const CategoryImage: preact.FunctionalComponent<{ category: Category }> = ({ category }) => {
    const extensions = ['webp', 'png', 'jpg'];
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getCategoryImage(extensions, category.descripcion);
                setImageSrc(imagePath);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [category.descripcion]);

    return (
        <img
            src={imageSrc}
            alt={category.descripcion}
            width="100"
            height="100"
            onError={() => setImageSrc('/path/to/default/image.jpg')} // Ruta a una imagen por defecto
        />
    );
};

export default CategoryImage;