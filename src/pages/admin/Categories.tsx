import { useMemo, useState } from "preact/hooks"
import { Category } from "@/interfaces/Categoria"
import { Button, ButtonGroup, Card, Pagination } from "react-bootstrap"
import { Template } from "./Template"
import { ModalCategory } from "@/components/Admin/ModalCategory"
import CategoryImage from "@/components/Admin/CategoryImage"

interface result {
    results: Category[]
    total: number
    totalPages: number
}

const fetchCategories = async (page: number, limit: number): Promise<result> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/categoria/${page}/${limit}`)
    return await response.json()
}

export const Categories = () => {
    const [categories, setCategories] = useState<result>({} as result)
    const [category, setCategory] = useState<Category>({} as Category)
    const [showEditModal, setShowEditModal] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, _setLimit] = useState(10)

    useMemo(() => {
        const fetchData = async () => {
            const data = await fetchCategories(page, limit)
            setCategories(data)
        }
        fetchData()
    }, [page, limit])

    const hideCategory = (id: string, categoria: Category) => {
        const fetchData = async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/categoria/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    estado: !categoria.estado,
                })
            })

            const data = await fetchCategories(page, limit)
            setCategories(data)
        }
        fetchData()
    }

    return (
        <Template>
            <ModalCategory category={category.descripcion} show={showEditModal} onHide={() => {setCategory({} as Category); setShowEditModal(false)}} />
            <Card>
                <Card.Header>
                    <Card.Title>Categorías</Card.Title>
                </Card.Header>
                <Card.Body>
                    <table className="table table-sm table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descripción</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.total === 0 && (
                                    <tr>
                                        <td colSpan={4}>No hay categorías</td>
                                    </tr>
                                )
                            }
                            {categories.total > 0 && categories.results.map((category) => (
                                <tr>
                                    <td>{category.incremento}</td>
                                    <td>{category.descripcion}</td>
                                    <td>
                                        <CategoryImage category={category} />
                                    </td>
                                    <td>
                                        <ButtonGroup>
                                            <Button variant="info" size="sm" onClick={() => {
                                                setCategory(category)
                                                setShowEditModal(true)
                                            }}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => hideCategory(category.incremento, category)}>
                                                {
                                                    category.estado ? (
                                                        <i className="bi bi-eye-fill"></i>
                                                    ) : (
                                                        <i className="bi bi-eye-slash-fill"></i>
                                                    )
                                                }
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
                <Card.Footer>
                    <Pagination>
                        {
                            page > 1 && <Pagination.Prev onClick={() => setPage(page - 1)} />
                        }
                        <Pagination.Item>{page}</Pagination.Item>
                        {
                            page < categories.totalPages && <Pagination.Next onClick={() => setPage(page + 1)} />
                        }
                    </Pagination>
                </Card.Footer>
            </Card>
        </Template>
    )
}