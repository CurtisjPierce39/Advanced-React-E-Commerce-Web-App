import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import { removeFromCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const totalItems = cartItems.reduce((sum: any, item: { quantity: any; }) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum: number, item: { price: number; quantity: number; }) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center border-b py-4 content">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-contain img-fluid" />
                            <div className="ml-4 flex-grow">
                                <h2 className="font-bold">{item.name}</h2>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4">
                        <p>Total Items: {totalItems}</p>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        <button
                            onClick={handleCheckout}

                            className="mt-4 bg-green-500 px-4 py-2 rounded"
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;