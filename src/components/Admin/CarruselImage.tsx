import { TipoImagen } from '@/interfaces/TipoImagenEnum';
import { getImage } from '@/utils/checkImage';
import { useEffect, useState } from 'preact/hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CarruselImage: preact.FunctionalComponent<{ nombre: string, reload?: boolean }> = ({ nombre, reload }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
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