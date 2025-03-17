import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../store/cartSlice';
import { productService, Product } from '../store/productService';
import { toast } from 'react-toastify'

export const Products: React.FC = () => {
    const [products, setProducts] = useState<(Product & { id: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const productsData = await productService.getAllProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error loading products:', error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <div className="container grid-cols-3 md:grid-cols-3 gap-4 content">
                {products.map((product) => {

                    return (
                        <div key={product.id} className="border p-4 rounded">
                            <img className='img-fluid' src={product.imageUrl} alt={product.name} />
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="description">{product.description}</p>
                                <p className="price">${product.price}</p>
                                <p className="stock">In Stock:{product.stock}</p>
                                <button
                                    className="mt-2 px-4 py-2 rounded"
                                    onClick={() => dispatch(addToCart(product))}
                                >
                                Add to Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
    );
};