import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from './AuthContext';
import { orderService } from '../store/orderService';
import { clearCart } from '../store/cartSlice';
import { RootState } from '../types';
import { CheckoutButton } from './CHeckoutButton';

interface ShippingDetails {
    address: string;
    city: string;
    zipCode: string;
    country: string;
}

export const Checkout: React.FC = () => {
    const { currentUser } = useAuth();
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    // Calculate total price from cart items
    const totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
        address: '',
        city: '',
        zipCode: '',
        country: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        try {
            const orderData = {
                userId: currentUser.uid,
                items: cart.items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice: totalPrice, // Use calculated totalPrice
                shippingDetails,
                createdAt: new Date()
            };

            await orderService.createOrder(orderData);
            dispatch(clearCart());
            alert("Thank you for your purchase!");
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    if (cart.items.length === 0) {
        return <div>Your cart is empty</div>;
    }

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <div className="order-summary">
                <h3>Order Summary</h3>
                {cart.items.map((item) => (
                    <div key={item.id} className="order-item">
                        <span>{item.name}</span>
                        <span>{item.quantity} x ${item.price}</span>
                    </div>
                ))}
                <div className="order-total">
                    <strong>Total: ${totalPrice.toFixed(2)}</strong>
                </div>
            </div>

            {/* Rest of the component remains the same */}
            <form onSubmit={handleSubmit}>
                {/* ... existing form code ... */}
            <CheckoutButton/>
            </form>
        </div>
    );
};