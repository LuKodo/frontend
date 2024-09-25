import { useMemo, useState } from "preact/hooks"
import { Card, Col, FormLabel, FormSelect, Pagination, Row } from "react-bootstrap"
import { Template } from "./Template"
import { Productofinal } from "@/interfaces/ProductoFinal"
import { Sede } from "@/interfaces/Sede"
import ProductImage from "@/components/Admin/ProductImage"
import { SearchInputAdmin } from "@/components/Page/SearchInput"
import { useSearchParams } from "react-router-dom"
import { Category } from "@/interfaces/Categoria"

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
    let query = searchParams.get("q");

    const [dataProducts, setDataProducts] = useState<result>({} as result)
    const [categories, setCategories] = useState<Category[]>([] as Category[])
    const [category, setCategory] = useState<string>("all")
    const [reload, setReload] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, _setLimit] = useState(5)
    const [headquarter, setHeadquarter] = useState("SB")
    const [headquarters, setHeadquarters] = useState<Sede[]>([] as Sede[])

    useMemo(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categories_admin/1`)
            const data = await response.json()
            setCategories(data);
        }
        fetchCategories()
    }, [])

    useMemo(() => {
        const fetSedes = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/headquarters`)
            const data = await response.json()

            setHeadquarters(data)
        }
        fetSedes()
    }, [])

    const fetchData = async () => {
        setDataProducts({} as result)
        let data
        if (query) {
            data = await fetchDataProducts(page, limit, category, headquarter, query)
        } else {
            data = await fetchDataProducts(page, limit, category, headquarter, '')
        }
        setDataProducts(data)
    }

    useMemo(() => {
        fetchData()
        if (reload) {
            setReload(false)
        }
    }, [headquarter, page, reload, query, category])

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

    const handleSubmit = async (e: Event, filename: string) => {
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

            <Row className="my-5">
                <Col md={{ span: 3, offset: 3 }}>

                    <FormLabel>Sede</FormLabel>
                    <FormSelect onChange={(e) => {
                        const target = e.target as HTMLSelectElement
                        setHeadquarter(target.value)
                    }}>
                        {
                            headquarters.map((hq) => (
                                (hq.prefijo === headquarter) ?
                                    <option key={hq.nombre} value={hq.prefijo} selected>{hq.nombre}</option> :
                                    <option key={hq.nombre} value={hq.prefijo}>{hq.nombre}</option>
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
                            categories
                                .filter((cat) => (Number(cat.estado) === 1))
                                .map((hq) => (
                                    (hq.descripcion === category) ?
                                        <option key={hq.id} value={hq.descripcion} selected>{hq.descripcion}</option> :
                                        <option key={hq.id} value={hq.descripcion}>{hq.descripcion}</option>
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
                    <table className="table table-sm small">
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
                            {dataProducts.count === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        No hay resultados
                                    </td>
                                </tr>
                            )}
                            {dataProducts.result?.map((product) => (
                                <tr>
                                    <td>{product.codigo}</td>
                                    <td width={350}>{product.nombre}</td>
                                    <td>{product.prefijo}</td>
                                    <td><ProductImage nombre={product.codigo} reload={reload} /></td>
                                    <td>
                                        <div className="row">
                                            <div className="col">
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    accept="image/*"
                                                    className="form-control form-control-sm"
                                                    onChange={(e) => handleSubmit(e, product.codigo)}
                                                />
                                            </div>
                                            <div className="col">
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
                <Card.Footer className="pt-3 py-0">
                    <Pagination>
                        {
                            (page > 1) && <Pagination.First onClick={() => setPage(1)} />
                        }
                        {
                            (page > 1) && <Pagination.Prev onClick={() => setPage(page - 1)} />
                        }
                        <Pagination.Item>{page}</Pagination.Item>
                        {
                            (page < Math.round(dataProducts.count / 5)) && <Pagination.Next onClick={() => setPage(page + 1)} />
                        }
                        {
                            (page < Math.round(dataProducts.count / 5)) && <Pagination.Last onClick={() => setPage(Math.round(dataProducts.count / 5))} />
                        }
                    </Pagination>
                </Card.Footer>
            </div>
        </Template>
    )
}

export default Products