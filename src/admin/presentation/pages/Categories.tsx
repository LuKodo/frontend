import { Button, Card, Pagination } from "solid-bootstrap"
import { Template } from "../components/Template.tsx"
import { Category } from "../../domain/entities/Categoria.ts"
import { Component, createMemo, createSignal } from "solid-js"
import CategoryImage from "../components/CategoryImage.tsx"

interface response {
    result: Category[],
    count: number
}

const fetchCategories = async (page: number, limit: number): Promise<response> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/${page}/${limit}`)
    return await response.json()
}

export const Categories: Component = () => {
    const [categories, setCategories] = createSignal<response>({ result: [], count: 0 })
    const [page, setPage] = createSignal<number>(1)
    const [limit, _setLimit] = createSignal(5)

    const fetchData = async () => {
        const data = await fetchCategories(page(), limit())
        setCategories(data)
    }

    createMemo(() => {
        if (page()) {
            fetchData()
        }
    })

    const hideCategory = (id: string, categoria: Category) => {
        const fetchData = async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/category/update`, {
                method: "POST",
                body: JSON.stringify({
                    estado: categoria.estado === '1' ? '0' : '1',
                    id: id,
                    descripcion: categoria.descripcion
                })
            })

            const data = await fetchCategories(page(), limit())
            setCategories(data)
        }
        fetchData()
    }

    const handleSubmit = async (e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }, filename: string) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        try {
            const data = new FormData()

            if (target && target.files && target.files[0]) {
                data.append('userfile', target.files[0])
            }

            await fetch(`${import.meta.env.VITE_API_URL}/upload/categories/${filename.trim()}`, {
                method: 'POST',
                body: data,
            }).then(res => res.json()).then(res => console.log(res))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Template>
            <div class="page-header">
                <h1 id="navbars">Categorías</h1>
            </div>

            <Card class="mt-4">
                <Card.Header>Categorías</Card.Header>
                <Card.Body>
                    <table class="table table-sm small">
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
                                categories().count === 0 && (
                                    <tr>
                                        <td colSpan={4}>No hay categorías</td>
                                    </tr>
                                )
                            }
                            {categories().count > 0 && categories().result.map((category: Category) => (
                                <tr>
                                    <td>{category.id}</td>
                                    <td>{category.descripcion}</td>
                                    <td>
                                        {
                                            category && <CategoryImage category={category} />
                                        }
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    accept="image/*"
                                                    class="form-control form-control-sm"
                                                    onChange={(e) => handleSubmit(e, category.descripcion)}
                                                />
                                            </div>
                                            <div class="col">
                                                <Button variant="warning" size="sm" onClick={() => hideCategory(category.id, category)}>
                                                    {
                                                        category.estado === "1" ? (
                                                            <i class="bi bi-eye-fill"></i>
                                                        ) : (
                                                            <i class="bi bi-eye-slash-fill"></i>
                                                        )
                                                    }
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
                <Card.Footer>
                    <Pagination>
                        {
                            (page() > 1) && <Pagination.First onClick={() => setPage(1)} />
                        }
                        {
                            (page() > 1) && <Pagination.Prev onClick={() => setPage(page() - 1)} />
                        }
                        <Pagination.Item>{page()}</Pagination.Item>
                        {
                            (page() < Math.round(categories().count / 5)) && <Pagination.Next onClick={() => setPage(page() + 1)} />
                        }
                        {
                            (page() < Math.round(categories().count / 5)) && <Pagination.Last onClick={() => setPage(Math.round(categories().count / 5))} />
                        }
                    </Pagination>
                </Card.Footer>
            </Card>
        </Template>
    )
}

export default Categories