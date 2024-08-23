import { Category } from "@/interfaces/Categoria"
import { getCategoryImage } from "@/utils/checkImage"
import { useEffect, useState } from "preact/hooks"
import { Card } from "react-bootstrap"

interface CategoryProps {
    category: string
    setCategory: Function
}

export const CategoryCard = (props: CategoryProps) => {
    return (
        <Card class="overflow-hidden" onClick={() => props.setCategory(props.category)} style={{ cursor: 'pointer', height: '100px'}}>
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
                    <CategoryImage category={{descripcion: props.category, incremento: '', estado: true}} />
                </div>
                <div class="el-card-content text-center">
                    <p class="mb-0 small">{props.category}</p>
                </div>
            </div>
        </Card>
    )
}

const CategoryImage: preact.FunctionalComponent<{ category: Category }> = ({ category }) => {
    const extensions = ['webp', 'png', 'jpg'];
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getCategoryImage(extensions, category.descripcion);
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
            onError={() => setImageSrc('/path/to/default/image.jpg')} // Ruta a una imagen por defecto
        />
    );
};