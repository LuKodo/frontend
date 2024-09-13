import { TipoImagen } from "@/interfaces/TipoImagenEnum"
import { getImage } from "@/utils/checkImage"
import { useEffect, useMemo, useState } from "preact/hooks"
import { Col, Container, Row } from "react-bootstrap"
import { getDefaultImage } from "../Admin/PromoImage"
import { LazyLoadImage } from "react-lazy-load-image-component"

interface Item {
    id: number
    rowIndex: number
    columnIndex: number
    imageName: string
}

const groupByRow = (array: Item[]) => {
    const result: string[][] = [];

    array.map((item) => {
        if (!result[item.rowIndex]) {
            result[item.rowIndex] = [];
        }

        result[item.rowIndex].push(`${item.imageName}`)
    })

    return result;
};

export const MasonryPromo = () => {
    const [images, setImages] = useState<string[][]>()

    const fetchImages = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/promotion`,
            {
                method: 'POST',
                body: JSON.stringify({
                    "limit": 10,
                    "offset": 1
                })
            }
        )
        const data = await response.json()

        const groupedData = groupByRow(data.results);
        setImages(groupedData)
    }

    useMemo(() => {
        fetchImages()
    }, [])

    return (
        <Container>
            {images?.map((row, index) => (
                <Row key={index}>
                    {row.map((col, index) => (
                        <Col key={index} className="mb-4">
                            {
                                col === 'default' ? (
                                    <LazyLoadImage
                                        width="100%"
                                        src={getDefaultImage(row.length)}
                                        effect="opacity"
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: { transitionDelay: "1s" },
                                        }}
                                    />
                                ) : (
                                    <PromoImage image={col} />
                                )
                            }
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    )
}

const PromoImage: preact.FunctionalComponent<{ image: string }> = ({ image }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getImage(image, TipoImagen.PROMO);
                setImageSrc(imagePath);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [image]);

    return (
        <LazyLoadImage
            alt={image || 'Product Image'}
            className='w-100 img-fluid rounded border-dark'
            src={imageSrc}
            effect="opacity"
            wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
            }}
        />
    );
};