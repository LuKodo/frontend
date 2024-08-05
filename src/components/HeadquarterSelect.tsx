import { useMemo, useState } from "preact/hooks"
import { FormSelect } from "react-bootstrap"
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
        <FormSelect name="sede" className="border-0 p-0 m-0" value={headquarter} onChange={(e) => setHeadquarter(e.target?.value ?? 'SB')}>
            {headquarters.map((sede: Sede) => {
                return (
                    <option key={sede.prefijo} value={sede.prefijo}>{sede.nombre}</option>
                )
            })}
        </FormSelect>
    )
}