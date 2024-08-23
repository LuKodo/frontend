import { useMemo, useState } from "preact/hooks"
import { Category } from "@/interfaces/Categoria"
import { Card } from "react-bootstrap"
import { Template } from "./Template"

interface result {
    results: Category[]
    total: number
    totalPages: number
}

export const Carousel = () => {
    const [categories, setCategories] = useState<result>({} as result)
    const [page, setPage] = useState(1)
    const [limit, _setLimit] = useState(10)

    useMemo(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categoria/${page}/${limit}`)
            const data = await response.json()

            setCategories(data)
        }
        fetchCategories()
    }, [page, limit])

    return (
        <Template>
            <Card>
                a
            </Card>
        </Template>
    )
}