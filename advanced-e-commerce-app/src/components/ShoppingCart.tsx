import React, { useEffect, useState } from 'react';
import { auth, db } from '../types/firebaseConfig';
import { cartService, CartItem } from '../store/cartService';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import './ShoppingCart.css';

export const ShoppingCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            if (auth.currentUser) {
                const cart = await cartService.getCart(auth.currentUser.uid);
                setCartItems(cart?.items || []);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error loading cart:', error);
            setLoading(false);
        }
    };

    const updateQuantity = async (productId: string, newQuantity: number) => {
        if (auth.currentUser) {
            const updatedItems = cartItems.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ).filter(item => item.quantity > 0);

            const totalAmount = calculateTotal(updatedItems);

            await cartService.updateCart(auth.currentUser.uid, {
                userId: auth.currentUser.uid,
                items: updatedItems,
                totalAmount
            });

            setCartItems(updatedItems);
        }
    };

    const calculateTotal = (items: CartItem[]): number => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = async () => {
        try {
            if (auth.currentUser && cartItems.length > 0) {
                const orderItems = cartItems.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.price * item.quantity
                }));

                const orderTotal = calculateTotal(calculateTotal(cartItems));

                const order = {
                    userId: auth.currentUser.uid,
                    items: orderItems,
                    totalPrice: orderTotal,
                    status: 'pending',
                    createdAt: new Date(),
                    originalTotal: calculateTotal(cartItems),
                    paymentStatus: 'pending'
                };

                const orderRef = await addDoc(collection(db, 'orders'), order);

                await cartService.updateCart(auth.currentUser.uid, {
                    userId: auth.currentUser.uid,
                    items: [],
                    totalAmount: 0
                });

                setCartItems([]);

                navigate(`/order-confirmation/${orderRef.id}`);
            }

        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    if (loading) {
        return <div>Loading cart...</div>;
    }

    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>${item.price}</p>
                                </div>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total: ${calculateTotal(cartItems).toFixed(2)}</h3>
                        <button className="checkout-button" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};