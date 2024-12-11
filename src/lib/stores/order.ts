import { writable } from 'svelte/store';
import { api } from '$lib/services/api';
import type { CartItem } from './cart';

// NOTE TO SELF: Primary keys are not required in the interfaces.


// Define structure for individual items within an order
export interface OrderItem {
    product_id: number;         
    product_name: string;       
    quantity: number;           
    price: number;              
}

// Define structure for a complete order
export interface Order {
    customer_name: string;      
    customer_email: string;    
    customer_phone: string;     
    shipping_address: string;  
    total_amount: number;      
    // status: 'pending' | 'paid' | 'completed' | 'cancelled';
    created_at?: string;        
    updated_at?: string;        
    order_items: OrderItem[];   
}

// Define structure for payment proof uploads
export interface PaymentProof {
    order_id: number;           
    file_data: File;           
    uploaded_at?: string;      
}

// Define structure for checkout form data
interface CheckoutFormData {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
}

// Factory function to create an order store with associated methods
function createOrderStore() {
    // Create base Svelte store for order data
    const { subscribe, set } = writable<Order | null>(null);

    // Return store with custom methods for order management
    return {
        subscribe,

        // Create a new order from checkout form and cart items
        createOrder: async (formData: CheckoutFormData, cartItems: CartItem[]) => {
            try {
                // Prepare order data by combining form data and cart items
                const orderData = {
                    customer_name: formData.customer_name,
                    customer_email: formData.customer_email,
                    customer_phone: formData.customer_phone,
                    shipping_address: formData.shipping_address,
                    // Calculate total amount from cart items
                    total_amount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
                    // Transform cart items into order items
                    order_items: cartItems.map(item => ({
                        product_id: item.id,
                        product_name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                };

                // Send order to backend
                const response = await api.post('orders', orderData);
                
                if (response.status.remarks === "success") {
                    set(response.payload);  // Update store with new order with set
                    return response.payload;
                }
            } catch (error) {
                console.error('Detailed error:', error);
                throw error;
            }
        },

        // Upload payment proof for an order
        uploadPaymentProof: async (orderId: number, file: File) => {
            try {
                // Create FormData for file upload
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

        // Fetch an existing order by ID
        getOrder: async (orderId: number) => {
            try {
                const response = await api.get(`orders/${orderId}`);
                
                if (response.status.remarks === "success") {
                    set(response.payload);  // Update store with fetched order
                    return response.payload;
                }
                
                throw new Error(response.status?.message || 'Failed to fetch order');
            } catch (error) {
                console.error('Error fetching order:', error);
                throw error;
            }
        },

        // Clear the current order from store
        clearOrder: () => {
            set(null);
        },

        // Get receipt for an order
        async getReceipt(orderId: number) {
            try {
                const response = await api.get(`receipt/${orderId}`);
                if (response.status === "failed") {
                    throw new Error(response.message);
                }
                return response.payload;
            } catch (error) {
                console.error('Error getting receipt:', error);
                throw error;
            }
        }
    };
}

// Create and export the order store instance
export const order = createOrderStore();