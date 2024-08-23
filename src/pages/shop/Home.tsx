import { useState } from "preact/hooks"
import { Fragment } from "preact/jsx-runtime"
import { CheckCart } from "@/components/Page/CheckCart"
import { Button, Container, Navbar } from "react-bootstrap"
import { SearchInput } from "@/components/Page/SearchInput"
import { Sedes } from "@/components/Page/Headquarter"
import { ModalHeadquarter } from "@/components/Page/ModalHeadquarter"
import { MasonryPromo } from "@/components/Page/MasonryPromo"

export const Home = () => {
  const [headquarter, setHeadquarter] = useState('SB')
  const [cartShow, setCartShow] = useState(false)
  const [headquarterShow, setHeadquarterShow] = useState(false)
  const [cartQuantity, _setCartQuantity] = useState(0)
  const handleCloseCart = () => setCartShow(false)

  return (
    <Fragment>
      <CheckCart show={cartShow} handleClose={handleCloseCart} />
      <ModalHeadquarter show={headquarterShow} handleClose={() => setHeadquarterShow(false)} setHeadquarter={setHeadquarter} />
      <Navbar expand='lg' className={'bg-white'} sticky="top">
        <Container className="d-flex align-items-center">
          <Navbar.Brand href="#home">
            <img src="/logo.png" alt="" className="img-fluid" width={200} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <SearchInput />
          <Navbar.Collapse id="basic-navbar-nav" className="d-flex align-items-center justify-content-between">
            <Sedes headquarter={headquarter} setHeadquarterShow={setHeadquarterShow} />
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

      <MasonryPromo />
    </Fragment>
  )
}