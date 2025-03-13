import { render, screen, waitFor } from '@testing-library/react';
import { ProductList } from '../components/ProductList';
import { productService } from '../store/productService';

jest.mock('../../../services/productService');

describe('ProductList Component', () => {
    const mockProducts = [
        {
            id: '1',
            name: 'Test Product',
            description: 'Test Description',
            price: 99.99,
            stock: 10,
            imageUrl: 'test.jpg'
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (productService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    });

    it('renders products', async () => {
        render(<ProductList />);

        await waitFor(() => {
            expect(screen.getByText('Test Product')).toBeInTheDocument();
            expect(screen.getByText('Test Description')).toBeInTheDocument();
            expect(screen.getByText('Price: $99.99')).toBeInTheDocument();
            expect(screen.getByText('Stock: 10')).toBeInTheDocument();
        });
    });
});