export enum EstadoPedido {
    PENDIENTE = 1,
    PROCESANDO = 2,
    ENVIADO = 3,
    ENTREGADO = 4,
    CANCELADO = 5
}

export const get_human_status = (status: number): string => {
    switch (status) {
        case 1:
            return "Pendiente";
        case 2:
            return "Procesando";
        case 3:
            return "Enviado";
        case 4:
            return "Entregado";
        case 5:
            return "Cancelado";
        default:
            return "Desconocido";
    }
}