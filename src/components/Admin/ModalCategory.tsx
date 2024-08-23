import { useEffect, useState } from "preact/hooks"
import { Modal } from "react-bootstrap"
import CategoryImage from "./CategoryImage"

interface FormData {
    description: string
    image: File | null
}

interface EditCategoryProps {
    category: string
    show: boolean
    onHide: Function
}

export const ModalCategory: preact.FunctionalComponent<EditCategoryProps> = ({ category, show, onHide }) => {
    const [formData, setFormData] = useState<FormData>({
        description: category,
        image: null
    })

    useEffect(() => {
        setFormData({
            description: category,
            image: null
        })
    }, [category])

    const handleSubmit = async (event: Event) => {
        event.preventDefault()
        try {
            const data = new FormData()
            data.append('descripcion', formData.description)
            if (formData.image) {
                data.append('image', formData.image)
            }

            await fetch(`${import.meta.env.VITE_API_URL}/categoria`, {
                method: 'POST',
                body: data,
            }).then(res => res.json()).then(res => console.log(res))

            setFormData({
                description: '',
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
        <Modal show={show} onHide={() => onHide()}>
            <Modal.Header closeButton>
                <Modal.Title>{category === '' ? 'Nueva' : 'Editar'} Categoría</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="form">
                    <div className="d-flex justify-content-between gap-2 align-items-center">
                        <CategoryImage category={{ descripcion: category, imagen: '', incremento: '', estado: true }} />
                        <div className="d-flex justify-content-center flex-column">
                            <div className="mb-3">
                                <label htmlFor="category" className={"form-label"}>Categoría:</label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={category}
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
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className={"form-control"}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-info mt-2">Guardar</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}