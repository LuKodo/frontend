import { useMemo, useState } from "preact/hooks"
import { Category } from "@/interfaces/Categoria"
import CategoryImage from "../Admin/CategoryImage"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

export const CarouselCategories = () => {
  const [categories, setCategories] = useState([] as Category[])
  const [category, setCategory] = useState({ descripcion: 'all' } as Category)
  const navigate = useNavigate()

  useMemo(() => {
    navigate(`/market/shop/${category.descripcion}`, { replace: true })
  }, [category])

  useMemo(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/category`, {
        method: 'POST',
        body: JSON.stringify({
          'limit': 1000,
          'offset': 1,
          'estado': 1
        })
      })

      const data = await response.json()
      setCategories(data.results)
    }
    fetchCategories()
  }, [])

  return (
    <Container className={"my-4"}>
      <Swiper
        spaceBetween={5}
        autoplay
        slidesPerView={1}
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
        {categories.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div class="gi-cat-box gi-cat-box-3" role="button" style={{ height: '180px' }} onClick={() => setCategory(slide)}>
              <div class="gi-ser-inner">
                <div class="gi-cat-icon">
                  <CategoryImage category={{ descripcion: slide.descripcion, id: '', estado: true }} />
                  <div className="gi-cat-detail">
                    <small class="gi-cat-title small">{slide.descripcion}</small>
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