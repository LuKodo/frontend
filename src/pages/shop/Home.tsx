import { MasonryPromo } from "@/components/Page/MasonryPromo"
import Layout from "@/components/Layout"
import { useState } from "preact/hooks"
import { getHeadquarter } from "@/utils/cart"

const Home = () => {
  const [headquarter, setHeadquarter] = useState(getHeadquarter())
  const [updateCart, setUpdateCart] = useState(false)

  return (
    <Layout headquarter={headquarter ?? 'SB'} setHeadquarter={setHeadquarter} updateCart={updateCart} setUpdateCart={setUpdateCart}>
      <MasonryPromo />
    </Layout>
  )
}

export default Home