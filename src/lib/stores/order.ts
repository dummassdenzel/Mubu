import { writable } from 'svelte/store';
import { api } from '$lib/services/api';
import type { CartItem } from './cart';

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
    shipping_address: string;
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

interface CheckoutFormData {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
}

function createOrderStore() {
    const { subscribe, set } = writable<Order | null>(null);

    return {
        subscribe,
        createOrder: async (formData: CheckoutFormData, cartItems: CartItem[]) => {
            try {
                const orderData = {
                    customer_name: formData.customer_name,
                    customer_email: formData.customer_email,
                    customer_phone: formData.customer_phone,
                    shipping_address: formData.shipping_address,
                    total_amount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
                    order_items: cartItems.map(item => ({
                        product_id: item.id,
                        product_name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                };

                const response = await api.post('orders', orderData);
                
                if (response.status.remarks === "success") {
                    set(response.payload);
                    return response.payload;
                }
            } catch (error) {
                console.error('Detailed error:', error);
                throw error;
            }
        },

        uploadPaymentProof: async (orderId: number, file: File) => {
            try {
                const formData = new FormData();
                formData.append('order_id', orderId.toString());
                formData.append('payment_proof', file);

                const response = await api.postFormData('payment-proof', formData);
                
                if (response.status.remarks === "success") {
                    return response.payload;
                }
                
                throw new Error(response.status?.message || 'Failed to upload payment proof');
            } catch (error) {
                console.error('Error uploading payment proof:', error);
                throw error;
            }
        },

        getOrder: async (orderId: number) => {
            try {
                const response = await api.get(`orders/${orderId}`);
                
                if (response.status.remarks === "success") {
                    set(response.payload);
                    return response.payload;
                }
                
                throw new Error(response.status?.message || 'Failed to fetch order');
            } catch (error) {
                console.error('Error fetching order:', error);
                throw error;
            }
        },

        clearOrder: () => {
            set(null);
        }
    };
}

export const order = createOrderStore();