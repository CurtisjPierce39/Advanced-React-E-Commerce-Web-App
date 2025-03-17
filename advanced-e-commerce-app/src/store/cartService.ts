import { doc, getDocs, addDoc, updateDoc, query, where, collection } from 'firebase/firestore';
import { db } from '../types/firebaseConfig';

export interface CartItem {
    product: string;
    productId: string;
    quantity: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface Cart {
    userId: string;
    items: CartItem[];
    totalPrice: number;
}

export const cartService = {
    async getCart(userId: string) {
        const q = query(collection(db, 'carts'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs[0]?.data() as Cart;
    },

    async updateCart(userId: string, items: CartItem[]) {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const q = query(collection(db, 'carts'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            await addDoc(collection(db, 'carts'), {
                userId,
                items,
                total
            });
        } else {
            const cartDoc = querySnapshot.docs[0];
            await updateDoc(doc(db, 'carts', cartDoc.id), {
                items,
                total
            });
        }
    }
};