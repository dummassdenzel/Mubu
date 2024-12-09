import { writable } from 'svelte/store';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

function createCartStore() {
    // Check if we're in a browser environment
    const browser = typeof window !== 'undefined';
    
    // Load initial cart data from localStorage if in browser
    const storedCart = browser ? localStorage.getItem('mubu_cart') : null;
    const initialCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const { subscribe, set, update } = writable<CartItem[]>(initialCart);

    // Subscribe to changes and update localStorage if in browser
    if (browser) {
        subscribe(currentCart => {
            localStorage.setItem('mubu_cart', JSON.stringify(currentCart));
        });
    }

    return {
        subscribe,
        addToCart: (item: Omit<CartItem, 'quantity'>) => {
            update(items => {
                // Log the current state for debugging
                console.log('Current items:', items);
                console.log('Adding item:', item);

                const existingItem = items.find(i => i.id === item.id);
                
                if (existingItem) {
                    // Update quantity if item exists
                    return items.map(i => 
                        i.id === item.id 
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    );
                }
                
                // Add new item with quantity 1
                const newItem = { ...item, quantity: 1 };
                console.log('New item being added:', newItem);
                return [...items, newItem];
            });
        },
        removeFromCart: (id: number) => {
            update(items => items.filter(i => i.id !== id));
        },
        updateQuantity: (id: number, quantity: number) => {
            if (quantity <= 0) {
                // Remove item if quantity is 0 or negative
                update(items => items.filter(i => i.id !== id));
                return;
            }
            
            update(items => 
                items.map(item => 
                    item.id === id 
                        ? { ...item, quantity }
                        : item
                )
            );
        },
        clearCart: () => {
            set([]);
            if (browser) {
                localStorage.removeItem('mubu_cart');
            }
        },
        getTotal: (items: CartItem[]) => {
            return items.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    };
}

export const cart = createCartStore();