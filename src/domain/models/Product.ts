export interface Product {
    codigo: string;
    prefijo: string;
    fecharegistro?: Date | null;
    nombre?: string | null;
    marca?: string | null;
    presentacion?: string | null;
    preciocomprasiniva?: number | null;
    preciocompraconiva?: number | null;
    precioventageneral?: number | null;
    precioventapormayor?: number | null;
    precioventacredito?: number | null;
    nuevo?: number | null;
    usado?: number | null;
    alertamin?: number | null;
    alertamax?: number | null;
    tarifaimpuestocompra?: string | null;
    tarifaimpuestoventa?: string | null;
    categoria?: string | null;
    porcentajeutilidadgeneral?: number | null;
    porcentajeutilidadmayor?: number | null;
    porcentajeutilidadcredito?: number | null;
    fechaultimacompra?: Date | null;
    fechaultimaventa?: Date | null;
    estadoprogramaciondesc?: string | null;
    programaciondescinicio?: Date | null;
    programaciondescfin?: Date | null;
    porcentajedesc?: number | null;
    estado?: string | null;
    ruta?: string | null;
    reciboentrega?: string | null;
    entregabodega?: string | null;
    proveedor1?: string | null;
    proveedor2?: string | null;
    proveedor3?: string | null;
    fechaactualizado?: Date | null;
    horaactualizado?: Date | null;
    paginapromo?: string | null;
    libre1?: string | null;
    libre2?: string | null;
    libre3?: string | null;
}

export interface Products {
    product: Product
    quantity: number
}