import { Component, createResource, createSignal } from "solid-js";
import { IconCategory, IconMapSearch, IconSearch, IconShoppingCart } from "@tabler/icons-solidjs";
import { SedesSM } from "../../../../components/Page/Headquarter.tsx";
import {useNavigate, useParams, useSearchParams} from "@solidjs/router";
import { useCart } from "../hooks/useCart.tsx";

interface NavBarProProps {
    openCart: Function,
    open: Function,
    openCategories: Function,
}

const NavBarPro: Component<NavBarProProps> = ({ openCart, openCategories, open }) => {
    return (
        <nav class="navbar navbar-expand-md navbar-dark sticky-top p-0">
            <div class="w-100 d-flex flex-column">
                <div class="w-100 d-flex justify-content-between p-3 align-items-center" style={{ "background-color": "#F26E22" }}>
                    <div class={"d-flex justify-content-between align-items-center gap-2 w-25"}>
                        <div class="w-25">
                            <IconCategory class={"text-white"} role={"button"} onClick={() => openCategories()} />
                        </div>

                        <a href="/" class={"img-fluid"}>
                            <img src="/logo.png" alt="Logo"
                                class="img-fluid d-none d-md-block w-75" />
                            <img src="/single.png" alt="Logo" class="img-fluid d-block d-md-none w-50" />
                        </a>
                    </div>

                    <div class="w-50 d-md-flex flex-row gap-3 align-items-center justify-content-center bg-white rounded-pill d-none">
                        <input class="rounded-pill border-0 w-100 p-3" id="search" value={search()} onInput={(e) => setSearch(e.currentTarget.value)} onKeyDown={(e) => { if (e.key === 'Enter') onSearch(search()) }} type="search" placeholder="Buscar" />
                        <IconSearch class="text-warning me-3" />
                    </div>

                    <div class="w-25 d-flex flex-row-reverse center gap-3">
                        <IconShoppingCart class="text-white" onClick={() => openCart()} role={"button"} />
                        <IconSearch class="text-white d-block d-md-none" />
                    </div>
                </div>

                <div class="d-flex justify-content-between bg-white p-3 shadow-sm">
                    <div class="w-50 d-flex flex-row start">
                        <SedesSM />
                    </div>

                    <div class="w-50 d-flex flex-row-reverse gap-2 fw-bold" onClick={() => open()}>
                        <span class="d-none d-md-block">
                            Rastrea tu pedido
                        </span>
                        <IconMapSearch class="text-warning" role={"button"} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBarPro