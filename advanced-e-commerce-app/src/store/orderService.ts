import { collection, addDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../types/firebaseConfig';
import { Order } from '../types/Order';

export const orderService = {
    async createOrder(order: Omit<Order, 'id'>): Promise<string> {
        const orderRef = await addDoc(collection(db, 'orders'), {
            ...order,
            createdAt: new Date()
        });
        return orderRef.id;
    },

    async getUserOrders(userId: string): Promise<Order[]> {
        const ordersQuery = query(
            collection(db, 'orders'),
            where('userId', '==', userId)
        );

        const querySnapshot = await getDocs(ordersQuery);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as unknown as Order[];
    },

    async getOrderById(orderId: string): Promise<Order | null> {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (!orderDoc.exists()) return null;
        return { id: orderDoc.id, ...orderDoc.data() } as unknown as Order;
    }
};

export default orderService;