import { Carousel, Col, Container, Row } from "react-bootstrap"
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
    <Container className="mt-3 mb-4">
      <Carousel slide={false}>
        {categories.map((group: any[], index: any) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((category: { incremento: any; descripcion: string }) => (
                <Col key={category.incremento} md={2} sm={4} xs={6}>
                  <CategoryCard category={category.descripcion} setCategory={setCategory} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}