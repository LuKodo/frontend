import { Col, Container, Row } from "solid-bootstrap"
import { Template } from "../components/Template.tsx"
import { createMemo, createSignal } from "solid-js"
import { UnLazyImage } from "@unlazy/solid"
import PromoImage, { getDefaultImage } from "../components/PromoImage.tsx"

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

const Promotion = () => {
    const maxColumns: number = 6
    const [data, setData] = createSignal<Item[]>([])
    const [rows, setRows] = createSignal<number[]>([])
    const [reload, setReload] = createSignal(false)

    createMemo(() => {
        const fetchPromos = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/promotions`)
            const data = await response.json()

            if (data) {
                let rows: number[] = Array.from(
                    new Set(data.map((item: Item) => item.rowIndex))
                ).map(Number) || [0];
                setRows(rows)
                setData(data)
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
            await fetch(`${import.meta.env.VITE_API_URL}/promotion/delete/${id}`)
        } catch (error) {
            console.error(error)
        }
    }

    const addRow = () => {
        const newRow = {
            id: 0,
            rowIndex: rows().length === 0 ? 0 : Math.max(...rows() ?? 0) + 1,
            columnIndex: 0,
            imageName: "default",
        };
        handleSubmit({
            id: "0",
            rowIndex: rows().length === 0 ? "0" : (Math.max(...rows()) + 1).toString(),
            columnIndex: "0",
            imageName: "default",
            image: null
        })
        setData([...data(), newRow]);
    };

    const addColumn = (rowIndex: number) => {
        const columnIndex = data().filter((row) => row.rowIndex === rowIndex).length

        if (columnIndex >= maxColumns) {
            return
        }
        const item: Item = {
            id: 0,
            rowIndex,
            columnIndex,
            imageName: "default",
        };

        const newData = [...data(), item]

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
        const newData = data().filter((row) => !(row.id === id))
        setData(newData);
        deletePromotion(id)
    };

    const handleImageChange = async (item: Item, event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            const name = target.files[0].name.split('.')[0]
            const data = new FormData()

            if (target && target.files && target.files[0]) {
                data.append('userfile', target.files[0])
            }

            await fetch(`${import.meta.env.VITE_API_URL}/upload/promotions/${name.replace(/ /g, '-').replace(/[^a-zA-Z0-9\s]/g, '')}`, {
                method: 'POST',
                body: data
            })

            handleSubmit({
                id: String(item.id),
                rowIndex: (item.rowIndex).toString(),
                columnIndex: (item.columnIndex).toString(),
                imageName: name.replace(/ /g, '-').replace(/[^a-zA-Z0-9\s]/g, ''),
                image: target.files[0]
            })
        }

        setReload(true)
    };

    return (
        <Template>
            <div class="page-header">
                <h1 id="navbars">Promociones</h1>
            </div>

            <Container>
                {
                    rows().map((row: { toString: () => any }) => (
                        <Row key={row.toString()}>
                            {data().map((column: Item, columnIndex: any) => (
                                row === column.rowIndex && (
                                    <Col
                                        class="mb-4"
                                        key={columnIndex}
                                        md={data().filter((row: { rowIndex: any }) => row.rowIndex === column.rowIndex).length === 6 ? 2 : data().filter((row: { rowIndex: any }) => row.rowIndex === column.rowIndex).length === 5 ? 2 : data().filter((row: { rowIndex: any }) => row.rowIndex === column.rowIndex).length === 4 ? 3 : data().filter((row: { rowIndex: any }) => row.rowIndex === column.rowIndex).length === 3 ? 4 : data().filter((row: { rowIndex: any }) => row.rowIndex === column.rowIndex).length === 2 ? 6 : 12}
                                    >
                                        <div class="border p-4 gap-1 d-flex flex-column justify-content-center align-items-center" style={{ height: "100%", "max-height": "400px" }}>
                                            {
                                                column.imageName === 'default' ? (
                                                    <UnLazyImage
                                                        src={getDefaultImage(data().filter((row: { rowIndex: any }) => row.rowIndex === column.rowIndex).length)}
                                                        class='w-100 h-75 img-fluid'
                                                    />
                                                ) : (
                                                    <PromoImage image={column.imageName} />
                                                )
                                            }

                                            <div class="d-flex flex-column gap-2 w-50">
                                                <input
                                                    type="file"
                                                    class="form-control form-control-sm"
                                                    accept="image/*"
                                                    onChange={(event) => handleImageChange(column, event)}
                                                    id={`image-${column.rowIndex}-${column.columnIndex}`}
                                                />

                                                <button
                                                    class="btn btn-sm btn-warning"
                                                    onClick={() => addColumn(column.rowIndex)}
                                                >
                                                    <i class="bi bi-layout-sidebar-inset-reverse" /> Nueva Columna
                                                </button>

                                                <button
                                                    class="btn btn-sm btn-warning"
                                                    onClick={() => removeColumn(column.id)}
                                                >
                                                    <i class="bi bi-trash-fill" /> Eliminar Columna
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

            <Row class={"mb-3"}>
                <Col class="d-flex justify-content-center gap-2 align-items-center">
                    <button
                        class="btn btn-sm btn-warning"
                        onClick={addRow}
                    >
                        <i class="bi bi-arrow-bar-down" /> Añadir Fila
                    </button>
                </Col>
            </Row>
        </Template>
    )
}

export default Promotion