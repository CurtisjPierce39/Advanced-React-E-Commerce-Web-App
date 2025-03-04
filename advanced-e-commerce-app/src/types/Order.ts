export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
    name: string;
}

export interface Order {
    id: null | undefined;
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    createdAt: Date;
}
