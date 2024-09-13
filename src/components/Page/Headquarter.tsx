import { Sede } from "@/interfaces/Sede"
import { useMemo, useState } from "react"

interface Props {
    headquarter: string,
}

export const Sedes: preact.FunctionalComponent<Props> = ({ headquarter }) => {
    const [data, setData] = useState([] as Sede[])
    useMemo(() => {
        const fetchSedes = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/headquarters`)

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json()
            setData(data)
        }
        fetchSedes()
    }, [])


    return (
        <div class="gi-location-block">
            <div class="gi-location-menu">
                <div class="gi-location-toggle">
                    <i class="bi bi-geo-alt location"></i>
                    <span class="gi-location-title d-1199 gi-location">{data.find((sede: Sede) => sede.prefijo === headquarter)?.nombre}</span>
                    <i class="fi-rr-angle-small-down d-1199 gi-angle" aria-hidden="true"></i>
                </div>
                <div class="gi-location-content">
                    <div class="gi-location-dropdown">
                        <div class="row gi-location-wrapper">
                            <ul class="loc-grid">
                                {data.map((sede: Sede) => {
                                    return (
                                        <li class="loc-list">
                                            <i class="bi bi-geo-alt"></i>
                                            <span class="gi-detail">{sede.nombre}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}