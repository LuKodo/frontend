import { TipoImagen } from '@/interfaces/TipoImagenEnum';
import { useEffect, useState } from 'preact/hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductImage: preact.FunctionalComponent<{ nombre: string, reload?: boolean }> = ({ nombre, reload }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = `http://triton.inversioneslacentral.com/market/api/uploads/${TipoImagen.PRODUCT}/${nombre}.webp`;
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
            <LazyLoadImage
                alt={nombre || 'Product Image'}
                width="50"
                height="50"
                src={imageSrc !== 'undefined' ? imageSrc : 'https://placehold.co/100x100/png'}
                effect="opacity"
                wrapperProps={{
                    style: { transitionDelay: "1s" },
                }}
            />
        </>
    );
};

export default ProductImage;