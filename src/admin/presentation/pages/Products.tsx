import { Card, Col, Form, FormLabel, FormSelect, Pagination, Row } from "solid-bootstrap"
import { Productofinal } from "../../domain/entities/ProductoFinal.ts"
import { useSearchParams } from "@solidjs/router"
import { createMemo, createSignal } from "solid-js"
import { Sede } from "../../domain/entities/Sede.ts"
import { Category } from "../../domain/entities/Categoria.ts"
import { SearchInputAdmin } from "../../../components/Page/SearchInput.tsx"
import ProductImage from "../components/ProductImage.tsx"
import { Template } from "../components/Template.tsx"

interface result {
    result: Productofinal[]
    count: number
}

const fetchDataProducts = async (page: number, limit: number, category: string, headquarter: string, query: string): Promise<result> => {
    let response
    if (query !== '') {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products_admin`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    "limit": limit,
                    "offset": page,
                    "sede": headquarter,
                    "categoria": category,
                    "query": query
                }
            )
        })
    } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products_admin`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    "limit": limit,
                    "offset": page,
                    "sede": headquarter,
                    "categoria": category
                }
            )
        })
    }
    return await response.json()
}

const Products = () => {

    let [searchParams, _setSearchParams] = useSearchParams();
    let query = searchParams.q as string;

    const [dataProducts, setDataProducts] = createSignal<result>({} as result)
    const [categories, setCategories] = createSignal<Category[]>([] as Category[])
    const [category, setCategory] = createSignal<string>("all")
    const [reload, setReload] = createSignal(false)
    const [page, setPage] = createSignal(1)
    const [limit, _setLimit] = createSignal(5)
    const [headquarter, setHeadquarter] = createSignal("SB")
    const [headquarters, setHeadquarters] = createSignal<Sede[]>([] as Sede[])

    createMemo(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categories_admin/1`)
            const data = await response.json()
            setCategories(data);
        }
        fetchCategories()
    })

    createMemo(() => {
        const fetSedes = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/headquarters`)
            const data = await response.json()

            setHeadquarters(data)
        }
        fetSedes()
    })

    const fetchData = async () => {
        setDataProducts({} as result)
        let data
        if (query) {
            data = await fetchDataProducts(page(), limit(), category(), headquarter(), query)
        } else {
            data = await fetchDataProducts(page(), limit(), category(), headquarter(), '')
        }
        setDataProducts(data)
    }

    createMemo(() => {
        fetchData()
        if (reload()) {
            setReload(false)
        }
    })

    const hideCategory = (codigo: string, prefijo: string, estado: string) => {
        const fetchCate = async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/product/update`, {
                method: "POST",
                body: JSON.stringify({
                    paginapromo: estado,
                    codigo: codigo,
                    prefijo: prefijo
                })
            })

            await fetchData()
        }
        fetchCate()
    }

    const handleSubmit = async (e: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }, filename: string) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        try {
            const data = new FormData()

            if (target && target.files && target.files[0]) {
                data.append('userfile', target.files[0])
            }

            await fetch(`${import.meta.env.VITE_API_URL}/upload/products/${filename.trim()}`, {
                method: 'POST',
                body: data,
            }).then(res => res.json()).then(res => console.log(res))
        } catch (error) {
            console.error(error)
        } finally {
            setReload(true)
        }
    }

    return (
        <Template>
            <div class="page-header">
                <h1 id="navbars">Productos</h1>
            </div>

            <Row class="my-5">
                <Col md={{ span: 3, offset: 3 }}>

                    <Form.Label>Sede</Form.Label>
                    <FormSelect onChange={(e) => {
                        const target = e.target as HTMLSelectElement
                        setHeadquarter(target.value)
                    }}>
                        {
                            headquarters().map((hq) => (
                                (hq.prefijo === headquarter()) ?
                                    <option value={hq.prefijo} selected>{hq.nombre}</option> :
                                    <option value={hq.prefijo}>{hq.nombre}</option>
                            ))
                        }
                    </FormSelect>
                </Col>
                <Col md={3}>
                    <FormLabel>Categoría</FormLabel>
                    <FormSelect onChange={(e) => {
                        const target = e.target as HTMLSelectElement
                        setCategory(target.value)
                    }}>
                        <option value="all">Todos</option>
                        {
                            categories()
                                .filter((cat) => (Number(cat.estado) === 1))
                                .map((hq) => (
                                    (hq.descripcion === category()) ?
                                        <option value={hq.descripcion} selected>{hq.descripcion}</option> :
                                        <option value={hq.descripcion}>{hq.descripcion}</option>
                                ))
                        }
                    </FormSelect>
                </Col>
                <Col md={3}>
                    <FormLabel>Buscar</FormLabel>
                    <SearchInputAdmin />
                </Col>
            </Row>

            <div class="card mb-3">
                <Card.Header>Productos</Card.Header>
                <Card.Body>
                    <table class="table table-sm small">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descripción</th>
                                <th>Sede</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataProducts().count === 0 && (
                                <tr>
                                    <td colSpan={5} class="text-center">
                                        No hay resultados
                                    </td>
                                </tr>
                            )}
                            {dataProducts().result?.map((product) => (
                                <tr>
                                    <td>{product.codigo}</td>
                                    <td>{product.nombre}</td>
                                    <td>{product.prefijo}</td>
                                    <td><ProductImage nombre={product.codigo} reload={reload()} /></td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    accept="image/*"
                                                    class="form-control form-control-sm"
                                                    onChange={(e) => handleSubmit(e, product.codigo)}
                                                />
                                            </div>
                                            <div class="col">
                                                {
                                                    product.paginapromo === 'NO' ? (
                                                        <button class="btn btn-sm btn-warning" onClick={() => hideCategory(product.codigo, product.prefijo, 'SI')}>
                                                            <i class="bi bi-eye-slash-fill" />
                                                        </button>
                                                    ) : (
                                                        <button class="btn btn-sm btn-warning" onClick={() => hideCategory(product.codigo, product.prefijo, 'NO')}>
                                                            <i class="bi bi-eye-fill" />
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
                <Card.Footer class="pt-3 py-0">
                    <Pagination>
                        {
                            (page() > 1) && <Pagination.First onClick={() => setPage(1)} />
                        }
                        {
                            (page() > 1) && <Pagination.Prev onClick={() => setPage(page() - 1)} />
                        }
                        <Pagination.Item>{page()}</Pagination.Item>
                        {
                            (page() < Math.round(dataProducts().count / 5)) && <Pagination.Next onClick={() => setPage(page() + 1)} />
                        }
                        {
                            (page() < Math.round(dataProducts().count / 5)) && <Pagination.Last onClick={() => setPage(Math.round(dataProducts().count / 5))} />
                        }
                    </Pagination>
                </Card.Footer>
            </div>
        </Template>
    )
}

export default Products