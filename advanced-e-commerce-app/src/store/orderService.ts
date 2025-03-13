import {
    collection,
    addDoc,
    doc,
    orderBy,
    query,
    where,
    getDocs
} from 'firebase/firestore';
import { db } from '../types/firebaseConfig';

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    createdAt: Date;
    status: string;
}

export const orderService = {
    async createOrder(order: Order) {
        return await addDoc(collection(db, 'orders'), {
            ...order,
            createdAt: new Date()
        });
    },

    async getUserOrders(userId: string) {
        const q = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
};