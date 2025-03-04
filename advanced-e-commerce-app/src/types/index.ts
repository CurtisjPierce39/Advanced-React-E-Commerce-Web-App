import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';


export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}

const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
};

export const getCategories = async (): Promise<string[]> => {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data;
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;