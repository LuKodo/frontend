import { useState } from "preact/hooks"
import { Card, CardBody, Col, Container, Row } from "react-bootstrap"

interface FormData {
    category: string
    image: File | null
}

export const EditCategory: preact.FunctionalComponent = () => {
    const [formData, setFormData] = useState<FormData>({
        category: '',
        image: null
    })

    const handleSubmit = async (event: Event) => {
        event.preventDefault()
        try {
            const data = new FormData()
            data.append('category', formData.category)
            if (formData.image) {
                data.append('image', formData.image)
            }

            await fetch(`${import.meta.env.VITE_API_URL}/categoria`, {
                method: 'POST',
                body: data,
            }).then(res => res.json()).then(res => console.log(res))

            setFormData({
                category: '',
                image: null
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const { name, type, value, files } = target;

        if (type === 'file' && files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    return (
        <Container>
            <Row className="mt-3">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title>Editar Categoría</Card.Title>
                        </Card.Header>
                        <CardBody>
                            <form onSubmit={handleSubmit} className="form">
                                <div className="mb-3">
                                    <label htmlFor="category" className={"form-label"}>Categoría:</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className={"form-control"}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className={"form-label"}>Imagen:</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleInputChange}
                                        className={"form-control"}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-info mt-2">Guardar</button>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}