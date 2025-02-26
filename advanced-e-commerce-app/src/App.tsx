// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
// import { onAuthStateChanged, User } from 'firebase/auth';
// import { auth } from './firebaseConfig';
// import Register from './components/Register';
// import Login from './components/Login';
import AddDataForm from './components/AddDataForm';
import DisplayData from './components/DisplayData';
// import { Provider } from 'react-redux';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { store } from './types';
// import Navbar from './components/NavBar';
// import Home from './components/Home';
// import ShoppingCart from './components/ShoppingCart';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './types';
import { AuthProvider, useAuth } from './components/AuthContext';
import Navbar from './components/NavBar';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import Login from './components/Login';

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
          <BrowserRouter>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Home />
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
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;