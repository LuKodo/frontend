import { Col, Container, Row } from "react-bootstrap"
import { Dispatch, StateUpdater } from "preact/hooks"
import { CategoryCard } from "@/components/Page/CategoryCard"
import { Category } from "@/interfaces/Categoria"

interface Props {
  category: Category
  categories: Category[][]
  setCategory: Dispatch<StateUpdater<Category>>
}

export const CarouselCategories: preact.FunctionalComponent<Props> = ({ categories, setCategory }) => {
  return (
    <Container fluid>
      <div id="carouselExample" class="carousel slide d-flex justify-content-center align-items-center gap-3 my-3">
        <button class="btn btn-warning btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <i class="bi bi-chevron-left" />
        </button>

        <div class="carousel-inner">
          {categories.map((group: any[], index: any) => (
            <div class={`carousel-item ${index === 0 && 'active'}`} key={index}>
              <Row>
                {group.map((category: { incremento: any; descripcion: string }) => (
                  <Col key={category.incremento} md={2} sm={4} xs={6}>
                    <CategoryCard category={category.descripcion} setCategory={setCategory} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </div>


        <button class="btn btn-warning btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <i class="bi bi-chevron-right" />
        </button>
      </div>
    </Container>
  )
}