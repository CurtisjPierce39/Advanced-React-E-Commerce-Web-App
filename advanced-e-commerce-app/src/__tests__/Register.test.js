import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register';
import { registerUser } from '../../../services/authService';

// Mock the authService
jest.mock('../../../services/authService');

describe('Register Component', () => {
    beforeEach(() => {
        (registerUser as jest.Mock).mockClear();
    });

    it('renders registration form', () => {
        render(<Register />);

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
    });

    it('handles form submission', async () => {
        (registerUser as jest.Mock).mockResolvedValueOnce({ uid: '123' });

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password123' },
        });
        fireEvent.change(screen.getByPlaceholderText('Name'), {
            target: { value: 'Test User' },
        });

        fireEvent.submit(screen.getByRole('button'));

        expect(registerUser).toHaveBeenCalledWith(
            'test@example.com',
            'password123',
            expect.objectContaining({ email: 'test@example.com', name: 'Test User' })
        );
    });
});