import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    getDoc
} from 'firebase/firestore';
import { db } from '../types/firebaseConfig';

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    createdAt: Date;
}

export const orderService = {
    async createOrder(order: Order) {
        return await addDoc(collection(db, 'orders'), {
            ...order,
            createdAt: new Date()
        });
    },

    async getUserOrders(userId: string) {
        const q = query(collection(db, 'orders'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    async getOrderDetails(orderId: string) {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        return {
            id: orderDoc.id,
            ...orderDoc.data()
        };
    }
};