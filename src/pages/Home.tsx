import { useEffect, useState } from "preact/hooks"
import { Category, Productofinal } from "../interfaces/interfaces"
import { Fragment } from "preact/jsx-runtime"
import { ModalProduct } from "../components/ModalProduct"
import { CheckCart } from "../components/CheckCart"
import { HeadquarterSelect } from "../components/HeadquarterSelect"
import { getCartQuantity } from "../utils/cart"
import { Sidebar } from "../components/Sidebar"
import { ProductCard } from "../components/Product"
import { Button, Container, Navbar, Pagination } from "react-bootstrap"
import { CarouselComponent } from "../components/Carousel"

export const Home = () => {
  const [page, _setPage] = useState(1)
  const [products, setProducts] = useState([] as Productofinal[])
  const [headquarter, setHeadquarter] = useState('SB')
  const [category, setCategory] = useState<Category>({ categoria: 'all' } as Category)
  const [product, setProduct] = useState({} as Productofinal)
  const [showModal, setShowModal] = useState(false)
  const [cartShow, setCartShow] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = (product: Productofinal) => {
    setProduct(product)
    setShowModal(true)
  }

  useEffect(() => {
    _setPage(1)
  }, [category])

  const handleCloseCart = () => setCartShow(false)

  const getProducts = async () => {
    const response = await fetch('https://market-backend-duaw.onrender.com/productofinal/' + page + '/20/' + headquarter + '/' + category.categoria)
    const data = await response.json()
    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [page, headquarter, category])
  return (
    <Fragment>
      <ModalProduct product={product} handleClose={handleClose} show={showModal} />
      <CheckCart show={cartShow} handleClose={handleCloseCart} />

      <Navbar expand='lg' className={'bg-success'} sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img src="/logo.png" alt="" className="img-fluid w-50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="d-flex align-items-center justify-content-between">
            <div className="w-75">
              <HeadquarterSelect headquarter={headquarter} setHeadquarter={setHeadquarter} />
            </div>

            <Button variant="warning" class="d-flex align-items-center justify-content-between" onClick={() => setCartShow(true)}>
              <i className="bi bi-cart-fill me-2" />
              <span class="badge rounded-pill bg-danger">
                {getCartQuantity()}
              </span>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CarouselComponent />
      <div class="container-fluid px-5 mt-4">
        <div class="d-flex">
          <div style={{ width: '20%', overflow: 'auto' }}>
            <div class="sidebar">
              <div class="sidebar__item">
                <h6>Categoría</h6>
                <ul style={{ height: '600px', overflow: 'auto' }}>
                  <Sidebar setCategory={setCategory} categoryactive={category} />
                </ul>
              </div>
            </div>
          </div>

          <div style={{ width: '80%', marginLeft: '20px' }}>
            <div class="row">
              {
                products?.length === 0 ? <div className="text-center">No hay resultados</div> : products?.map((product, index) => <ProductCard key={index} product={product} show={handleShow} />)
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