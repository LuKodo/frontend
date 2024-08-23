import { useMemo, useState } from "preact/hooks"
import { Col, Row } from "react-bootstrap"
import { Template } from "./Template"
import PromoImage from "@/components/Admin/PromoImage"

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/promotion/1/100000`)
            const data = await response.json()
            setRows(Array.from(new Set(data.results.map((item: Item) => item.rowIndex))))
            setData(data.results)
            setReload(false)
        }
        fetchPromos()
    }, [reload])

    const handleSubmit = async (formData: ItemFormData) => {
        try {
            const data = new FormData()
            data.append('id', formData.id)
            data.append('rowIndex', formData.rowIndex)
            data.append('columnIndex', formData.columnIndex)
            data.append('imageName', formData.imageName)

            if (formData.image) {
                data.append('image', formData.image)
            }

            await fetch(`${import.meta.env.VITE_API_URL}/promotion`, {
                method: 'POST',
                body: data,
            }).then(res => res.json()).then(res => console.log(res))
        } catch (error) {
            console.error(error)
        }
    }

    const deletePromotion = async (formData: ItemFormData) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/promotion/delete/${formData.rowIndex}/${formData.columnIndex}`).then(res => res.json()).then(res => console.log(res))
        } catch (error) {
            console.error(error)
        }
    }

    const addRow = () => {
        const newRow = {
            id: 0,
            rowIndex: Math.max(...rows)+1,
            columnIndex: 0,
            imageName: "default",
        };
        handleSubmit({
            id: "0",
            rowIndex: (Math.max(...rows)+1).toString(),
            columnIndex: "0",
            imageName: "default",
            image: null
        })
        setData([...data, newRow]);
        setReload(true)
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

    const removeColumn = (rowIndex: number, colIndex: number) => {
        const newData = data.filter((row) => !(row.rowIndex === rowIndex && row.columnIndex === colIndex))
        setData(newData);
        deletePromotion({
            id: "0",
            rowIndex: (rowIndex).toString(),
            columnIndex: (colIndex).toString(),
            imageName: "default",
            image: null
        })
    };

    const handleImageChange = (rowIndex: number, colIndex: number, event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            const name = target.files[0].name
            handleSubmit({
                id: "0",
                rowIndex: (rowIndex).toString(),
                columnIndex: (colIndex).toString(),
                imageName: name,
                image: target.files[0]
            })
        }

        setReload(true)
    };

    return (
        <Template>
            {
                rows.map((row) => (
                    <Row className={"mb-3"} key={row.toString()}>
                        {data.map((column, columnIndex) => (
                            row === column.rowIndex && (
                                <Col key={columnIndex} md={data.filter((row) => row.rowIndex === column.rowIndex).length === 6 ? 2 : data.filter((row) => row.rowIndex === column.rowIndex).length === 5 ? 2 : data.filter((row) => row.rowIndex === column.rowIndex).length === 4 ? 3 : data.filter((row) => row.rowIndex === column.rowIndex).length === 3 ? 4 : data.filter((row) => row.rowIndex === column.rowIndex).length === 2 ? 6 : 12}>
                                    <div className="border p-4 gap-1 d-flex flex-column justify-content-center align-items-center" style={{ height: "100%", maxHeight: "400px" }}>
                                        <PromoImage image={column.imageName} />

                                        <div className="d-flex gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => handleImageChange(column.rowIndex, column.columnIndex, event)}
                                                id={`image-${column.rowIndex}-${column.columnIndex}`}
                                            />

                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => addColumn(column.rowIndex)}
                                            >
                                                <i className="bi bi-layout-sidebar-inset-reverse" />
                                            </button>

                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => removeColumn(column.rowIndex, column.columnIndex)}
                                            >
                                                <i className="bi bi-trash-fill" />
                                            </button>
                                        </div>

                                    </div>
                                </Col>
                            )
                        ))}
                    </Row>
                ))
            }
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