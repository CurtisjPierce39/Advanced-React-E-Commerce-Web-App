import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../types/firebaseConfig';
import { useAuth } from './AuthContext';
import { RootState } from '../types';

interface CheckoutButtonProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onSuccess, onError }) => {
    const [isLoading, setIsLoading] = useState(false);
    const cart = useSelector((state: RootState) => state.cart);
    const { currentUser } = useAuth();

    const handleCheckout = async () => {
        if (!currentUser) {
            onError?.(new Error('Please login to checkout'));
            return;
        }

        setIsLoading(true);
        try {
            const orderData = {
                userId: currentUser.uid,
                items: cart.items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                status: 'pending',
                createdAt: new Date(),
            };

            const ordersRef = collection(db, 'orders');
            await addDoc(ordersRef, orderData);

            onSuccess?.();
        } catch (error) {
            console.error('Error creating order:', error);
            onError?.(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={isLoading || cart.items.length === 0}
            className="checkout-button"
        >
            {isLoading ? 'Processing...' : 'Checkout'}
        </button>
    );
};