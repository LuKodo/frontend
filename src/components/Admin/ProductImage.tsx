import { TipoImagen } from '@interfaces/TipoImagenEnum';
import { getImage } from '@utils/checkImage';
import { useEffect, useState } from 'preact/hooks';

const ProductImage: preact.FunctionalComponent<{ nombre: string, reload?: boolean }> = ({ nombre, reload }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
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
    }, [nombre, reload]);

    return (
        <>
        <img
            src={imageSrc !== 'undefined' ? imageSrc : 'https://placehold.co/100x100/png'}
            alt={nombre || 'Product Image'}
            width="50"
            height="50"
            onError={() => setImageSrc('https://placehold.co/100x100/png')}
        />
        </>
    );
};

export default ProductImage;