import { Category } from "@interfaces/Categoria"
import { TipoImagen } from "@interfaces/TipoImagenEnum"
import { getImage } from "@utils/checkImage"
import { useEffect, useState } from "preact/hooks"
import { Card } from "react-bootstrap"
import { useLocation } from "wouter"

interface CategoryProps {
    category: string
    setCategory: Function
}

export const CategoryCard = (props: CategoryProps) => {
    const [_location, navigate] = useLocation();

    const goToShop = (category: string) => {
        navigate(`/shop/${category}`, { replace: true })
    }

    const setCategory = (category: string) => {
        props.setCategory(category)
        goToShop(category)
    }

    return (
        <Card class="overflow-hidden" onClick={() => setCategory(props.category)} style={{ cursor: 'pointer', height: '100px' }}>
            <div class="el-card-item pb-3">
                <div class="
                      el-card-avatar
                      mb-3
                      el-overlay-1
                      w-100
                      overflow-hidden
                      position-relative
                      text-center
                      d-flex
                      justify-content-center
                    ">
                    <CategoryImage category={{ descripcion: props.category, incremento: '', estado: true }} />
                </div>
                <div class="el-card-content text-center">
                    <p class="mb-0 small">{props.category}</p>
                </div>
            </div>
        </Card>
    )
}

const CategoryImage: preact.FunctionalComponent<{ category: Category }> = ({ category }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getImage(category.descripcion, TipoImagen.CATEGORY)
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
            loading="lazy"
            height='100px'
            class="d-block position-relative rounded img-responsive"
            onError={() => setImageSrc('https://placehold.co/100x100/png')} // Ruta a una imagen por defecto
        />
    );
};