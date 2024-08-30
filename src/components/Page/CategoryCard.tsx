import { Category } from "@/interfaces/Categoria"
import { TipoImagen } from "@/interfaces/TipoImagenEnum"
import { getImage } from "@/utils/checkImage"
import { useEffect, useState } from "preact/hooks"
import { Card } from "react-bootstrap"
import { LazyLoadImage } from "react-lazy-load-image-component"
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
                    <CategoryImage category={{ descripcion: props.category, id: '', estado: true }} />
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
        <LazyLoadImage
            alt={category.descripcion || 'Product Image'}
            height="100px"
            src={imageSrc}
            effect="opacity"
            wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
            }}
            className={"img-fluid"}
        />
    );
};