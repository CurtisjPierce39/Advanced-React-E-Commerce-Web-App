import React, { useEffect, useState } from 'react';
import { Order } from '../types/Order';
import CartItem from '../store/orderService';
import { useAuth } from './AuthContext';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.uid) return;
            const userOrders = await orderService.getUserOrders(user.uid);
            setOrders(userOrders);
        };

        fetchOrders();
    }, [user]);

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Order History</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">Order #{order.id?.slice(-6)}</h3>
                                <span className={`px-2 py-1 rounded text-sm ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-gray-600">{formatDate(order.createdAt)}</p>
                            <p className="font-medium mt-2">Total: ${order.totalAmount.toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                {selectedOrder && (
                    <div className="border rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-4">Order Details</h2>
                        <p className="text-gray-600 mb-4">{formatDate(selectedOrder.createdAt)}</p>

                        <div className="space-y-4">
                            {selectedOrder.products.map((product) => (
                                <div key={product.id} className="flex items-center space-x-4 border-b pb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium">{product.name}</h3>
                                        <p className="text-gray-600">
                                            Quantity: {product.quantity} x ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-right">
                            <p className="text-lg font-bold">
                                Total: ${selectedOrder.totalAmount.toFixed(2)}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;