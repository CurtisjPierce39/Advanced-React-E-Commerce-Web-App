import * as React from 'react';
import { useState } from 'react';
import { productService, Product } from '../store/productService';

const ProductForm: React.FC = () => {
    const [product, setProduct] = useState<Omit<Product, 'productId' | 'id'>>({        
        name: '',
        price: 0,
        description: '',
        stock: 0,
        imageUrl: '',
        category: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await productService.createProduct({
                name: product.name,
                price: product.price,
                description: product.description,
                stock: product.stock,
                imageUrl: product.imageUrl,
                category: product.category
            });
            setProduct({
                name: '',
                price: 0,
                description: '',
                stock: 0,
                imageUrl: '',
                category: '',
            });
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    };

    return (
        <div>
            <h2 className="font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4" role="form">
                <div>
                    <label>
                        Product Name
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Price
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Stock
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            required
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image URL
                        <input
                            type="url"
                            name="imageUrl"
                            value={product.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Category
                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <button
                    type="submit"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;