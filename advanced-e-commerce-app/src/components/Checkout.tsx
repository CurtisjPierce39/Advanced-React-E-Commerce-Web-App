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

    const totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const [shippingDetails] = useState<ShippingDetails>({
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
                    name: item.name,
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice: totalPrice,
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
            <div className="border p-4 rounded">
                <h3>Order Summary</h3>
                {cart.items.map(item => (
                    <div key={item.id} className="flex items-center border-b py-4 content">
                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-contain img-fluid" /><br></br>
                        <span>Name: {item.name}</span>
                        <span><strong>{item.quantity} x ${item.price}</strong></span>
                    </div>
                ))}
                <div className="order-total">
                    <strong>Total: ${totalPrice.toFixed(2)}</strong>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
            <CheckoutButton/>
            </form>
        </div>
    );
};