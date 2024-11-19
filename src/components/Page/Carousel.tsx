import { Carrusel } from "@/admin/domain/entities/Carrusel.ts"
import { useMemo, createSignal } from "solidjs"
import { Carousel } from "react-bootstrap"
import CarruselImage from "@/admin/presentation/components/CarruselImage"

export const CarouselComponent = () => {
    const [items, setItems] = createSignal<Carrusel[]>([] as Carrusel[])
    const [reload, _setReload] = createSignal(false)

    useMemo(() => {
        const fetchItems = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/carousel`)
            const data = await response.json()

            setItems(data)
        }

        fetchItems()
    }, [reload])

    return (
        <Carousel id={"carousel"}>
            {
                items?.map((item) => {
                    return (
                        <Carousel.Item key={item.id}>
                            <CarruselImage nombre={item.imageName} reload={reload} />
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}