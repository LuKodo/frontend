import { createMemo, createSignal } from "solid-js"
import { Button, Card, Form } from "solid-bootstrap"
import {Carrusel} from "../../domain/entities/Carrusel.ts";
import {Template} from "../components/Template.tsx";
import CarruselImage from "../components/CarruselImage.tsx";

const Carousel = () => {
    const [items, setItems] = createSignal<Carrusel[]>([] as Carrusel[])
    const [reload, setReload] = createSignal(false)

    const fetchItems = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/carousel`)
        const data = await response.json()

        setItems(data)
    }

    createMemo(() => {
        fetchItems()
        if (reload()) {
            setReload(false)
        }
    }, [reload])

    const addSlide = async () => {
        const newSlide = {
            id: 0,
            order: items()?.length ? items()[items().length - 1].order + 1 : 1,
            imageName: 'default'
        }

        await fetch(`${import.meta.env.VITE_API_URL}/carousel/upsert`, {
            method: 'POST',
            body: JSON.stringify(newSlide)
        })

        setItems([...items(), newSlide])
        setReload(true)
    }

    const handleSubmit = async (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: HTMLInputElement | HTMLTextAreaElement; }, filename: string, id: number) => {
        e.preventDefault()
        filename = filename.replace(/ /g, '-').replace(/[^a-zA-Z0-9\s]/g, '')

        const categoria = items().filter((row: { id: number }) => row.id === id)[0]
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
            const newData = items().filter((row) => !(row.id === id))
            setItems(newData);
            setReload(true);
        }
    }

    return (
        <Template>
            {
                items().length > 0 ? items()?.map((item, index) => {
                    return (
                        <Card class={'mb-3'}>
                            <Card.Body>
                                <CarruselImage nombre={item.imageName} reload={reload()} />
                            </Card.Body>
                            <Card.Footer class="d-flex justify-content-center gap-2">
                                <Button onClick={addSlide} size="sm" variant="warning">
                                    <i class="bi bi-plus" /> Agregar slide
                                </Button>
                                <Button onClick={() => removeSlide(item.id)} size="sm" variant="warning">
                                    <i class="bi bi-trash" /> Eliminar slide
                                </Button>

                                <Form.Control
                                    type="file"
                                    onChange={(e) => handleSubmit(e, `${item.imageName}-${index}`, item.id)}
                                    size="sm"
                                    class="w-25"
                                    accept={'.png, .jpg, .jpeg'}
                                />
                            </Card.Footer>
                        </Card>
                    )
                }) : (
                    <Button onClick={addSlide} size="sm" variant="warning">
                        <i class="bi bi-plus" /> Agregar slide
                    </Button>
                )
            }


        </Template>
    )
}

export default Carousel