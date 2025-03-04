import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { auth } from '../types/firebaseConfig';
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
        <nav>
            <div>
                <div>
                    {<nav className="navbar">
                        <div className="container-fluid">
                            <Link to="/">
                                FakeStore
                            </Link>
                            <div>
                                <Link to="/">
                                    Home
                                </Link>
                                <Link to="/users">
                                Users
                                </Link>
                                <Link to="/products">
                                Products
                                </Link>
                                <Link to="/cart">
                                    <span>Cart</span>
                                    {totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    </nav>}
                    <div>
                        <span>
                            {user.email}
                        </span>
                        <br></br>
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