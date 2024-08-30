import { useMemo, useState } from "preact/hooks"
import { Fragment } from "preact/jsx-runtime"
import { CheckCart } from "@/components/Page/CheckCart"
import { ModalHeadquarter } from "@/components/Page/ModalHeadquarter"
import { MasonryPromo } from "@/components/Page/MasonryPromo"
import { CarouselCategories } from "@/components/Page/CarouselCategories"
import { Category } from "@/interfaces/Categoria"
import { getCartQuantity, getHeadquarter } from "@/utils/cart"
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

const Home = () => {
  const [headquarter, setHeadquarter] = useState('SB')
  const [headquarterShow, setHeadquarterShow] = useState(false)
  const [cartShow, setCartShow] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)
  const [categories, setCategories] = useState([] as Category[][])
  const [category, setCategory] = useState<Category>({ descripcion: 'all' } as Category)

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

      const getQty = getCartQuantity()
      setCartQuantity(getQty)

      const headquarter = getHeadquarter()
      if (headquarter) {
        setHeadquarter(headquarter)
      }

      setCategories(newData)
    }
    fetchCategories()
  }, [])

  const handleCloseCart = () => setCartShow(false)

  return (
    <Fragment>
      <CheckCart show={cartShow} handleClose={handleCloseCart} setQty={setCartQuantity} />
      <ModalHeadquarter show={headquarterShow} handleClose={() => setHeadquarterShow(false)} setHeadquarter={setHeadquarter} />
      <NavBarPro headquarter={headquarter} setHeadquarterShow={setHeadquarterShow} cartQuantity={cartQuantity} setCartShow={setCartShow} />
      <CarouselCategories categories={categories} category={category} setCategory={setCategory} />

      <MasonryPromo />
    </Fragment>
  )
}

export default Home