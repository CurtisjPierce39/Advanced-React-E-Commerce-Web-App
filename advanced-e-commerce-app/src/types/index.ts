import axios from 'axios'; //used for API query
import { configureStore } from '@reduxjs/toolkit'; //used to set up the Redux store
import cartReducer from '../store/cartSlice'; //imports cart reducer from cartSlice

//defines the structure for product data
export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    rating: { //nested type for rating
        rate: number;
        count: number;
    };
    image: string;
}

//extends Product to include quantity
export interface CartItem extends Product {
    quantity: number;
}

const BASE_URL = 'https://fakestoreapi.com';

//fetches all products
export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data; //returns product data
};

//fetches categories
export const getCategories = async (): Promise<string[]> => {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data; //returns category data
};

//fetches products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data; //returns product by category
};

//creates Redux store
export const store = configureStore({
    reducer: {
        cart: cartReducer, //configures cart reducer
    },
});

//creates TypeScript type for the complete Redux store state
//automatically infers the type from store's state
export type RootState = ReturnType<typeof store.getState>; 
//creates TypeScript type for store's dispatch function
//Ensures only valid actions can be dispatched
export type AppDispatch = typeof store.dispatch; 