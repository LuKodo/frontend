import { useMemo, useState } from "preact/hooks"
import { Button, Card, Form } from "react-bootstrap"
import { Template } from "@pages/admin/Template"
import { Carrusel } from "@interfaces/Carrusel"
import CarruselImage from "@components/Admin/CarruselImage"

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

    const addSlide = async () => {
        const newSlide = {
            id: 0,
            order: items?.length ? items[items.length - 1].order + 1 : 1,
            imageName: 'default'
        }

        await fetch(`${import.meta.env.VITE_API_URL}/carousel`, {
            method: 'POST',
            body: JSON.stringify(newSlide)
        })

        setItems([...items, newSlide])
    }

    const handleSubmit = async (e: Event, filename: string, id: number) => {
        e.preventDefault()

        const categoria = items.filter((row) => row.id === id)[0]
        const target = e.target as HTMLInputElement

        try {
            const data = new FormData()

            if (target && target.files && target.files[0]) {
                data.append('file', target.files[0])
            }

            await fetch(`${import.meta.env.VITE_API_URL}/carousel`, {
                method: "POST",
                body: JSON.stringify({
                    order: categoria.order,
                    id: id,
                    imageName: filename
                })
            })

            await fetch(`${import.meta.env.VITE_API_URL}/upload/${filename.trim()}/carousel`, {
                method: 'POST',
                body: data
            })
        } catch (error) {
            console.error(error)
        } finally {
            setReload(true)
        }
    }

    const removeSlide = async (id: number) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/carousel/delete/${id}`).then(res => res.json()).then(res => console.log(res))
            const newData = items.filter((row) => !(row.id === id))
            setItems(newData);
        } catch (error) {
            console.error(error)
        }
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
                            <Card.Footer className="d-flex justify-content-center gap-2">
                                <Button onClick={addSlide} size="sm" variant="warning">
                                    <i className="bi bi-plus" /> Agregar slide
                                </Button>
                                <Button onClick={() => removeSlide(item.id)} size="sm" variant="warning">
                                    <i className="bi bi-trash" /> Eliminar slide
                                </Button>

                                <Form.Control
                                    type="file"
                                    onChange={(e) => handleSubmit(e, `${item.imageName}`, item.id)}
                                    size="sm"
                                    className="w-25"
                                    accept={'.png, .jpg, .jpeg'}
                                />
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