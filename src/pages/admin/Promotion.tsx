import { useMemo, useState } from "preact/hooks"
import { Col, Container, Row } from "react-bootstrap"
import { Template } from "./Template"
import PromoImage, { getDefaultImage } from "@components/Admin/PromoImage"

interface Item {
    id: number
    rowIndex: number
    columnIndex: number
    imageName: string
}

interface ItemFormData {
    id: string
    rowIndex: string
    columnIndex: string
    imageName: string
    image: null | File
}

export const Promotion = () => {
    const maxColumns: number = 6
    const [data, setData] = useState<Item[]>([])
    const [rows, setRows] = useState<number[]>([])
    const [reload, setReload] = useState(false)

    useMemo(() => {
        const fetchPromos = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/promotion`, {
                method: 'POST',
                body: JSON.stringify({
                    "limit": 1000,
                    "offset": 1
                })
            })
            const data = await response.json()

            if (data && data.results) {
                setRows(Array.from(new Set(data.results.map((item: Item) => item.rowIndex))))
                setData(data.results)
                setReload(false)
            }
        }
        fetchPromos()
    }, [reload])

    const handleSubmit = async (formData: ItemFormData) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/promotion/upsert`, {
                method: 'POST',
                body: JSON.stringify({
                    "id": formData.id,
                    "rowIndex": formData.rowIndex,
                    "columnIndex": formData.columnIndex,
                    "imageName": formData.imageName
                }),
            })

            setReload(true)
        } catch (error) {
            console.error(error)
        }
    }

    const deletePromotion = async (id: number) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/promotion/delete/${id}`).then(res => res.json()).then(res => console.log(res))
        } catch (error) {
            console.error(error)
        }
    }

    const addRow = () => {
        const newRow = {
            id: 0,
            rowIndex: rows.length === 0 ? 0 : Math.max(...rows) + 1,
            columnIndex: 0,
            imageName: "default",
        };
        handleSubmit({
            id: "0",
            rowIndex: rows.length === 0 ? "0" : (Math.max(...rows) + 1).toString(),
            columnIndex: "0",
            imageName: "default",
            image: null
        })
        setData([...data, newRow]);
    };

    const addColumn = (rowIndex: number) => {
        const columnIndex = data.filter((row) => row.rowIndex === rowIndex).length

        if (columnIndex >= maxColumns) {
            return
        }
        const item: Item = {
            id: 0,
            rowIndex,
            columnIndex,
            imageName: "default",
        };

        const newData = [...data, item]

        setData(newData);
        handleSubmit({
            id: "0",
            rowIndex: rowIndex.toString(),
            columnIndex: columnIndex.toString(),
            imageName: "default",
            image: null,
        });
    };

    const removeColumn = (id: number) => {
        const newData = data.filter((row) => !(row.id === id))
        setData(newData);
        deletePromotion(id)
    };

    const handleImageChange = async (item: Item, event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            const name = target.files[0].name
            const data = new FormData()

            if (target && target.files && target.files[0]) {
                data.append('file', target.files[0])
            }

            await fetch(`${import.meta.env.VITE_API_URL}/upload/${name.trim()}/promotion`, {
                method: 'POST',
                body: data
            })

            handleSubmit({
                id: String(item.id),
                rowIndex: (item.rowIndex).toString(),
                columnIndex: (item.columnIndex).toString(),
                imageName: name,
                image: target.files[0]
            })
        }

        setReload(true)
    };

    return (
        <Template>
            <Container>
                {
                    rows.map((row) => (
                        <Row key={row.toString()}>
                            {data.map((column, columnIndex) => (
                                row === column.rowIndex && (
                                    <Col
                                        className="mb-4"
                                        key={columnIndex}
                                        md={data.filter((row) => row.rowIndex === column.rowIndex).length === 6 ? 2 : data.filter((row) => row.rowIndex === column.rowIndex).length === 5 ? 2 : data.filter((row) => row.rowIndex === column.rowIndex).length === 4 ? 3 : data.filter((row) => row.rowIndex === column.rowIndex).length === 3 ? 4 : data.filter((row) => row.rowIndex === column.rowIndex).length === 2 ? 6 : 12}
                                    >
                                        <div className="border p-4 gap-1 d-flex flex-column justify-content-center align-items-center" style={{ height: "100%", maxHeight: "400px" }}>
                                            {
                                                column.imageName === 'default' ? (
                                                    <img
                                                        src={getDefaultImage(data.filter((row) => row.rowIndex === column.rowIndex).length)}
                                                        alt=""
                                                        srcset=""
                                                        className='w-100 h-75 img-fluid'
                                                    />
                                                ) : (
                                                    <PromoImage image={column.imageName} />
                                                )
                                            }

                                            <div className="d-flex flex-column gap-2 w-50">
                                                <input
                                                    type="file"
                                                    className="form-control form-control-sm bg-warning text-white"
                                                    accept="image/*"
                                                    onChange={(event) => handleImageChange(column, event)}
                                                    id={`image-${column.rowIndex}-${column.columnIndex}`}
                                                />

                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => addColumn(column.rowIndex)}
                                                >
                                                    <i className="bi bi-layout-sidebar-inset-reverse" /> Nueva Columna
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => removeColumn(column.id)}
                                                >
                                                    <i className="bi bi-trash-fill" /> Eliminar Columna
                                                </button>
                                            </div>

                                        </div>
                                    </Col>
                                )
                            ))}
                        </Row>
                    ))
                }
            </Container>

            <Row className={"mb-3"}>
                <Col className="d-flex justify-content-center gap-2 align-items-center">
                    <button
                        className="btn btn-sm btn-warning"
                        onClick={addRow}
                    >
                        <i className="bi bi-arrow-bar-down" /> Añadir Fila
                    </button>
                </Col>
            </Row>
        </Template>
    )
}