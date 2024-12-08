import { createSignal } from "solid-js"
import { FormControl, InputGroup } from "solid-bootstrap"
import { useNavigate } from "@solidjs/router"

export const SearchInput = () => {
    const [query, setQuery] = createSignal('')
    const navigate = useNavigate()

    const handleChange = (e: { target: HTMLInputElement }) => {
        const value = (e.target as HTMLInputElement).value
        setQuery(value)
    }

    const handleKey = (e: { key: string }) => {
        if (e.key === 'Enter') {
            navigate(`/search/all?q=${query()}`, { replace: true })
        }
    }

    return (
        <div class="header-search">
            <span class="gi-search-group-form bg-white rounded-pill">
                <input class="form-control" placeholder="¿Qué quieres buscar?" type="text" value={query()} onChange={handleChange} onKeyDown={handleKey} />
                <span class="search_submit" onClick={() => navigate(`/search/all?q=${query()}`)}><i class="bi bi-search"></i></span>
            </span>
        </div>
    )
}

export const SearchInputAdmin = () => {
    const [query, setQuery] = createSignal('')
    const navigate = useNavigate()

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
            <FormControl type="text" placeholder="¿Qué quieres buscar?" value={query()} onChange={handleChange} onKeyDown={handleKey} />
            <InputGroup.Text id="basic-addon1" class="bg-white" onClick={() => navigate(`/admin/products?q=${query}`)}>
                <i class="bi bi-search text-dark"></i>
            </InputGroup.Text>
        </InputGroup>
    )
}