export interface Category {
  incremento: string
  descripcion: string
}

export interface Productofinal {
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
  horaactualizado?: Date | null; // Aunque se almacene como DateTime, puedes manejar solo la hora en la lógica de tu aplicació | nulln
}

export interface Product {
  product: Productofinal
  quantity: number
}

export interface Sede {
  prefijo: string
  nombre: string
  ip: string
  bodega: string
}