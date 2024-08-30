import { Category } from "@/interfaces/Categoria"
import { useMemo, useState } from "preact/hooks"
import { FormSelect } from "react-bootstrap"

export const SelectCategories = () => {
    const [categories, setCategories] = useState<Category[]>([] as Category[])

    useMemo(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/category`)
            const data = await response.json()

            setCategories(data)
        }
        fetchCategories()
    }, [])

    return (
        <FormSelect>
            <option value="" disabled selected>Seleccione una categoría</option>
            {categories.map((category) => (
                <option value={category.id}>{category.descripcion}</option>
            ))}
        </FormSelect>
    )
}