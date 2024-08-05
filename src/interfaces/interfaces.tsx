export interface Category {
  codigo: string
  prefijo: string
  categoria: string
}

export interface Productofinal {
  codigo: string;
  prefijo: string;
  fecharegistro: Date;
  nombre: string;
  marca: string;
  presentacion: string;
  preciocomprasiniva: number;
  preciocompraconiva: number;
  precioventageneral: number;
  precioventapormayor: number;
  precioventacredito: number;
  nuevo: number;
  usado: number;
  alertamin: number;
  alertamax: number;
  tarifaimpuestocompra: string;
  tarifaimpuestoventa: string;
  categoria: string;
  porcentajeutilidadgeneral: number;
  porcentajeutilidadmayor: number;
  porcentajeutilidadcredito: number;
  fechaultimacompra: Date;
  fechaultimaventa: Date;
  estadoprogramaciondesc: string;
  programaciondescinicio: Date;
  programaciondescfin: Date;
  porcentajedesc: number;
  estado: string;
  ruta: string;
  reciboentrega: string;
  entregabodega: string;
  proveedor1: string;
  proveedor2: string;
  proveedor3: string;
  fechaactualizado: Date;
  horaactualizado: Date; // Aunque se almacene como DateTime, puedes manejar solo la hora en la lógica de tu aplicación
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