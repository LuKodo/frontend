import { useMemo, useState } from "preact/hooks"
import { Button, Card, Form } from "react-bootstrap"
import { Template } from "@/pages/admin/Template"
import { Carrusel } from "@/interfaces/Carrusel"
import CarruselImage from "@/components/Admin/CarruselImage"

const Carousel = () => {
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

        await fetch(`${import.meta.env.VITE_API_URL}/carousel/upsert`, {
            method: 'POST',
            body: JSON.stringify(newSlide)
        })

        setItems([...items, newSlide])
        setReload(true)
    }

    const handleSubmit = async (e: Event, filename: string, id: number) => {
        e.preventDefault()
        filename = filename.replace(/ /g, '-').replace(/[^a-zA-Z0-9\s]/g, '')

        const categoria = items.filter((row) => row.id === id)[0]
        const target = e.target as HTMLInputElement

        try {
            const data = new FormData()

            if (target && target.files && target.files[0]) {
                data.append('userfile', target.files[0])
            }

            await fetch(`${import.meta.env.VITE_API_URL}/carousel/upsert`, {
                method: "POST",
                body: JSON.stringify({
                    order: categoria.order,
                    id: id,
                    imageName: filename
                })
            })

            await fetch(`${import.meta.env.VITE_API_URL}/upload/carousel/${filename.trim()}`, {
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
            await fetch(`${import.meta.env.VITE_API_URL}/carousel/delete/${id}`)
        } catch (error) {
            console.error(error)
        } finally {
            const newData = items.filter((row) => !(row.id === id))
            setItems(newData);
            setReload(true);
        }
    }

    return (
        <Template>
            {
                items.length > 0 ? items?.map((item, index) => {
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
                                    onChange={(e) => handleSubmit(e, `${item.imageName}-${index}`, item.id)}
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

export default Carousel