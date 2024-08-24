import { useMemo, useState } from "preact/hooks"
import { Button, Card, Form } from "react-bootstrap"
import { Template } from "@/pages/admin/Template"
import { Carrusel } from "@/interfaces/Carrusel"
import CarruselImage from "@/components/Admin/CarruselImage"

export const Carousel = () => {
    const [items, setItems] = useState<Carrusel[]>([] as Carrusel[])
    const [reload, setReload] = useState(false)

    const fetchItems = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/carousel`)
        const data = await response.json()

        setItems(data)
    }

    useMemo(() => {
        fetchItems()
        if (reload) {
            setReload(false)
        }
    }, [reload])

    const addSlide = () => {
        const newSlide: Carrusel = {
            id: 0,
            order: items?.length ? items[items.length - 1].order + 1 : 1,
            imageName: 'default'
        }

        setItems([...items, newSlide])
    }

    return (
        <Template>
            {
                items.length > 0 ? items?.map((item) => {
                    return (
                        <Card key={item.id} className={'mb-3'}>
                            <Card.Body>
                                <CarruselImage nombre={item.imageName} reload={reload} />
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={addSlide} size="sm" variant="warning">
                                    <i className="bi bi-plus" /> Agregar slide
                                </Button>


                                <Form.Control type="file" size="sm" accept={'.png, .jpg, .jpeg'} />
                            </Card.Footer>
                        </Card>
                    )
                }) : (
                    <Button onClick={addSlide} size="sm" variant="warning">
                        <i className="bi bi-plus" /> Agregar slide
                    </Button>
                )
            }


        </Template>
    )
}