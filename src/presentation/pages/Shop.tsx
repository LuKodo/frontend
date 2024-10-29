import {Fragment, Key, useMemo, useState} from "react";
import {Container, Row} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import {Product as ProductModel} from "../../domain/models/Product.ts";
import {Product} from "../components/Product.tsx";

export const Shop = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const query = searchParams.get("q");
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState<{result: ProductModel[], count: number}>({} as {result: ProductModel[], count: number})

    useMemo(() => {
        const fetchProductos = async () => {
            let response
            if (query) {
                response = await fetch(`${import.meta.env.VITE_API_URL}/products_admin`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            "limit": 20,
                            "offset": page,
                            "categoria": category,
                            "sede": "SB",
                            "paginapromo": "SI",
                            "query": query
                        }
                    )
                })
            } else {
                response = await fetch(`${import.meta.env.VITE_API_URL}/products_admin`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            "limit": 20,
                            "offset": page,
                            "categoria": category,
                            "sede": "SB",
                            "paginapromo": "SI",
                        }
                    )
                })
            }

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json()
            setProducts(data)
        }
        fetchProductos()
    }, [page, category, query])

    return (
        <Fragment>
            <div className="mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                                    <li className="breadcrumb-item"><a href="#!">Shop</a></li>
                                    {
                                        query !== 'all' && (
                                            <li className="breadcrumb-item active" aria-current="page">{query}
                                            </li>
                                        )
                                    }
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"mt-8 mb-lg-14 mb-8"}>
                <Container>
                    <Row className="gx-10">
                        <aside className={"col-lg-3 col-md-4 mb-6 mb-md-0"}>

                        </aside>
                        <section className="col-lg-9 col-md-12">
                            <div className="card mb-4 bg-light border-0">
                                <div className="card-body p-9">
                                    <h2 className="mb-0 fs-1">{category}</h2>
                                </div>
                            </div>
                            <div className={"row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2"}>
                                {products.result && products.result.length === 0 ?
                                    <div className="text-center">No hay resultados</div>
                                    :
                                    products.result && products.result.map((
                                        product: ProductModel, index: Key | null | undefined) =>
                                        (
                                            <div
                                                className="col"
                                                key={index}>
                                                <Product key={index} product={product}/>
                                            </div>
                                        ))}
                            </div>
                            <div className="row mt-8">
                                <div className="col">
                                    <nav>
                                        <ul className="pagination">
                                            <li className="page-item disabled">
                                                <a className="page-link mx-1" href="#" aria-label="Previous">
                                                    <i className="feather-icon icon-chevron-left"></i>
                                                </a>
                                            </li>
                                            <li className="page-item"><a className="page-link mx-1 active"
                                                                         href="#">1</a></li>
                                            <li className="page-item"><a className="page-link mx-1" href="#">2</a></li>

                                            <li className="page-item"><a className="page-link mx-1" href="#">...</a>
                                            </li>
                                            <li className="page-item"><a className="page-link mx-1" href="#">12</a></li>
                                            <li className="page-item">
                                                <a className="page-link mx-1" href="#" aria-label="Next">
                                                    <i className="feather-icon icon-chevron-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </section>
                    </Row>
                </Container>
            </div>
            <section className="mt-8">
                <Container>
                    <Row>

                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}