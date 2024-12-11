import { writable } from 'svelte/store';

// Structure of Cart Item
export interface CartItem {
    id: number;
    name: string;
    price: number;
    image_url: string;
    quantity: number;
}

// Factory function to create a cart store with persistent storage
function createCartStore() {
    // Check if code is running in browser (THIS IS REQUIRED FOR LOCALSTORAGE)
    const browser = typeof window !== 'undefined';
    
    // Initialize cart from localStorage if available, otherwise empty array
    const storedCart = browser ? localStorage.getItem('mubu_cart') : null;
    const initialCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    // Create the base Svelte store with initial data
    const { subscribe, set, update } = writable<CartItem[]>(initialCart);

    // Set up automatic localStorage persistence when cart changes
    if (browser) {
        subscribe(currentCart => {
            localStorage.setItem('mubu_cart', JSON.stringify(currentCart));
        });
    }

    // Return store with custom methods for cart manipulation
    return {
        subscribe,
        
        // Add item to cart or increment quantity if it exists
        addToCart: (item: Omit<CartItem, 'quantity'>) => {
            update(items => {
                // Debug logging
                console.log('Current items:', items);
                console.log('Adding item:', item);

                // Check if item already exists in cart
                const existingItem = items.find(i => i.id === item.id);
                
                if (existingItem) {
                    // If item exists, increment its quantity
                    return items.map(i => 
                        i.id === item.id 
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    );
                }
                
                // If item is new, add it with quantity 1
                const newItem = { ...item, quantity: 1 };
                console.log('New item being added:', newItem);
                return [...items, newItem];
            });
        },

        // Remove an item completely from cart
        removeFromCart: (id: number) => {
            update(items => items.filter(i => i.id !== id));
        },

        // Update quantity of an item, remove if quantity <= 0
        updateQuantity: (id: number, quantity: number) => {
            if (quantity <= 0) {
                // Remove item if quantity is 0 or negative
                update(items => items.filter(i => i.id !== id));
                return;
            }
            
            // NOTE TO SELF: map is basically foreach, but returns a new array. It's for transforming data.
            update(items => 
                items.map(item => 
                    item.id === id 
                        ? { ...item, quantity }
                        : item
                )
            );
        },

        // Clear all items from cart and localStorage
        clearCart: () => {
            set([]);
            if (browser) {
                localStorage.removeItem('mubu_cart');
            }
        },

        // Calculate total price of all items in cart
        getTotal: (items: CartItem[]) => {
            return items.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    };
}

// Create and export the cart store instance
export const cart = createCartStore();