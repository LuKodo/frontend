import { Offcanvas } from "solid-bootstrap"
import {Component, createMemo, createSignal} from "solid-js"
import {Category} from "../../../../../admin/domain/entities/Categoria.ts";
import {A, useSearchParams} from "@solidjs/router";

interface OffcanvasCategoryProps {
    show: Function
    handleClose: Function
}

export const OffcanvasCategory: Component<OffcanvasCategoryProps> = ({ handleClose, show }) => {
    const [categories, setCategories] = createSignal([] as Category[])
    const [searchParams] = useSearchParams();
    const [search] = createSignal(searchParams.q ?? '');

    createMemo(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categories_admin/1`)

            return await response.json()
        }
        fetchCategories()
            .then(response =>
                setCategories(response)
            )
    })

    return (
        <Offcanvas show={show()} onHide={handleClose()}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Categorías</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {categories().map((slide) => (
                    <div
                        class="position-relative d-flex flex-nowrap align-items-start p-1 m-1 rounded" role="button"
                    >
                        <A
                            href={`/search/${slide.descripcion}${(search() !== '' && search()) && '?q=' + search()}`}
                            class="fw-bold text-decoration-none"
                            style={{color: 'rgb(157, 157, 157)'}}
                        >
                            {slide.descripcion}
                        </A>
                    </div>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    )
}