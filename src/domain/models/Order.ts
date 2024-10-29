export interface Order {
    id: string;
    userId: string;
    products: Array<{
        productId: string;
        quantity: number;
    }>;
    status: OrderStatus;
    totalAmount: number;
    createdAt: Date;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}