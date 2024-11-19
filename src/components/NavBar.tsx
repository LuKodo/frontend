import { Component } from "solid-js";
import { SedesSM } from "./Page/Headquarter"

const NavBarPro: Component<{ setShowListCategories: Function, setShowCart: Function, quantity: number, headquarter: string, setHeadquarter: Function, setShowModal: Function }> = ({headquarter, setHeadquarter, setShowCart,setShowListCategories}) => {
  return (
      <nav class="navbar navbar-expand-md navbar-dark fixed-top p-0">
          <div class="w-100 d-flex flex-column">
              <div class="w-100 d-flex justify-content-between p-3 align-items-center" style={{"background-color": "#F26E22"}}>
                  <div class={"d-flex justify-content-between align-items-center gap-2"}>
                      <i class={"bi bi-grid text-white fs-3"} role={"button"} onClick={() => setShowListCategories(true)} />

                      <a href="/market/" class={"img-fluid"}>
                          <img src="/market/logo.png" alt="Logo"
                               class="img-fluid d-none d-md-block w-50"/>
                          <img src="/market/single.png" alt="Logo" class="img-fluid d-block d-md-none w-25"/>
                      </a>
                  </div>

                  <div class="d-flex align-items-center gap-3">
                      <i class="bi bi-search text-white fs-3" role={"button"}/>
                      <i class="bi bi-cart text-white fs-1" role={"button"} onClick={() => setShowCart(true)}/>
                      <i class="bi bi-radar text-white fs-1" role={"button"}/>
                  </div>
              </div>

              <div class="w-100 bg-white p-2 shadow-sm">
                  <SedesSM headquarter={headquarter} setHeadquarter={setHeadquarter}/>
              </div>
          </div>
      </nav>
  )
}

export default NavBarPro