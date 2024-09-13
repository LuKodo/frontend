import { useEffect, useMemo, useState } from "preact/hooks"
import { Productofinal } from "@/interfaces/ProductoFinal"
import { Fragment } from "preact/jsx-runtime"
import { ModalProduct } from "@/components/Page/ModalProduct"
import { CheckCart } from "@/components/Page/CheckCart"
import { getCartQuantity } from "@/utils/cart"
import { ProductCard } from "@/components/Page/Product"
import { Container, Pagination } from "react-bootstrap"
import { Key } from "preact"
import { CarouselCategories } from "@/components/Page/CarouselCategories"
import { Category } from "@/interfaces/Categoria"
import { ModalHeadquarter } from "@/components/Page/ModalHeadquarter"
import { CarouselComponent } from "@/components/Page/Carousel"
import { useParams, useSearchParams } from "react-router-dom"
import { Footer } from "@/components/Page/Footer"
import NavBarPro from "@/components/NavBar"

const Shop = () => {
  const params = useParams();
  let [searchParams, _setSearchParams] = useSearchParams();
  let query = searchParams.get("q");

  const [page, setPage] = useState(1)
  const [headquarter, setHeadquarter] = useState('SB')
  const [category, setCategory] = useState<Category>({ descripcion: params.category || 'all' } as Category)
  const [products, setProducts] = useState([] as Productofinal[])
  const [product, setProduct] = useState({} as Productofinal)
  const [showModalProduct, setShowModal] = useState(false)
  const [cartShow, setCartShow] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)
  const [headquarterShow, setHeadquarterShow] = useState(false)

  useMemo(() => {
    const fetchProductos = async () => {
      let response
      if (query) {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
          method: 'POST',
          body: JSON.stringify(
            {
              "limit": 20,
              "offset": page,
              "sede": headquarter,
              "categoria": params.category,
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
  }, [page, params.category, query])

  useEffect(() => {
    setCartQuantity(getCartQuantity())
    setPage(1)
  }, [params.category, product])

  const handleClose = () => {
    setShowModal(false)
    setProduct({} as Productofinal)
  }
  const handleShow = (product: Productofinal) => {
    setProduct(product)
    setShowModal(true)
  }

  useEffect(() => {
    console.log(query)
  }, [query])

  const handleCloseCart = () => setCartShow(false)

  return (
    <Fragment>
      <ModalProduct product={product} handleClose={handleClose} show={showModalProduct} />
      <CheckCart show={cartShow} handleClose={handleCloseCart} setQty={setCartQuantity} />
      <ModalHeadquarter show={headquarterShow} handleClose={() => setHeadquarterShow(false)} setHeadquarter={setHeadquarter} />
      <NavBarPro headquarter={headquarter} cartQuantity={cartQuantity} setCartShow={setCartShow} />

      <CarouselCategories category={category} setCategory={setCategory} />

      <Container>
        <CarouselComponent />
      </Container>

      <Container className="mt-5">
        <div className="row">
          {
            products.length === 0 ? <div className="text-center">No hay resultados</div>
              :
              products.map((
                product: Productofinal, index: Key | null | undefined) =>
              (
                <div className="col-md-4 col-sm-6 col-xs-6 gi-col-5 gi-product-box" key={index}>
                  <ProductCard key={index} product={product} show={handleShow} />
                </div>
              ))
          }

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
      <Footer />
    </Fragment>
  )
}

export default Shop