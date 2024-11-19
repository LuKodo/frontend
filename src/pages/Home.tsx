
import { Component, createSignal } from "solid-js"
import Layout from "../components/Layout"
import { MasonryPromo } from "../components/Page/MasonryPromo"
import { getHeadquarter } from "../shared/utils/cart"

const Home: Component = () => {
  const [headquarter, setHeadquarter] = createSignal(getHeadquarter())
  const [updateCart, setUpdateCart] = createSignal(false)

  return (
    <Layout headquarter={headquarter() ?? 'SB'} setHeadquarter={setHeadquarter} updateCart={updateCart()} setUpdateCart={setUpdateCart}>
      <MasonryPromo />
    </Layout>
  )
}

export default Home