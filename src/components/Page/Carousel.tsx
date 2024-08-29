import { Carrusel } from "@/interfaces/Carrusel"
import { useMemo, useState } from "preact/hooks"
import { Carousel } from "react-bootstrap"
import CarruselImage from "../Admin/CarruselImage"

export const CarouselComponent = () => {
    const [items, setItems] = useState<Carrusel[]>([] as Carrusel[])
    const [reload, _setReload] = useState(false)

    useMemo(() => {
        const fetchItems = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/carousel`)
            const data = await response.json()

            setItems(data)
        }

        fetchItems()
    }, [reload])

    return (
        <Carousel>
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