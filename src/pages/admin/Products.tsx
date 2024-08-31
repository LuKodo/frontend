import { useMemo, useState } from "preact/hooks"
import { Card, Col, FormLabel, FormSelect, Pagination, Row } from "react-bootstrap"
import { Template } from "./Template"
import { Productofinal } from "@/interfaces/ProductoFinal"
import { Sede } from "@/interfaces/Sede"
import ProductImage from "@/components/Admin/ProductImage"
import { SearchInputAdmin } from "@/components/Page/SearchInput"
import { useSearchParams } from "react-router-dom"

const fetchDataProducts = async (page: number, limit: number, headquarter: string, query: string): Promise<Productofinal[]> => {
    let response
    if (query !== '') {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    "limit": limit,
                    "offset": page,
                    "sede": headquarter,
                    "query": query
                }
            )
        })
    } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    "limit": limit,
                    "offset": page,
                    "sede": headquarter,
                }
            )
        })
    }
    return await response.json()
}

const Products = () => {

    let [searchParams, _setSearchParams] = useSearchParams();
    let query = searchParams.get("q");

    const [dataProducts, setDataProducts] = useState<Productofinal[]>([] as Productofinal[])
    const [reload, setReload] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, _setLimit] = useState(5)
    const [headquarter, setHeadquarter] = useState("SB")
    const [headquarters, setHeadquarters] = useState<Sede[]>([] as Sede[])

    useMemo(() => {
        const fetSedes = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/headquarters`)
            const data = await response.json()

            setHeadquarters(data)
        }
        fetSedes()
    }, [])

    const fetchData = async () => {
        setDataProducts([] as Productofinal[])
        let data
        if (query) {
            data = await fetchDataProducts(page, limit, headquarter, query)
        } else {
            data = await fetchDataProducts(page, limit, headquarter, '')
        }
        setDataProducts(data)
    }

    useMemo(() => {
        fetchData()
        if (reload) {
            setReload(false)
        }
    }, [headquarter, page, reload, query])

    const handleSubmit = async (e: Event, filename: string) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        try {
            const data = new FormData()

            if (target && target.files && target.files[0]) {
                data.append('file', target.files[0])
            }

            await fetch(`${import.meta.env.VITE_API_URL}/upload/${filename.trim()}/products`, {
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
            <Row className="mb-4">
                <Col md={{ offset: 6, span: 3 }}>
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
                <Col>
                    <FormLabel>Buscar</FormLabel>
                    <SearchInputAdmin />
                </Col>
            </Row>

            <Card>
                <Card.Header>
                    <Card.Title>Productos</Card.Title>
                </Card.Header>
                <Card.Body>
                    <table className="table table-sm">
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
                            {dataProducts.map((product) => (
                                <tr>
                                    <td>{product.codigo}</td>
                                    <td>{product.nombre}</td>
                                    <td>{product.prefijo}</td>
                                    <td><ProductImage nombre={product.codigo} reload={reload} /></td>
                                    <td>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={(e) => handleSubmit(e, product.codigo)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
                <Card.Footer>
                    <Pagination>
                        {page > 1 && <Pagination.Item onClick={() => setPage(page - 1)}>{page - 1}</Pagination.Item>}
                        <Pagination.Item active>{page}</Pagination.Item>
                        <Pagination.Item onClick={() => setPage(page + 1)}>{page + 1}</Pagination.Item>
                    </Pagination>
                </Card.Footer>
            </Card>
        </Template>
    )
}

export default Products