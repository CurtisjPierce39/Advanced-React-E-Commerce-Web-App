import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductForm from "./src/components/productForm"

// Mock global.fetch to prevent actual API calls during testing
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ name: '', price: '', description: '', stock: 0, imageUrl: '' }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('ProductForm Component Integration Test', () => {
    test('submits the form data correctly', async () => {
        render(<ProductForm />);

        // Simulate user input
        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Price:/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Stock:/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/imageUrl:/i), { target: { value: '' } });

        // Simulate form submission
        fireEvent.click(screen.getByText(/Submit Post/i));

        // Wait for the fetch call to complete
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        // Verify the fetch was called with the correct data
        expect(fetch).toHaveBeenCalledWith('<https://jsonplaceholder.typicode.com/posts>', {
            method: 'POST',
            body: JSON.stringify({ name: '', price: '', description: '', stock: 0, imageUrl: '' }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
    });
});