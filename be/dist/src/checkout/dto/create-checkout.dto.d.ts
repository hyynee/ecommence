export declare class CheckoutItemDTO {
    productId: string;
    name: string;
    image: string;
    price: number;
}
export declare class ShippingAddressDTO {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}
export declare class CheckoutDTO {
    userId: string;
    checkoutItems: CheckoutItemDTO[];
    shippingAddress: ShippingAddressDTO;
    paymentMethod: string;
    totalPrice: number;
    isPaid?: boolean;
    paidAt?: Date;
    paymentStatus?: string;
    paymentDetails?: any;
    isFinallized?: boolean;
    finallizedAt?: Date;
}
export declare class CreateCheckoutDTO {
    userId: string;
    checkoutItems: CheckoutItemDTO[];
    shippingAddress: ShippingAddressDTO;
    paymentMethod: string;
    totalPrice: number;
}
