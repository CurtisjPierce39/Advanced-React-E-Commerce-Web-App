import React, { useEffect, useState } from 'react';
import { orderService } from '../store/orderService';
import { useAuth } from './AuthContext';

export const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const loadOrders = async () => {
            if (user) {
                const userOrders = await orderService.getUserOrders(user.uid);
                setOrders(userOrders);
            }
        };
        loadOrders();
    }, [user]);

    return (
        <div className="order-history">
            <h2>Order History</h2>
            {orders.map((order) => (
                <div key={order.id} className="order-card">
                    <p>Order ID: {order.id}</p>
                    <p>Date: {order.createdAt.toDate().toLocaleDateString()}</p>
                    <p>Total: ${order.totalPrice}</p>
                    <div className="order-items">
                        {order.items.map((item: any, index: number) => (
                            <div key={index} className="order-item">
                                <p>Product ID: {item.productId}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;