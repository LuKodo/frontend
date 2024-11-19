import { useMemo, createSignal } from "solidjs"
import { Category } from "@/admin/domain/entities/Categoria.ts"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper.css';
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import CategoryImage from "@/admin/presentation/components/CategoryImage.tsx";

export const CarouselCategories = () => {
  const [categories, setCategories] = createSignal([] as Category[])
  const [category, setCategory] = createSignal({ descripcion: 'all' } as Category)
  const navigate = useNavigate()

  useMemo(() => {
    navigate(`/market/shop/${category.descripcion}`, { replace: true })
  }, [category])

  useMemo(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories_admin/1`)

      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <Container fluid className={"mb-4"}>
      <Swiper
        spaceBetween={5}
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
            slidesPerView: 8,
          },
        }}
        modules={[Autoplay]}
      >
        {categories.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="" role="button" style={{ height: '100px' }} onClick={() => setCategory(slide)}>
              <div className="text-center">
                <div className="gi-cat-icon">
                  <CategoryImage category={{ descripcion: slide.descripcion, id: '', estado: "1" }} />
                  <div className="gi-cat-detail">
                    <small className="gi-cat-title small">{slide.descripcion}</small>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}