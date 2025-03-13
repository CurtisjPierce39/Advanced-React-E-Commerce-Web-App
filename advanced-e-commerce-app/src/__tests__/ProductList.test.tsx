import { render, screen } from '@testing-library/react';
import ProductList from '../ProductList';
import { getProducts } from '../../../services/productService';

jest.mock('../../../services/productService');

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

describe('ProductList Component', () => {
    beforeEach(() => {
        (getProducts as jest.Mock).mockClear();
    });

    it('renders products', async () => {
        (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

        render(<ProductList />);

        expect(await screen.findByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Price: $99.99')).toBeInTheDocument();
        expect(screen.getByText('Stock: 10')).toBeInTheDocument();
    });
});