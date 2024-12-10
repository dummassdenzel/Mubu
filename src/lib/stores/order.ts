export interface OrderItem {
    id?: number;
    order_id?: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id?: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    total_amount: number;
    status: 'pending' | 'paid' | 'completed' | 'cancelled';
    created_at?: string;
    updated_at?: string;
    order_items: OrderItem[];
}

export interface PaymentProof {
    id?: number;
    order_id: number;
    file_data: File;
    uploaded_at?: string;
}