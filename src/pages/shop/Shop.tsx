import { useEffect, useMemo, useState } from "preact/hooks"
import { Productofinal } from "@/interfaces/ProductoFinal"
import { Fragment } from "preact/jsx-runtime"
import { ModalProduct } from "@/components/Page/ModalProduct"
import { CheckCart } from "@/components/Page/CheckCart"
import { getCartQuantity } from "@/utils/cart"
import { ProductCard } from "@/components/Page/Product"
import { Pagination } from "react-bootstrap"
import { Key } from "preact"
import { CarouselCategories } from "@/components/Page/CarouselCategories"
import { Category } from "@/interfaces/Categoria"
import { useParams, useSearch } from "wouter"
import { ModalHeadquarter } from "@/components/Page/ModalHeadquarter"
import { CarouselComponent } from "@/components/Page/Carousel"
import { NavBarPro } from "@/components/NavBar"

function dividirEnGrupos(array: Category[]) {
  const gruposCompletos = Math.floor(array.length / 6);
  const resultado = [];
  for (let i = 0; i < gruposCompletos; i++) {
    const grupo = array.slice(i * 6, (i + 1) * 6);
    resultado.push(grupo);
  }

  return resultado;
}

const Shop = () => {
  const params = useParams();
  const query = useSearch();
  const [page, setPage] = useState(1)
  const [headquarter, setHeadquarter] = useState('SB')
  const [categories, setCategories] = useState([] as Category[][])
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
      if (query.split('=')[1] !== undefined) {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
          method: 'POST',
          body: JSON.stringify(
            {
              "limit": 20,
              "offset": page,
              "sede": headquarter,
              "categoria": params.category,
              "query": query.split('=')[1]
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
      const newData = dividirEnGrupos(data.results)

      setCategories(newData)
    }
    fetchCategories()
  }, [])

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

  const handleCloseCart = () => setCartShow(false)

  return (
    <Fragment>
      <ModalProduct product={product} handleClose={handleClose} show={showModalProduct} />
      <CheckCart show={cartShow} handleClose={handleCloseCart} setQty={setCartQuantity} />
      <ModalHeadquarter show={headquarterShow} handleClose={() => setHeadquarterShow(false)} setHeadquarter={setHeadquarter} />
      <NavBarPro headquarter={headquarter} setHeadquarterShow={setHeadquarterShow} cartQuantity={cartQuantity} setCartShow={setCartShow} />

      <CarouselComponent />

      <CarouselCategories categories={categories} category={category} setCategory={setCategory} />

      <div className="container px-5 mt-4">
        <div className='position-relative overflow-hidden'>
          <div className="shop-part">
            <div className="row">
              {
                products.length === 0 ? <div className="text-center">No hay resultados</div>
                  :
                  products.map((
                    product: Productofinal, index: Key | null | undefined) =>
                  (
                    <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                      <ProductCard key={index} product={product} show={handleShow} />
                    </div>
                  ))
              }

              <div className="text-center mt-0 mb-5">
                <Pagination>
                  {page > 1 && <Pagination.Item onClick={() => setPage(page - 1)}>{page - 1}</Pagination.Item>}
                  <Pagination.Item active>{page}</Pagination.Item>
                  <Pagination.Item onClick={() => setPage(page + 1)}>{page + 1}</Pagination.Item>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Shop