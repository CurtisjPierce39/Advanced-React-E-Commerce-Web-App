import React, { useEffect, useState } from 'react';
import { productService, Product } from '../store/productService';
import { addToCart } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

export const ProductList: React.FC = () => {
    const dispatch = useDispatch();

    const [products, setProducts] = useState<(Product & { id: string })[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const products = await productService.getAllProducts();
            setProducts(products);
        };
        loadProducts();
    }, []);

    return (

        <div className="container grid-cols-3 md:grid-cols-3 gap-4 content">

            {products.map((product) => (
                <div key={product.id} className="border p-4 rounded">
                    <img className='img-fluid' src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className="mt-2 px-4 py-2 rounded"
                    >
                        Add to Cart
                    </button>

                </div>
            ))}
        </div>
    );
};