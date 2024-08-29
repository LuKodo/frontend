import { TipoImagen } from '@/interfaces/TipoImagenEnum';
import { getImage } from '@/utils/checkImage';
import { useEffect, useState } from 'preact/hooks';

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
        <img
            src={imageSrc}

            alt={nombre || 'Product Image'}
            className={"img-fluid"}
            height="250px"
            onError={() => setImageSrc('https://placehold.co/1427x250/png')}
        />
    );
};

export default CarruselImage;