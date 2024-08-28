import { useMemo, useState } from "preact/hooks"
import { Category } from "@interfaces/Categoria"
import { Button, ButtonGroup, Card, Pagination } from "react-bootstrap"
import { Template } from "./Template"
import { ModalCategory } from "@components/Admin/ModalCategory"
import CategoryImage from "@components/Admin/CategoryImage"

interface result {
    results: Category[]
    total: number
    pages: number
}

const fetchCategories = async (page: number, limit: number): Promise<result> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/category`, {
        method: "POST",
        body: JSON.stringify({
            "limit": limit,
            "offset": page
        })
    })
    return await response.json()
}

export const Categories = () => {
    const [categories, setCategories] = useState<result>({} as result)
    const [category, setCategory] = useState<Category>({} as Category)
    const [showEditModal, setShowEditModal] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, _setLimit] = useState(5)

    const fetchData = async () => {
        const data = await fetchCategories(page, limit)
        setCategories(data)
    }

    useMemo(() => {
        if (!showEditModal) {
            setCategory({} as Category);
            fetchData()
        }

        if (page) {
            fetchData()
        }
    }, [page, showEditModal])

    const hideCategory = (id: string, categoria: Category) => {
        const fetchData = async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/category/upsert`, {
                method: "POST",
                body: JSON.stringify({
                    estado: !categoria.estado,
                    id: id,
                    descripcion: categoria.descripcion
                })
            })

            const data = await fetchCategories(page, limit)
            setCategories(data)
        }
        fetchData()
    }

    return (
        <Template>
            <ModalCategory category={category.descripcion} show={showEditModal} onHide={() => setShowEditModal(false)} />
            <Card>
                <Card.Header>
                    <Card.Title>Categorías</Card.Title>
                </Card.Header>
                <Card.Body>
                    <table className="table table-sm">
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
                                        {
                                            category && <CategoryImage category={category} reload={showEditModal} />
                                        }
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
                            page < categories.pages && <Pagination.Next onClick={() => setPage(page + 1)} />
                        }
                    </Pagination>
                </Card.Footer>
            </Card>
        </Template>
    )
}