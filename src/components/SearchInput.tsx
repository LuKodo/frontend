import { FormControl,  InputGroup } from "react-bootstrap"

const fetchSedes = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/sede`)

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json()
    return data.data
}

export const SearchInput = () => {

    return (
        <InputGroup style={{ width: '50%'}}>
            <FormControl type="text" placeholder="¿Qué quieres buscar?" className="border-dark" />
            <InputGroup.Text id="basic-addon1" className="bg-white border-dark">
                <i className="bi bi-search text-dark"></i>
            </InputGroup.Text>
        </InputGroup>
    )
}