
import { Component, createSignal } from "solid-js"
import StoreLayout from "../components/StoreLayout.tsx"
import { MasonryPromo } from "../../../../components/Page/MasonryPromo.tsx"

const Home: Component = () => {
  const [updateCart, setUpdateCart] = createSignal(false)

  return (
    <StoreLayout updateCart={updateCart()} setUpdateCart={setUpdateCart}>
      <section class="mx-3 my-3">
        <MasonryPromo />
      </section>
    </StoreLayout>
  )
}

export default Home