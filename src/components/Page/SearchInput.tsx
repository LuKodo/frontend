import { ChangeEvent, KeyboardEvent, createSignal } from "solidjs"
import { FormControl, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const SearchInput = () => {
    const [query, setQuery] = createSignal('')
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value
        setQuery(value)
    }

    const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(`/market/shop/all?q=${query}`, { replace: true })
        }
    }

    return (
        <div className="header-search">
            <span className="gi-search-group-form bg-white rounded-pill">
                <input className="form-control" placeholder="¿Qué quieres buscar?" type="text" value={query} onChange={handleChange} onKeyDown={handleKey} />
                <span className="search_submit" onClick={() => navigate(`/market/shop/all?q=${query}`)}><i className="bi bi-search"></i></span>
            </span>
        </div>
    )
}

export const SearchInputAdmin = () => {
    const [query, setQuery] = createSignal('')
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent) => {
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
            <FormControl type="text" placeholder="¿Qué quieres buscar?" value={query} onChange={handleChange} onKeyDown={handleKey} />
            <InputGroup.Text id="basic-addon1" className="bg-white" onClick={() => navigate(`/market/admin/products?q=${query}`)}>
                <i className="bi bi-search text-dark"></i>
            </InputGroup.Text>
        </InputGroup>
    )
}