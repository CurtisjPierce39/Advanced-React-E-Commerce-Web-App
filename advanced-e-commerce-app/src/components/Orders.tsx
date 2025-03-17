import React, { useEffect, useState } from 'react';
import { orderService } from '../store/orderService';
import { auth } from '../types/firebaseConfig';

export const Orders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        if (auth.currentUser) {
            const ordersData = await orderService.getUserOrders(auth.currentUser.uid);
            setOrders(ordersData);
        }
    };

    const viewOrderDetails = async (orderId: string) => {
        const orderDetails = await orderService.getOrderDetails(orderId);
        setSelectedOrder(orderDetails);
    };

    return (
        <div>
            <h2>Order History</h2>
            {selectedOrder ? (
                <div>
                    <h3>Order Details</h3>
                    <p>Order ID: {selectedOrder.id}</p>
                    <p>Date: {selectedOrder.createdAt.toDate().toLocaleDateString()}</p>
                    <p>Total: ${selectedOrder.totalPrice}</p>
                    <h4>Items:</h4>
                    {selectedOrder.items.map((item: any) => (
                        <div key={item.productId}>
                            <p>Product ID: {item.productId}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                        </div>
                    ))}
                    <button onClick={() => setSelectedOrder(null)}>Back to Orders</button>
                </div>
            ) : (
                <div>
                    {orders.map((order) => (
                        <div key={order.id} className="order-card">
                            <p>Order ID: {order.id}</p>
                            <p>Date: {order.createdAt.toDate().toLocaleDateString()}</p>
                            <p>Total: ${order.totalPrice}</p>
                            <button onClick={() => viewOrderDetails(order.id)}>
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};