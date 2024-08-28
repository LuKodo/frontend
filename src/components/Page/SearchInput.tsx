import { useState } from "preact/hooks"
import { FormControl, InputGroup } from "react-bootstrap"
import { useLocation } from "wouter"

export const SearchInput = () => {
    const [query, setQuery] = useState('')
    const [, navigate] = useLocation()

    const handleChange = (e: Event) => {
        const value = (e.target as HTMLInputElement).value
        setQuery(value)
    }

    const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(`/shop/all?q=${query}`)
        }
    }

    return (
        <InputGroup style={{ width: '50%' }}>
            <FormControl type="text" placeholder="¿Qué quieres buscar?" value={query} onChange={handleChange} onKeyDown={handleKey} className="border-dark" />
            <InputGroup.Text id="basic-addon1" className="bg-white border-dark" onClick={() => navigate(`/shop/all?q=${query}`)}>
                <i className="bi bi-search text-dark"></i>
            </InputGroup.Text>
        </InputGroup>
    )
}

export const SearchInputAdmin = () => {
    const [query, setQuery] = useState('')
    const [, navigate] = useLocation()

    const handleChange = (e: Event) => {
        const value = (e.target as HTMLInputElement).value
        setQuery(value)
    }

    const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(`/admin/products?q=${query}`)
        }
    }

    return (
        <InputGroup>
            <FormControl type="text" placeholder="¿Qué quieres buscar?" value={query} onChange={handleChange} onKeyDown={handleKey} className="border-dark" />
            <InputGroup.Text id="basic-addon1" className="bg-white border-dark" onClick={() => navigate(`/admin/products?q=${query}`)}>
                <i className="bi bi-search text-dark"></i>
            </InputGroup.Text>
        </InputGroup>
    )
}