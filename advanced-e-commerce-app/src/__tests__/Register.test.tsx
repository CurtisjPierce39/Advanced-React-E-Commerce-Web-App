import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Register } from '../components/Register';
import { authService } from '../store/authService';

jest.mock('../../../services/authService');

describe('Register Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders registration form', () => {
        render(<Register />);

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Display Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
    });

    it('handles form submission', async () => {
        const mockRegister = authService.register as jest.Mock;
        mockRegister.mockResolvedValueOnce({ uid: '123' });

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password123' }
        });
        fireEvent.change(screen.getByPlaceholderText('Display Name'), {
            target: { value: 'Test User' }
        });
        fireEvent.change(screen.getByPlaceholderText('Address'), {
            target: { value: '123 Test St' }
        });

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith(
                'test@example.com',
                'password123',
                expect.objectContaining({
                    email: 'test@example.com',
                    displayName: 'Test User',
                    address: '123 Test St'
                })
            );
        });
    });
});