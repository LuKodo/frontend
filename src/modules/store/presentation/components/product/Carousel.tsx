import { createMemo, createSignal } from "solid-js"
import { Carousel } from "solid-bootstrap"
import { Carrusel } from "../../../../../admin/domain/entities/Carrusel.ts"
import CarruselImage from "../../../../../admin/presentation/components/CarruselImage.tsx"

export const CarouselComponent = () => {
    const [items, setItems] = createSignal<Carrusel[]>([] as Carrusel[])
    const [reload, _setReload] = createSignal(false)

    createMemo(() => {
        const fetchItems = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/carousel`)
            const data = await response.json()

            setItems(data)
        }

        fetchItems()
    }, [reload])

    return (
        <Carousel id={"carousel"} style={{ height: "400px" }}>
            {
                items()?.map((item) => {
                    return (
                        <Carousel.Item>
                            <CarruselImage nombre={item.imageName} reload={reload()} />
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}