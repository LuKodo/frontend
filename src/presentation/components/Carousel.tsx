import {FC, useEffect, useMemo, useState} from "react"
import {Carousel as CR} from "react-bootstrap"
import {Carousel as CarouselModel} from "../../domain/models/Carousel.ts";
import {TipoImagen} from "../../domain/TipoImage.ts";
import {getImage} from "../../shared/getImage.ts";
import {LazyLoadImage} from "react-lazy-load-image-component";

export const Carousel = () => {
    const [items, setItems] = useState<CarouselModel[]>([] as CarouselModel[])
    const [reload, _setReload] = useState(false)

    useMemo(() => {
        const fetchItems = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/carousel`)
            const data = await response.json()

            setItems(data)
        }

        fetchItems()
    }, [reload])

    return (
        <CR id={"carousel"}>
            {
                items?.map((item) => {
                    return (
                        <CR.Item key={item.id}>
                            <CarouselImage nombre={item.imageName} reload={reload} />
                        </CR.Item>
                    )
                })
            }
        </CR>
    )
}

const CarouselImage: FC<{ nombre: string, reload?: boolean }> = ({ nombre, reload }) => {
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
            width={"100%"}
            src={imageSrc}
            effect="opacity"
            wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
            }}
            className={"rounded shadow-sm"}
        />
    );
};