import { useMemo, useState } from "preact/hooks"
import { FormControl, FormSelect, InputGroup } from "react-bootstrap"
import { Sede } from "../interfaces/interfaces"

export const HeadquarterSelect = ({ headquarter, setHeadquarter }: { headquarter: string, setHeadquarter: Function }) => {
    const [headquarters, setHeadquarters] = useState([] as Sede[])
    const getHeadquarters = async () => {
        const response = await fetch('/api/sede')
        const data = await response.json()
        setHeadquarters(data)
    }
    useMemo(() => getHeadquarters(), [])

    return (
        <InputGroup>
            <InputGroup.Text id="basic-addon1" className="bg-warning border-0">
                <FormSelect
                    name="sede"
                    className="border-0 p-0 text-white bg-transparent"
                    value={headquarter}
                    onChange={(e) => {
                        const target = e.target as HTMLSelectElement
                        setHeadquarter(target.value ?? 'SB')
                    }}
                >
                    {headquarters.map((sede: Sede) => {
                        return (
                            <option key={sede.prefijo} className={"bg-warning text-white"} value={sede.prefijo}>{sede.nombre}</option>
                        )
                    })}
                </FormSelect>
            </InputGroup.Text>
            <FormControl type="text" placeholder="¿Qué quieres buscar?" className="bg-white border-0" />
            <InputGroup.Text id="basic-addon1" className="bg-warning border-0">
                <i className="bi bi-search text-white"></i>
            </InputGroup.Text>
        </InputGroup>
    )
}