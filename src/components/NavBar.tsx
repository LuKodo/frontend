import { Button, Container, Navbar } from "react-bootstrap"
import { SearchInput } from "./Page/SearchInput"
import { Sedes } from "./Page/Headquarter"

interface Props {
    headquarter: string
    setHeadquarterShow: Function
    cartQuantity: number
    setCartShow: Function
}

export const NavBarPro: React.FC<Props> = ({ headquarter, setHeadquarterShow, cartQuantity, setCartShow }) => {
    return (
        <Navbar expand='lg' className={'bg-white'} sticky="top">
        <Container className="d-flex align-items-center">
          <Navbar.Brand href="/market/">
            <img src="/market/logo.png" alt="" className="img-fluid" width={200} />
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
    )
}