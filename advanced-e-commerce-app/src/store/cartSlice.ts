import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartService';
import { Product } from './productService';

interface CartState {
    items: CartItem[];
    isLoading: boolean;
    error: string | null;

}const loadCartFromStorage = (): CartItem[] => {
    const storedCart = sessionStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { items: [] };
};

const initialState: CartState = {
    items: loadCartFromStorage(),
    isLoading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.productId === action.payload.productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...action.payload, quantity: 1,
                    product: ''
                });
            }
            sessionStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.productId !== action.payload);
            sessionStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const item = state.items.find(item => item.productId === action.payload.productId);
            if (item) {
                item.quantity = action.payload.quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.productId !== action.payload.productId);
                }
            }
            sessionStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            sessionStorage.removeItem('cart');
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setLoading,
    setError
} = cartSlice.actions;

// Selector to get cart items
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartItemsCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;