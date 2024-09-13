import { useMemo, useState } from "preact/hooks"
import { Fragment } from "preact/jsx-runtime"
import { CheckCart } from "@/components/Page/CheckCart"
import { MasonryPromo } from "@/components/Page/MasonryPromo"
import { CarouselCategories } from "@/components/Page/CarouselCategories"
import { Category } from "@/interfaces/Categoria"
import { getCartQuantity, getHeadquarter } from "@/utils/cart"
const NavBarPro = lazy(() => import('@/components/NavBar'));
import { Footer } from "@/components/Page/Footer"
import { lazy } from "preact/compat"

function dividirEnGrupos(array: Category[]) {
  const gruposCompletos = Math.floor(array.length / 6);
  const resultado = [];
  for (let i = 0; i < gruposCompletos; i++) {
    const grupo = array.slice(i * 6, (i + 1) * 6);
    resultado.push(grupo);
  }

  return resultado;
}

const Home = () => {
  const [headquarter, setHeadquarter] = useState('SB')
  const [cartShow, setCartShow] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)
  const [category, setCategory] = useState<Category>({ descripcion: 'all' } as Category)

  const handleCloseCart = () => setCartShow(false)

  return (
    <Fragment>
      <CheckCart show={cartShow} handleClose={handleCloseCart} setQty={setCartQuantity} />
      <NavBarPro headquarter={headquarter} cartQuantity={cartQuantity} setCartShow={setCartShow} />
      <CarouselCategories category={category} setCategory={setCategory} />

      <MasonryPromo />
      <Footer />
      <div class="footer-bottom">
        <div class="container">
          <div class="row">
            <div class="gi-bottom-info">
              <div class="footer-copy">
                <div class="footer-bottom-copy ">
                  <div class="gi-copy">Copyright © <a class="site-name" href="https://me.luiscaraballo.com.co">Ing. Luis Caraballo </a>
                    all
                    rights reserved. Powered by Inversiones La Central.</div>
                </div>
              </div>
              <div class="footer-bottom-right">
                <div class="footer-bottom-payment d-flex justify-content-center">
                  <div class="payment-link">
                    <img src="/market/payment.png" alt="payment" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Home