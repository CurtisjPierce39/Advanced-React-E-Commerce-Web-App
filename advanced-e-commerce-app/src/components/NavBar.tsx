import { Link } from 'react-router-dom';//used for navigation between links
import { useSelector } from 'react-redux';//uses Redux for state management
import { RootState } from '../types'; //used for RootState type for TypeScript safety

const Navbar = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);//retrieves cart items from Redux store
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);//calculates total number of items in cart using "reduce"

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    FakeStore
                </Link>
                <div>
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/cart">
                        <span>Cart</span>
                        {totalItems > 0 && ( //shows badge with item count when cart is not empty
                            <span>
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