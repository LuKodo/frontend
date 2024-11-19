import { Container, Row } from "solid-bootstrap"
import { Component, createEffect, createMemo, createSignal } from "solid-js"
import { getColSize } from "../../shared/utils/getColSize"
import { getDefaultImage } from "../../admin/presentation/components/PromoImage"
import { getImage } from "../../shared/utils/checkImage"
import { TipoImagen } from "../../admin/domain/entities/TipoImagenEnum"
import { UnLazyImage } from "@unlazy/solid"

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

export const MasonryPromo: Component = () => {
    const [images, setImages] = createSignal<string[][]>()

    const fetchImages = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/promotions`,
            {
                method: 'POST',
                body: JSON.stringify({
                    "limit": 10,
                    "offset": 1
                })
            }
        )
        const data = await response.json()

        return groupByRow(data);
    }

    createMemo(() => {
        fetchImages().then(response => setImages(response))
    })

    return (
        <Container>
            {images()?.map((row) => (
                <Row class="gap-0 p-0">
                    {row.map((col) => (
                        <div class={`mb-4 col-md-${getColSize(row.length, 'auto')} col-sm-${getColSize(row.length, 'sm')}`}>
                            {
                                col === 'default' ? (
                                    <UnLazyImage
                                        blurhash="LKO2:N%2Tw=w]~RBVZRi};RPxuwH"
                                        width="100%"
                                        srcSet={getDefaultImage(row.length)}
                                        autoSizes
                                    />
                                ) : (
                                    <PromoImage image={col} />
                                )
                            }
                        </div>
                    ))}
                </Row>
            ))}
        </Container>
    )
}

const PromoImage: Component<{ image: string }> = ({ image }) => {
    const [imageSrc, setImageSrc] = createSignal('');

    createEffect(() => {
        const fetchImage = async () => {
            try {
                return await getImage(image, TipoImagen.PROMO);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage().then(response => setImageSrc(response));
    });

    return (
        <UnLazyImage
            blurhash="LKO2:N%2Tw=w]~RBVZRi};RPxuwH"
            srcSet={imageSrc()}
            autoSizes
            alt={image || 'Product Image'}
            class='w-100 img-fluid rounded border-dark'
        />
    );
};