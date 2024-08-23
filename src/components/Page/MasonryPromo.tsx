import { getPromoImage } from "@/utils/checkImage"
import { useEffect, useMemo, useState } from "preact/hooks"
import { Col, Container, Row } from "react-bootstrap"

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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/promotion/1/100000`)
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
                        <Col key={index}>
                            <PromoImage image={col} />
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    )
}

const PromoImage: preact.FunctionalComponent<{ image: string }> = ({ image }) => {
    const extensions = ['webp', 'png', 'jpg'];
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
            className="img-fluid"
        />
    );
};