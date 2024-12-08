
import { Component } from "solid-js"
import StoreLayout from "../components/layout/StoreLayout.tsx"
import { MasonryPromo } from "../../../../components/Page/MasonryPromo.tsx"
import { Container } from "solid-bootstrap";

const Home: Component = () => {
  return (
    <StoreLayout>
      <Container class='mt-4'>
        <MasonryPromo />
      </Container>
    </StoreLayout>
  )
}

export default Home