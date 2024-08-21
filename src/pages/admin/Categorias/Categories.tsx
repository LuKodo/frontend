import { useMemo, useState } from "preact/hooks"
import { Category } from "../../../interfaces/interfaces"

export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([] as Category[])

    useMemo(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categoria`)
            const data = await response.json()

            setCategories(data)
        }
        fetchCategories()
    }, [])

    return (
        <div>
            {
                categories.map((category) => (
                    <>{category.descripcion}</>
                ))
            }
        </div>
    )
}