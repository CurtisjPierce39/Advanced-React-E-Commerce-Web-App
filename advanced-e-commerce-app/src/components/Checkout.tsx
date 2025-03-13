import React, { useState } from 'react';
import { auth } from '../types/firebaseConfig';
import { CartService, CartItem } from '../store/cartService';
import { createOrder } from '../store/orderService';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const cartItems = CartService.getCart();
    const total = CartService.calculateTotal();

    const handleCheckout = async () => {
        if (!auth.currentUser) {
            navigate('/login');
            return;
        }

        setIsProcessing(true);
        try {
            const orderData = {
                userId: auth.currentUser.uid,
                items: cartItems.map((item: CartItem) => ({
                    productId: item.product.id!,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                totalPrice: total
            };

            await createOrder(orderData);
            CartService.clearCart();
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Error creating order:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <div className="order-summary">
                <h3>Order Summary</h3>
                {cartItems.map((item: CartItem, index: number) => (
                    <div key={index} className="cart-item">
                        <span>{item.product.name}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>${item.product.price * item.quantity}</span>
                    </div>
                ))}
                <div className="total">
                    <strong>Total: ${total}</strong>
                </div>
            </div>
            <button
                onClick={handleCheckout}
                disabled={isProcessing || cartItems.length === 0}
            >
                {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
        </div>
    );
};

export default Checkout;