import { createMemo, createSignal } from "solid-js"
import { Col, Container, Pagination, Row } from "solid-bootstrap"
import { useParams, useSearchParams } from "@solidjs/router"
import { getHeadquarter } from "../../../../shared/utils/cart.tsx";
import { Productofinal } from "../../../../admin/domain/entities/ProductoFinal.ts";
import StoreLayout from "../components/StoreLayout.tsx";
import { CarouselComponent } from "../components/product/Carousel.tsx";
import { ProductCard } from "../../../../components/Page/Product.tsx";

const Shop = () => {
  const params = useParams();
  let [searchParams, _setSearchParams] = useSearchParams();
  const [search, setSearch] = createSignal(searchParams.q);
  const [headquarter, setHeadquarter] = createSignal(getHeadquarter())

  const [page, setPage] = createSignal(1)
  const [products, setProducts] = createSignal<{ result: Productofinal[], count: number }>({} as { result: Productofinal[], count: number })

  createMemo(() => {
    const fetchProductos = async () => {
      let response
      if (search() !== '') {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products_admin`, {
          method: 'POST',
          body: JSON.stringify(
            {
              "limit": 20,
              "offset": page(),
              "sede": headquarter(),
              "categoria": params.category,
              "paginapromo": "SI",
              "query": search()
            }
          )
        })
      } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products_admin`, {
          method: 'POST',
          body: JSON.stringify(
            {
              "limit": 20,
              "offset": page(),
              "sede": headquarter(),
              "categoria": params.category,
              "paginapromo": "SI",
            }
          )
        })
      }

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json()
      setProducts(data)
    }
    fetchProductos()
  })

  const [updateCart, setUpdateCart] = createSignal(false)

  return (
    <StoreLayout setUpdateCart={setUpdateCart} updateCart={updateCart()}>
        <Container>
          <Row>
            <Col md={2}>
              columna
            </Col>

            <Col>
              <div class="shop-pro-content">
                <div class="shop-pro-inner">
                  <div class="row">
                    {
                      products().result && products().result.length === 0 ? <div class="text-center">No hay resultados</div>
                        :
                        products().result && products().result.map((
                          product: Productofinal) =>
                        (
                          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6">
                            <ProductCard product={product} setUpdateCart={setUpdateCart} />
                          </div>
                        ))
                    }

                    <div class="gi-pro-pagination">
                      <span>Mostrando 1-{products().result && products().result.length < 20 ? products().result.length : 20} de {products().count} producto(s)</span>
                      <ul class={"gi-pro-pagination-inner"}>
                        {page() > 1 && <Pagination.Item onClick={() => setPage(page() - 1)}>{page() - 1}</Pagination.Item>}
                        <li>
                          <a class="active" href="#">{page()}</a>
                        </li>

                        <li>
                          <a href="#" onClick={() => setPage(page() + 1)}>{page() + 1}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    </StoreLayout>
  )
}

export default Shop