import { useQuery } from '@tanstack/react-query';// uses react query for data fetching
import { useState } from 'react';//uses react for state management
import { useDispatch } from 'react-redux';////uses redux for state management
import { getProducts, getCategories, getProductsByCategory } from '../types/index'; //imports function for fetching products and categories
import { addToCart } from '../store/cartSlice';//imported for adding products to cart

const Home = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string>('');//used to track selected category

    const { data: categories } = useQuery({//fetches category data using react query
        queryKey: ['categories'],
        queryFn: getCategories//query function to fetch categories
    });

    const { data: products, isLoading } = useQuery({//fetched product data and loading status
        queryKey: ['products', selectedCategory],
        queryFn: () => selectedCategory ? getProductsByCategory(selectedCategory) : getProducts()//query function to fetch products based on category
    });

    if (isLoading) return <div>Loading...</div>;//renders message if "isLoading" is true

    return (
        <div className="container mx-auto p-4">
            <select //dropdown menu for product category
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mb-4 p-2 border rounded"
            >
                <option value="">All Categories</option>
                {categories?.map(category => ( //maps through categories when dropdown menu is selected
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products?.map(product => ( //maps through products and renders product data
                    <div key={product.id} className="border p-4 rounded">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-contain img-fluid" />
                        <h2 className="text-lg font-bold mt-2">{product.title}</h2>
                        <p className="text-gray-600">${product.price}</p>
                        <p className="text-sm">{product.description}</p>
                        <p className="text-sm">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                        <button
                            onClick={() => dispatch(addToCart(product))}//uses "dispatch()" with addToCart as a parameter to add item to cart
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
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