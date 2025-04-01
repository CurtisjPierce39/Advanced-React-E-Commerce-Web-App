import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../types';
import { RootState } from '../types';
import { removeFromCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

interface CartItem {
    id: string;
    description: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export const ShoppingCart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const totalItems = cartItems.reduce<number>((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0).toFixed(2);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-lg text-gray-600">Your cart is empty</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item: CartItem) => (
                        <div key={item.id} className="flex items-center justify-between border rounded-lg bg-gradient p-4 shadow-sm">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                <div className="flex flex-col space-y-2">
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-gray-600">{item.description}</p>
                                    <div className="flex items-center space-x-4">
                                        <p className="text-sm">Quantity: {item.quantity}</p>
                                        <p className="text-sm font-medium">Price: ${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch(removeFromCart(item.id))}
                                className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: 'crimson' }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="mt-6 border-t pt-4">
                        <div className="flex flex-col space-y-2">
                            <p className="text-lg">Total Items: {totalItems}</p>
                            <p className="text-xl font-bold">Total Price: ${totalPrice}</p>
                            <button
                                onClick={handleCheckout}
                                className="w-full md:w-auto px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity mt-4"
                                style={{ backgroundColor: 'crimson' }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;