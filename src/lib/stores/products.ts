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
    const { subscribe: subscribeToSearch, set: setSearch } = writable<string>('');

    // DERIVED STORE FOR FILTERING PRODUCTS BY CATEGORY
    const filteredProducts = derived(
        [{ subscribe }, { subscribe: subscribeToCategoryFilter }, { subscribe: subscribeToSearch }],
        ([$products, $category, $search]) => {
            let filtered = $products;

            // Apply search filter
            if ($search) {
                const searchLower = $search.toLowerCase();
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(searchLower) ||
                    product.description.toLowerCase().includes(searchLower) ||
                    product.series.toLowerCase().includes(searchLower)
                );
            }

            // Apply category filter
            if ($category === 'All') {
                return filtered;
            }
            return filtered.filter(product => product.category === $category);
        }
    );

    return {
        subscribe: filteredProducts.subscribe,
        setCategory,
        setSearchQuery: setSearch,
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