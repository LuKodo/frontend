import { Overlay } from "react-bootstrap"
import { Sede } from "../interfaces/interfaces"
import { Fragment, useMemo, useRef, useState } from "react"



export const Sedes = ({ headquarter, setHeadquarter }: { headquarter: string, setHeadquarter: Function }) => {
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
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <Fragment>
            <div
                className="d-flex align-items-center justify-content-center p-2"
                onClick={() => setShow(!show)}
                role="button"
            >
                <i className="bi bi-geo-alt-fill text-warning fs-9" />
                <div className="d-flex flex-column">
                    <p className="text-ligth small mb-0">Estás comprando para</p>
                    <h6 className="text-warning">{data.find((sede: Sede) => sede.prefijo === headquarter)?.nombre}</h6>
                </div>
                <Overlay target={target.current} show={show} placement="top">
                    {({
                        placement: _placement,
                        arrowProps: _arrowProps,
                        show: _show,
                        popper: _popper,
                        hasDoneInitialMeasure: _hasDoneInitialMeasure,
                        ...props
                    }) => (
                        <div
                            {...props}
                            style={{
                                position: 'absolute',
                                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                padding: '2px 10px',
                                color: 'white',
                                borderRadius: 3,
                                ...props.style,
                            }}
                        >
                            Simple tooltip
                        </div>
                    )}
                </Overlay>
            </div>
        </Fragment>
    )
}