import { Carousel, Col, Container, Row } from "react-bootstrap"
import { CategoryCard } from "./CategoryCard"
import { Category } from "../interfaces/interfaces"
import { Dispatch, StateUpdater } from "preact/hooks"

interface Props {
    category: Category
    categories: Category[][]
    setCategory: Dispatch<StateUpdater<Category>>
}

export const CarouselCategories: preact.FunctionalComponent<Props> = ({ categories, setCategory }) => {
    return (
        <Container fluid className="mt-3">
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