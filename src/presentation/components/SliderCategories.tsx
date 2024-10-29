import {FC, useEffect, useMemo, useState} from "react";
import {Category} from "../../domain/models/Category.ts";
import {useNavigate} from "react-router-dom";
import {Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import {getImage} from "../../shared/getImage.ts";
import {TipoImagen} from "../../domain/TipoImage.ts";
import {LazyLoadImage} from "react-lazy-load-image-component";


export const SliderCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState({ descripcion: 'all' } as Category)

    const navigate = useNavigate()

    useMemo(() => {
        navigate(`/shop?category=${category.descripcion}`, { replace: true })
    }, [category.descripcion, navigate])

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categories_admin/1`)
            return await response.json();
        }
        fetchImages().then(response => setCategories(response))
    }, [])

    return (
            <Swiper
                spaceBetween={8}
                autoplay
                slidesPerView={3}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                }}
                modules={[Autoplay]}
            >
                {categories.map((category, index) => (
                    <SwiperSlide className="text-decoration-none text-inherit" key={index} onClick={() => setCategory(category)}>
                        <div className="card card-product">
                            <div className="card-body text-center py-8">
<CategoryImage category={category} />
                                <div className="text-truncate">{category.descripcion}</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    )
}

const CategoryImage: FC<{ category: Category }> = ({ category }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagePath = await getImage(category.descripcion, TipoImagen.CATEGORY, 100);
                setImageSrc(imagePath);
            } catch (error) {
                console.error('Error fetching image:', error);
                setImageSrc('https://placehold.co/100x100/png')
            }
        };

        fetchImage();
    }, [category.descripcion]);

    return (
        <LazyLoadImage
            alt={category.descripcion || 'Product Image'}
            height="150px"
            src={imageSrc}
            effect="opacity"
            wrapperProps={{
                style: { transitionDelay: "1s" },
            }}
            onError={() => setImageSrc('https://placehold.co/100x100/png')}
            className={"img-fluid rounded"}
        />
    );
};