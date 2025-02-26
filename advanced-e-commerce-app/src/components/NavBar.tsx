import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuth } from './AuthContext';

const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!user) return null;

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {<nav className="navbar bg-gray-800 text-white p-4">
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
                    </nav>}
                    <div className="flex items-center space-x-6">
                        <span className="text-white">
                            {user.email}
                        </span>
                        <button
                            onClick={handleSignOut}
                            className="text-white hover:text-blue-200 transition duration-300"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;