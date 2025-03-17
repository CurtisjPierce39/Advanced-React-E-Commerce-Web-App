import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { CartItem } from '../store/cartService';
import { orderService } from '../store/orderService';

interface CheckoutProps {
    cartItems: CartItem[];
    totalPrice: number;
    clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, clearCart }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        try {
            setIsProcessing(true);

            const orderItems = cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price
            }));

            const order = {
                userId: currentUser.uid,
                items: orderItems,
                totalPrice,
                createdAt: new Date()
            };

            await orderService.createOrder(order);
            clearCart();
            navigate('/orders');
        } catch (error) {
            console.error('Error creating order:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}

                <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={isProcessing || cartItems.length === 0}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;