import React, { useEffect, useState } from 'react';
import { Product, productService } from '../store/productService';
import { useCart } from './CartContext';

export const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await productService.getAllProducts();
            setProducts(fetchedProducts);
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
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};