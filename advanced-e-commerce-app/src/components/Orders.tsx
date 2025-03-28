import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { orderService, OrderItem, Order } from '../store/orderService';

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!currentUser) return;

            try {
                const userOrders = await orderService.getUserOrders(currentUser.uid);
                setOrders(userOrders as Order[]);
            } catch (err) {
                setError('Failed to fetch orders');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void fetchOrders();
    }, [currentUser]);

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="order-history">
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <span>Order ID: {order.id}</span><br></br>
                            <span>User ID: {order.userId}</span><br></br>
                            <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="border p-4 rounded">
                            {order.items.map((item: OrderItem, index: number) => (
                                <div key={index} className="order-item"><br></br>
                                    <span>Product ID: {item.productId}</span><br></br>
                                    <span>Quantity: {item.quantity}</span><br></br>
                                    <span>Price: ${item.price}</span>
                                </div>
                            ))}
                        </div>
                        <div className="order-total">
                            <strong>Total: ${order.totalPrice}</strong>
                        </div><br></br>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;