import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
//used for creating Redux reducers and actions
//TypeScript type for action payloads in Redux
import { CartItem, Product } from '../types';//imports type interfaces

interface CartState { //interface for CartState with an array of "CartItem"s
    items: CartItem[];
}

const loadCartFromSession = (): CartState => { //retrieves saved cart data
    const savedCart = sessionStorage.getItem('cart'); //Cart state persists across page refreshes
    return savedCart ? JSON.parse(savedCart) : { items: [] }; //cleans up storage when cart is cleared
};

const initialState: CartState = loadCartFromSession();//calls "loadCartFromSession" function

const cartSlice = createSlice({
    name: 'cart',
    initialState,//initializes state from session storage
    reducers: {
        //adds items to cart
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1; //if item exists in cart, increase quantity by 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); 
                //if item doesn't exist in cart, push item data
            }
            sessionStorage.setItem('cart', JSON.stringify(state));//update session storage
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            //filters out item by ID
            sessionStorage.setItem('cart', JSON.stringify(state));//update session storage
        },
        clearCart: (state) => {
            state.items = [];//replaces cart state with empty array
            sessionStorage.removeItem('cart');//update session storage
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
//exports actions for cart functionality
export default cartSlice.reducer;
//exports reducer