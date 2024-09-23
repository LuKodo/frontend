import { useMemo, useState } from "preact/hooks"
import { Productofinal } from "@/interfaces/ProductoFinal"
import { Fragment } from "preact/jsx-runtime"
import { getHeadquarter } from "@/utils/cart"
import { ProductCard } from "@/components/Page/Product"
import { Container, Pagination } from "react-bootstrap"
import { Key } from "preact"
import { CarouselComponent } from "@/components/Page/Carousel"
import { useParams, useSearchParams } from "react-router-dom"
import Layout from "@/components/Layout"

const Shop = () => {
  const params = useParams();
  let [searchParams, _setSearchParams] = useSearchParams();
  let query = searchParams.get("q");
  const [headquarter, setHeadquarter] = useState(getHeadquarter())

  const [page, setPage] = useState(1)
  const [products, setProducts] = useState([] as Productofinal[])

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
        response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
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

  const [updateCart, setUpdateCart] = useState(false)

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
                      products.length === 0 ? <div className="text-center">No hay resultados</div>
                        :
                        products.map((
                          product: Productofinal, index: Key | null | undefined) =>
                        (
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6 gi-product-box pro-gl-content" key={index}>
                            <ProductCard key={index} product={product} setUpdateCart={setUpdateCart} />
                          </div>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>


            <div className="gi-pro-pagination">
              <span>Mostrando 1-{products.length < 20 ? products.length : 20} de {products.length} producto(s)</span>
              <ul class={"gi-pro-pagination-inner"}>
                {page > 1 && <Pagination.Item onClick={() => setPage(page - 1)}>{page - 1}</Pagination.Item>}
                <li>
                  <a class="active" href="#">{page}</a>
                </li>

                <li>
                  <a href="#" onClick={() => setPage(page + 1)}>{page + 1}</a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Fragment>
    </Layout>
  )
}

export default Shop