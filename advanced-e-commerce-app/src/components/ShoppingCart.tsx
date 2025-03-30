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
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cartItems.map((item: CartItem) => (
                        <div key={item.id} className="flex items-center border rounded bg-gradient py-4 content">
                            <img src={item.image} alt={item.name} className="img-fluid m-4 rounded" />
                            <div className="ml-4 flex rounded p-3 m-5">
                                <h2 className="font-bold m-4">{item.name}</h2>
                                <p className='mx-auto'>{item.description}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    style={{ backgroundColor: 'crimson' }}
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="bg-gradient rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4">
                        <p>Total Items: {totalItems}</p>
                        <p>Total Price: ${totalPrice}</p>
                        <button
                            onClick={handleCheckout}
                            className="mt-4 bg-gradient px-4 py-2 rounded"
                            style={{ backgroundColor: 'crimson' }}
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