import { Navbar } from './components/NavBar';
import ProductForm from './components/ProductForm';
import { Auth } from './components/Login';
import { UserProfile } from './components/UserProfile';
import { Products } from './components/ProductList';
import { Orders } from './components/Orders';
import { ShoppingCart } from './components/ShoppingCart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import { store } from './types';
import './App.css'
import { CartProvider } from './components/CartContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <Routes>
                  <Route path="/login" element={<Auth />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } />
                  <Route path="/addproducts" element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  } />
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <ShoppingCart />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;