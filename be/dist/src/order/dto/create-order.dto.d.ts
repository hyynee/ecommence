export declare class OrderItemDTO {
    productId: string;
    name: string;
    image: string;
    price: number;
    size?: string;
    color?: string;
    quantity?: number;
}
export declare class ShippingAddressDTO {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}
export declare class OrderDTO {
    userId: string;
    items: OrderItemDTO[];
    shippingAddress: ShippingAddressDTO;
    paymentMethod: string;
    totalPrice: number;
    isPaid?: boolean;
    paidAt?: Date;
    isDelivery?: boolean;
    deliveredAt?: Date;
    paymentStatus?: string;
    status?: string;
}
export declare class CreateOrderDTO {
    userId: string;
    items: OrderItemDTO[];
    shippingAddress: ShippingAddressDTO;
    paymentMethod: string;
    totalPrice: number;
}
