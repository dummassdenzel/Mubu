import { writable, derived } from 'svelte/store';
import { api } from '$lib/services/api';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    series: string;
    size: string;
    material: string;
    stock: number;
    created_at?: string;
    updated_at?: string;
}

function createProductStore() {
    const { subscribe, set, update } = writable<Product[]>([]);
    const { subscribe: subscribeToCategoryFilter, set: setCategory } = writable<string>('All');

    // DERIVED STORE FOR FILTERING PRODUCTS BY CATEGORY
    const filteredProducts = derived(
        [{ subscribe }, { subscribe: subscribeToCategoryFilter }],
        ([$products, $category]) => {
            if ($category === 'All') {
                return $products;
            }
            return $products.filter(product => product.category === $category);
        }
    );

    return {
        subscribe: filteredProducts.subscribe,
        setCategory,
        fetchProducts: async () => {
            try {
                const response = await api.get('products');
                if (response.payload) {
                    set(response.payload);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
        }
    };
}

export const products = createProductStore();