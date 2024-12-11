import { writable, derived } from 'svelte/store';
import { api } from '$lib/services/api';

// Define structure for product data
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

// Factory function to create a product store with filtering capabilities
function createProductStore() {
    // CREATE THREE BASE SVELTE STORES:
    // 1. Main store for products array
    // 2. Store for category filter
    // 3. Store for search query filter
    const { subscribe, set, update } = writable<Product[]>([]);
    const { subscribe: subscribeToCategoryFilter, set: setCategory } = writable<string>('All');
    const { subscribe: subscribeToSearch, set: setSearch } = writable<string>('');

    // Create a derived store that combines the three stores above
    // to filter products based on category and search query
    const filteredProducts = derived(
        [{ subscribe }, { subscribe: subscribeToCategoryFilter }, { subscribe: subscribeToSearch }],
        ([$products, $category, $search]) => {
            let filtered = $products;

            // First apply search filter if search query exists
            if ($search) {
                const searchLower = $search.toLowerCase();
                filtered = filtered.filter(product => 
                    // Search in name, description, and series
                    product.name.toLowerCase().includes(searchLower) ||
                    product.description.toLowerCase().includes(searchLower) ||
                    product.series.toLowerCase().includes(searchLower)
                );
            }

            // Then apply category filter if not set to 'All'
            if ($category === 'All') {
                return filtered;
            }
            return filtered.filter(product => product.category === $category);
        }
    );

    // Return store with custom methods for product management
    return {
        subscribe: filteredProducts.subscribe,  // Expose the filtered products
        setCategory,                           // Method to set category filter
        setSearchQuery: setSearch,             // Method to set search query
        
        // Fetch products from API
        fetchProducts: async () => {
            try {
                const response = await api.get('products');
                if (response.payload) {
                    set(response.payload);  // Update store with fetched products
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
        }
    };
}

// Create and export the products store instance
export const products = createProductStore();