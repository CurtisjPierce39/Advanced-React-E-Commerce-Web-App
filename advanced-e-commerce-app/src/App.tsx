import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './types';
import Navbar from './components/NavBar';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import './App.css'

const queryClient = new QueryClient();// Create a new instance of QueryClient

function App() {
  return (
    // Wrap your app with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      {/*Wrap your app with Provider*/}
      <Provider store={store}>
        {/* Wrap your app with BrowserRouter */}
        <BrowserRouter>
          {/* Your app components */}
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;