import { useEffect, useState } from "preact/hooks"
import { Category, Productofinal } from "./interfaces/interfaces";
import { Fragment } from "preact/jsx-runtime";
import { Loader } from "./components/Loader";
import { HeadquarterSelect } from "./components/HeadquarterSelect";
import { ProductCard } from "./components/Product";
import { Sidebar } from "./components/Sidebar";
import { ModalProduct } from "./components/ModalProduct";
import { getCartQuantity } from "./utils/cart";
import { CheckCart } from "./components/CheckCart";

export function App() {
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
    const response = await fetch('/api/productofinal/' + page + '/9/' + headquarter + '/' + category.categoria)
    const data = await response.json()
    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [page, headquarter, category])

  return (
    <Fragment>
      <Loader />
      <ModalProduct product={product} handleClose={handleClose} show={showModal} />
      <CheckCart show={cartShow} handleClose={handleCloseCart} />
      <header class="header">
        <div class="container">
          <div className="d-flex justify-content-between align-items-center">
            <div class="header__logo">
              <img src="/logo.png" alt="" className="img-fluid w-50" />
            </div>

            <div class="hero__search mt-4">
              <div class="hero__search__form">
                <form action="#">
                  <div class="hero__search__categories">
                    <HeadquarterSelect headquarter={headquarter} setHeadquarter={setHeadquarter} />
                  </div>
                  <input type="text" placeholder="¿Qué quieres buscar?" />
                  <button type="submit" class="site-btn">BUSCAR</button>
                </form>
              </div>
            </div>

            <button type="button" class="site-btn py-2 px-3 position-relative" onClick={() => setCartShow(true)}>
              <i class="bi bi-cart-fill fs-4 position-relative" />
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getCartQuantity()}
                <span class="visually-hidden">unread messages</span>
              </span>
            </button>
          </div>

          <div class="humberger__open">
            <i class="bi bi-list"></i>
          </div>
        </div>
      </header>

      <section class="product spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-5 d-none d-lg-block">
              <div class="sidebar">
                <div class="sidebar__item">
                  <h4>Categoría</h4>
                  <ul style={{ height: '490px', overflow: 'auto' }}>
                    <Sidebar setCategory={setCategory} categoryactive={category} />
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-lg-9 col-md-7">
              <div class="row" style={{ height: '550px', overflow: 'auto' }}>
                {
                  products?.map((product, index) => <ProductCard key={index} product={product} show={handleShow} />)
                }
                {
                  products?.length === 0 && <div className="text-center">No hay resultados</div>
                }

                <div className="text-center mt-0 mb-5">
                  <div class="product__pagination">
                    {page > 1 && <a href="#" onClick={() => _setPage(page - 1)}>{page - 1}</a>}
                    <a href="#" className="bg-success text-white">{page}</a>
                    <a href="#" onClick={() => _setPage(page + 1)}>{page + 1}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
