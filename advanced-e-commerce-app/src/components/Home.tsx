import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts, getCategories, getProductsByCategory } from '../types/index';
import { addToCart } from '../store/cartSlice';


const Home = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    });

    const { data: products, isLoading } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => selectedCategory ? getProductsByCategory(selectedCategory) : getProducts()
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mb-4 p-2 border rounded"
            >
                <option value="">All Categories</option>
                {categories?.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <div className="container grid-cols-3 md:grid-cols-3 gap-4 content">
                {products?.map(product => (
                    <div key={product.id} className="border p-4 rounded ">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-contain img-fluid" />
                        <h2 className="text-lg font-bold mt-2">{product.title}</h2>
                        <p className="text-gray-600">${product.price}</p>
                        <p className="text-sm">{product.description}</p>
                        <p className="text-sm">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className="mt-2 px-4 py-2 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;