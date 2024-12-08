import { createMemo, createSignal } from "solid-js"
import {Breadcrumb, Col, Container, Pagination, Row} from "solid-bootstrap"
import {A, useParams, useSearchParams} from "@solidjs/router"
import { getHeadquarter } from "../../../../shared/utils/cart.tsx";
import { Productofinal } from "../../../../admin/domain/entities/ProductoFinal.ts";
import StoreLayout from "../components/layout/StoreLayout.tsx";
import { ProductCard } from "../../../../components/Page/Product.tsx";
import {Category} from "../../../../admin/domain/entities/Categoria.ts";

const Shop = () => {
  const params = useParams();
  let [searchParams, _setSearchParams] = useSearchParams();
  const [search, _setSearch] = createSignal(searchParams.q);
  const [headquarter, _setHeadquarter] = createSignal(getHeadquarter())

  const [page, setPage] = createSignal(1)
  const [products, setProducts] = createSignal<{ result: Productofinal[], count: number }>({} as { result: Productofinal[], count: number })
    const [categories, setCategories] = createSignal([] as Category[])

    createMemo(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categories_admin/1`)

            return await response.json()
        }
        fetchCategories()
            .then(response =>
                setCategories(response)
            )
    })
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

  return (
    <StoreLayout>
        <Breadcrumb class="mt-1">
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>{}</Breadcrumb.Item>
        </Breadcrumb>
        <hr/>

      <Container class='mt-4'>
          <Row>
            <Col md={2}>
                {categories().map((slide) => (
                    <div
                        class="position-relative d-flex flex-nowrap align-items-start p-1 m-1 rounded" role="button"
                    >
                        <A
                            href={`/search/${slide.descripcion}${(search() !== '' && search()) && '?q=' + search()}`}
                            class="fw-bold text-decoration-none"
                            style={{ color: 'rgb(157, 157, 157)' }}
                        >
                            {slide.descripcion}
                        </A>
                    </div>
                ))}
            </Col>

              <Col md={10}>
                  <Row>
                      {
                          products().result && products().result.length === 0 ? <div class="text-center">No hay resultados</div>
                        :
                        products().result && products().result.map((
                          product: Productofinal) =>
                        (
                          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6">
                            <ProductCard product={product} />
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
                  </Row>
            </Col>
          </Row>
        </Container>
    </StoreLayout>
  )
}

export default Shop