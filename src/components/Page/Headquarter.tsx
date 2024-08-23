import { Button } from "react-bootstrap"
import { Sede } from "@/interfaces/Sede"
import { useMemo, useState } from "react"

interface Props {
    headquarter: string,
    setHeadquarterShow: Function
}

export const Sedes: preact.FunctionalComponent<Props> = ({ headquarter, setHeadquarterShow }) => {
    const [data, setData] = useState([] as Sede[])
    useMemo(() => {
        const fetchSedes = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/sede`)

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json()
            setData(data)
        }
        fetchSedes()
    }, [])

    const [show, setShow] = useState(true);

    return (
        <div className="position-relative">
            <div
                className="d-flex align-items-center justify-content-center p-2"
                onClick={() => setShow(!show)}
                role="button"
            >
                <i className="bi bi-geo-alt-fill text-warning fs-9" />
                <div className="d-flex flex-column" >
                    <p className="text-ligth small mb-0">Estás comprando para</p>
                    <h6 className="text-warning">{data.find((sede: Sede) => sede.prefijo === headquarter)?.nombre}</h6>
                </div>
            </div>

            <div className={`position-absolute bg-white p-3 ${show ? 'd-block' : 'd-none'}`} style={{ width: '300px', lineHeight: '20px', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.3))' }}>
                <div>
                    <p className="fw-bold">¿Vas a comprar en {data.find((sede: Sede) => sede.prefijo === headquarter)?.nombre}?</p>
                    <p>Los productos que te mostraremos son los disponibles para esta sede.</p>
                    <div className="d-flex gap-2">
                        <Button variant="outline-warning" className="rounded-2 w-100" size="sm" onClick={() => setShow(false)}>Mantenerse aquí</Button>
                        <Button variant="warning" className="rounded-2 w-100" size="sm" onClick={() => { setHeadquarterShow(true); setShow(false) }}>Cambiar de Sede</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}