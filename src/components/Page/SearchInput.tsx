import { FormControl,  InputGroup } from "react-bootstrap"

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