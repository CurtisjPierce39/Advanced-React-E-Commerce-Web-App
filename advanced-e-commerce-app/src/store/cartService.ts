import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../types/firebaseConfig';

export interface CartItem {
    product: any;
    productId: string;
    quantity: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface Cart {
    userId: string;
    items: CartItem[];
    totalAmount: number;
}

export const cartService = {
    async getCart(userId: string) {
        const cartDoc = await getDoc(doc(db, 'carts', userId));
        return cartDoc.data() as Cart;
    },

    async updateCart(userId: string, cart: Cart) {
        const cartRef = doc(db, 'carts', userId);
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
            await updateDoc(cartRef, cart);
        } else {
            await setDoc(cartRef, cart);
        }
    }
};