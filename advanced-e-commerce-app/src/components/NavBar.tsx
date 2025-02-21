import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const Navbar = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    FakeStore
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/cart" className="flex items-center hover:text-gray-300">
                        <span>Cart</span>
                        {totalItems > 0 && (
                            <span className="ml-2 bg-red-500 rounded-full px-2 py-1 text-xs">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;