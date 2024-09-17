import { useState } from "preact/hooks"
import { FormControl, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const SearchInput = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleChange = (e: Event) => {
        const value = (e.target as HTMLInputElement).value
        setQuery(value)
    }

    const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(`/market/shop/all?q=${query}`, { replace: true })
        }
    }

    return (
        <div class="header-search">
            <span class="gi-search-group-form" action="#">
                <input class="form-control" placeholder="¿Qué quieres buscar?" type="text" value={query} onChange={handleChange} onKeyDown={handleKey} />
                <span class="search_submit" type="button" onClick={() => navigate(`/market/shop/all?q=${query}`)}><i class="bi bi-search"></i></span>
            </span>
        </div>
    )
}

export const SearchInputAdmin = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleChange = (e: Event) => {
        const value = (e.target as HTMLInputElement).value
        setQuery(value)
    }

    const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(`/market/admin/products?q=${query}`)
        }
    }

    return (
        <InputGroup>
            <FormControl type="text" placeholder="¿Qué quieres buscar?" value={query} onChange={handleChange} onKeyDown={handleKey} className="border-dark" />
            <InputGroup.Text id="basic-addon1" className="bg-white border-dark" onClick={() => navigate(`/market/admin/products?q=${query}`)}>
                <i className="bi bi-search text-dark"></i>
            </InputGroup.Text>
        </InputGroup>
    )
}