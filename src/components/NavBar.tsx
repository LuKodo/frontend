import { Sedes, SedesSM } from "./Page/Headquarter"
import { SearchInput } from "./Page/SearchInput"

const NavBarPro: preact.FunctionComponent<{ setShowCart: Function, quantity: number, headquarter: string, setHeadquarter: Function }> = ({ setShowCart, quantity, headquarter, setHeadquarter }) => {
  return (
    <header className="gi-header">
      <div class="header-top">
        <div class="container">
          <div class="row align-itegi-center">
            <div class="col header-top-right d-none d-lg-block">
              <div class="header-top-right-inner d-flex justify-content-end">
                <a class="gi-help" href="javascript:void(0)"><i class="bi bi-phone"></i> +57 333 246 3000</a>
                <a class="gi-help" href="javascript:void(0)"><i class="bi bi-whatsapp"></i> +57 333 246 3000</a>
              </div>
            </div>
            <div class="col header-top-res d-lg-none">
              <div class="gi-header-buttons">
                <div class="right-icons">
                  <a href="javascript:void(0)" class="gi-header-btn gi-wish-toggle">
                    <SedesSM headquarter={headquarter} setHeadquarter={setHeadquarter} />
                  </a>
                  <a href="javascript:void(0)" class="gi-header-btn gi-cart-toggle" onClick={() => setShowCart(true)}>
                    <div class="header-icon">
                      <i class="bi bi-bag"></i>
                      <span class="main-label-note-new"></span>
                    </div>
                    <span class="gi-header-count gi-cart-count">{quantity}</span>
                  </a>
                  <a href="javascript:void(0)" class="gi-header-btn gi-site-menu-icon d-lg-none"></a>
                </div>
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
                  <a href="/market/">
                    <img
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
                  <a href="javascript:void(0)" class="gi-header-btn gi-cart-toggle" title="Cart" onClick={() => setShowCart(true)}>
                    <div class="header-icon">
                      <i class="bi bi-bag"></i>
                      <span class="main-label-note-new"></span>
                    </div>
                    <span class="flags">
                      <span class="badge badge-pill bg-warning rounded-pill ms-1">{quantity}</span>
                    </span>
                  </a>
                  <Sedes headquarter={headquarter} setHeadquarter={setHeadquarter} />
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