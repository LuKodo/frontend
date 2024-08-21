import { useEffect, useMemo, useState } from "preact/hooks"
import { Category, Productofinal } from "../../interfaces/interfaces"
import { Fragment } from "preact/jsx-runtime"
import { ModalProduct } from "../../components/ModalProduct"
import { CheckCart } from "../../components/CheckCart"
import { getCartQuantity } from "../../utils/cart"
import { ProductCard } from "../../components/Product"
import { Button, Container, Navbar, Pagination } from "react-bootstrap"
import { SearchInput } from "../../components/SearchInput"
import { Sedes } from "../../components/Headquarter"
import { Key } from "preact"
import { CarouselCategories } from "../../components/CarouselCategories"

function dividirEnGrupos(array: Category[]) {
  const gruposCompletos = Math.floor(array.length / 6);
  const resultado = [];
  for (let i = 0; i < gruposCompletos; i++) {
    const grupo = array.slice(i * 6, (i + 1) * 6);
    resultado.push(grupo);
  }

  return resultado;
}

export const Shop = () => {
  const [page, _setPage] = useState(1)
  const [headquarter, setHeadquarter] = useState('SB')
  const [category, setCategory] = useState<Category>({ descripcion: 'all' } as Category)

  useMemo(() => {
    const fetchProductos = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/productofinal?page=${page}&limit=20&sede=${headquarter}&categoria=${category.descripcion}`)

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json()
      setProducts(data)
    }
    fetchProductos()
  }, [page])


  useEffect(() => {
    setCartQuantity(getCartQuantity())
  }, [category])

  useMemo(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categoria`)
      const data = await response.json()
      const newData = dividirEnGrupos(data)

      setCategories(newData)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    _setPage(1)
  }, [category])

  const [products, setProducts] = useState([] as Productofinal[])
  const [product, setProduct] = useState({} as Productofinal)
  const [showModal, setShowModal] = useState(false)
  const [cartShow, setCartShow] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)

  const [categories, setCategories] = useState([] as Category[][])

  const handleClose = () => setShowModal(false)
  const handleShow = (product: Productofinal) => {
    setProduct(product)
    setShowModal(true)
  }

  useEffect(() => {
    setCartQuantity(getCartQuantity())
    _setPage(1)
  }, [category])

  const handleCloseCart = () => setCartShow(false)

  return (
    <Fragment>
      <ModalProduct product={product} handleClose={handleClose} show={showModal} />
      <CheckCart show={cartShow} handleClose={handleCloseCart} />

      <Navbar expand='lg' className={'bg-white'} sticky="top">
        <Container className="d-flex align-items-center">
          <Navbar.Brand href="#home">
            <img src="/logo.png" alt="" className="img-fluid" width={200} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <SearchInput />
          <Navbar.Collapse id="basic-navbar-nav" className="d-flex align-items-center justify-content-between">
            <Sedes headquarter={headquarter} setHeadquarter={setHeadquarter} />
            <Button variant="white" className="d-flex align-items-center" onClick={() => setCartShow(true)}>
              <i className="bi bi-cart-fill text-warning fs-8 mt-0" />
              <span className="badge px-2 py-1 fw-bold bg-warning text-white mb-0">
                {cartQuantity}
              </span>
            </Button>
            <i className='bi bi-whatsapp fs-8 text-warning' />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CarouselCategories categories={categories} category={category} setCategory={setCategory} />

      <div className="container px-5 mt-4">
        <div className='position-relative overflow-hidden'>
          <div className="shop-part d-flex w-100">
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
                  {page > 1 && <Pagination.Item onClick={() => _setPage(page - 1)}>{page - 1}</Pagination.Item>}
                  <Pagination.Item active>{page}</Pagination.Item>
                  <Pagination.Item onClick={() => _setPage(page + 1)}>{page + 1}</Pagination.Item>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}