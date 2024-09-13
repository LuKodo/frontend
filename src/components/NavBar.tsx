import { Sedes } from "./Page/Headquarter"
import { SearchInput } from "./Page/SearchInput"

interface Props {
  headquarter: string
  cartQuantity: number
  setCartShow: Function
}

const NavBarPro: React.FC<Props> = ({ headquarter, cartQuantity, setCartShow }) => {
  return (
    <header className="gi-header">
      <div class="header-top">
        <div class="container">
          <div class="row align-itegi-center">
            <div class="col header-top-right d-none d-lg-block">
              <div class="header-top-right-inner d-flex justify-content-end">
                <a class="gi-help" href="javascript:void(0)"><i class="bi bi-phone"></i> +91 987 654 3210</a>
                <a class="gi-help" href="javascript:void(0)"><i class="bi bi-whatsapp"></i> +91 987 654 3210</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="gi-header-bottom d-lg-block">
        <div class="container position-relative">
          <div class="row">
            <div class="gi-flex">
              <div class="align-self-center gi-header-logo">
                <div class="header-logo">
                  <a href="index.html">
                    <img
                      width={"50%"}
                      src="/market/logo.png"
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div class="align-self-center gi-header-search">
                <SearchInput />
              </div>
              <div class="gi-header-action align-self-center">
                <div class="gi-header-buttons">
                  <a href="javascript:void(0)" class="gi-header-btn gi-cart-toggle" title="Cart" onClick={() => setCartShow(true)}>
                    <div class="header-icon">
                      <i class="bi bi-bag"></i>
                      <span class="main-label-note-new"></span>
                    </div>
                    <span class="flags">
                      <span class="badge badge-pill bg-warning rounded-pill ms-1">{cartQuantity}</span>
                    </span>
                  </a>
                  <Sedes headquarter={headquarter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBarPro