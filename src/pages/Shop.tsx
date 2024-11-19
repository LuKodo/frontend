import { useMemo, createSignal } from "solidjs"
import { Productofinal } from "@/admin/domain/entities/ProductoFinal.ts"
import { Fragment } from "solidjs"
import { getHeadquarter } from "@/shared/utils/cart.tsx"
import { Container, Pagination } from "react-bootstrap"
import { CarouselComponent } from "@/components/Page/Carousel.tsx"
import { useParams, useSearchParams } from "react-router-dom"
import Layout from "@/components/Layout.tsx"
import { ProductCard } from "@/components/Page/Product.tsx"
import { Key } from "preact"

const Shop = () => {
  const params = useParams();
  let [searchParams, _setSearchParams] = useSearchParams();
  let query = searchParams.get("q");
  const [headquarter, setHeadquarter] = createSignal(getHeadquarter())

  const [page, setPage] = createSignal(1)
  const [products, setProducts] = createSignal<{ result: Productofinal[], count: number }>({} as { result: Productofinal[], count: number })

  useMemo(() => {
    const fetchProductos = async () => {
      let response
      if (query) {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products_admin`, {
          method: 'POST',
          body: JSON.stringify(
            {
              "limit": 20,
              "offset": page,
              "sede": headquarter,
              "categoria": params.category,
              "paginapromo": "SI",
              "query": query
            }
          )
        })
      } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products_admin`, {
          method: 'POST',
          body: JSON.stringify(
            {
              "limit": 20,
              "offset": page,
              "sede": headquarter,
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
  }, [page, params.category, query, headquarter])

  const [updateCart, setUpdateCart] = createSignal(false)

  return (
    <Layout setUpdateCart={setUpdateCart} updateCart={updateCart} setHeadquarter={setHeadquarter} headquarter={headquarter ?? ''}>
      <Fragment>
        <Container className={"d-none d-lg-block"}>
          <CarouselComponent />
        </Container>

        <Container className="mt-5">
          <div className="row">
            <div className="gi-shop-rightside col-lg-12 col-md-12 margin-b-30">
              <div className="shop-pro-content">
                <div className="shop-pro-inner">
                  <div className="row">
                    {
                      products.result && products.result.length === 0 ? <div className="text-center">No hay resultados</div>
                        :
                        products.result && products.result.map((
                          product: Productofinal, index: Key | null | undefined) =>
                        (
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6 gi-product-box pro-gl-content" key={index}>
                            <ProductCard key={index} product={product} setUpdateCart={setUpdateCart} />
                          </div>
                        ))
                    }

                    <div className="gi-pro-pagination">
                      <span>Mostrando 1-{products.result && products.result.length < 20 ? products.result.length : 20} de {products.count} producto(s)</span>
                      <ul className={"gi-pro-pagination-inner"}>
                        {page > 1 && <Pagination.Item onClick={() => setPage(page - 1)}>{page - 1}</Pagination.Item>}
                        <li>
                          <a className="active" href="#">{page}</a>
                        </li>

                        <li>
                          <a href="#" onClick={() => setPage(page + 1)}>{page + 1}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Fragment>
    </Layout>
  )
}

export default Shop