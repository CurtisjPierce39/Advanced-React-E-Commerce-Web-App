const ProductForm = require("../components/ProductForm").default;
const { render, fireEvent, waitFor, screen } = require("@testing-library/react");
require('@testing-library/jest-dom');
const React = require("react");
const { productService } = require('../store/productService');

jest.mock('../store/productService', () => ({
    productService: {
        createProduct: jest.fn().mockResolvedValue({
            id: 101,
            name: 'T Shirt',
            price: 0,
            description: 'White T Shirt',
            stock: 0,
            imageUrl: 'unsplash.com/tshirt',
            category: 'Mens Clothing'
        })
    }
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('ProductForm', () => {
    test("submits the form data correctly", async () => {
        render(<ProductForm />);

        fireEvent.change(screen.getByLabelText(/Product Name/i), { target: { value: 'T Shirt' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: 0 } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'White T Shirt' } });
        fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: 0 } });
        fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'unsplash.com/tshirt' } });
        fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Mens Clothing' } });

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        await waitFor(() => {
            expect(productService.createProduct).toHaveBeenCalledTimes(1);
            expect(productService.createProduct).toHaveBeenCalledWith({
                name: 'T Shirt',
                price: 0,
                description: 'White T Shirt',
                stock: 0,
                imageUrl: 'unsplash.com/tshirt',
                category: 'Mens Clothing'
            });
        });
    });
});