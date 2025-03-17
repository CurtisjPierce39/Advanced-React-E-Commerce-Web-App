import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { cartService, CartItem } from '../store/cartService';
import { orderService } from '../store/orderService';

export const ShoppingCart: React.FC = () => {
    const { user } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (user) {
            loadCart();
        }
    }, [user]);

    const loadCart = async () => {
        const userCart = await cartService.getCart(user!.uid);
        if (userCart) {
            setCart(userCart.items);
            setTotal(userCart.totalPrice);
        }
    };

    const updateItemQuantity = async (productId: string, quantity: number) => {
        const updatedCart = cart.map(item =>
            item.productId === productId ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0);

        setCart(updatedCart);
        await cartService.updateCart(user!.uid, updatedCart);
    };

    const checkout = async () => {
        try {
            await orderService.createOrder(user!.uid, {
                items: cart,
                total,
                status: 'pending',
            });

            // Clear cart after successful order
            await cartService.updateCart(user!.uid, []);
            setCart([]);
            setTotal(0);

            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            {cart.map(item => (
                <div key={item.productId} className="cart-item">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                    <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => updateItemQuantity(item.productId, parseInt(e.target.value))}
                    />
                    <span>${item.price * item.quantity}</span>
                </div>
            ))}
            <div className="cart-total">
                <strong>Total: ${total}</strong>
            </div>
            <button
                onClick={checkout}
                disabled={cart.length === 0}
            >
                Checkout
            </button>
        </div>
    );
};