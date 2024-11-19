import { Category } from "@/admin/domain/entities/Categoria.ts"
import { TipoImagen } from "@/admin/domain/entities/TipoImagenEnum.ts"
import { getImage } from "@/shared/utils/checkImage"
import { FC, createEffect, createSignal } from "solidjs"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"

interface CategoryProps {
    category: string
    setCategory: Function
}

export const CategoryCard = (props: CategoryProps) => {
    const navigate = useNavigate();

    const goToShop = (category: string) => {
        navigate(`/market/shop/${category}`, { replace: true })
    }

    const setCategory = (category: string) => {
        props.setCategory(category)
        goToShop(category)
    }

    return (
        <div className="gi-ser-content gi-ser-content-1 p-tp-12 wow fadeInUp">
            <div className="gi-ser-inner" onClick={() => setCategory(props.category)}>
                <div className="gi-service-image">
                    <CategoryImage category={{ descripcion: props.category, id: '', estado: "1" }} />
                </div>
                <div className="gi-service-desc" style={{ height: '30px' }}>
                    <small className="small">{props.category}</small>
                </div>
            </div>
        </div>
    )
}

const CategoryImage: FC<{ category: Category }> = ({ category }) => {
    const [imageSrc, setImageSrc] = createSignal('');

    createEffect(() => {
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
            src={imageSrc}
            effect="opacity"
            wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
            }}
            className={"img-fluid p-1"}
        />
    );
};