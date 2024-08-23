import { getPromoImage } from "@/utils/checkImage";
import { useEffect, useState } from "preact/hooks";

const PromoImage: preact.FunctionalComponent<{ image: string }> = ({ image }) => {
    const extensions = ['webp', 'png'];
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getPromoImage(extensions, image);
                setImageSrc(imagePath);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [image]);

    return (
        <img
            src={imageSrc}
            alt={image}
            className='w-100 h-100 img-fluid'
        />
    );
};

export default PromoImage;