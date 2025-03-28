import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Auth } from '../components/Login';
import { authService } from '../store/authService';

// Mock the auth service
jest.mock('../store/authService', () => ({
    authService: {
        login: jest.fn(),
        register: jest.fn()
    }
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Auth Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderAuth = () => {
        return render(
            <BrowserRouter>
                <Auth />
            </BrowserRouter>
        );
    };

    describe('Login Mode', () => {
        it('renders login form by default', () => {
            renderAuth();
            expect(screen.getByTestId('auth-title')).toHaveTextContent('Login');
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
            expect(screen.getByTestId('password-input')).toBeInTheDocument();
            expect(screen.queryByTestId('name-input')).not.toBeInTheDocument();
        });

        it('handles successful login', async () => {
            (authService.login as jest.Mock).mockResolvedValueOnce({ user: { uid: '123' } });
            renderAuth();
            
            const emailInput = screen.getByTestId('email-input');
            const passwordInput = screen.getByTestId('password-input');
            const submitButton = screen.getByTestId('submit-button');
    
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
            await waitFor(() => {
                fireEvent.click(submitButton);
            });
    
            expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });

        it('handles login error', async () => {
            const mockError = new Error('Login failed');
            (authService.login as jest.Mock).mockRejectedValueOnce(mockError);

            renderAuth();
            const emailInput = screen.getByTestId('email-input');
            const passwordInput = screen.getByTestId('password-input');
            const submitButton = screen.getByTestId('submit-button');

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            
            await waitFor(() => {
                fireEvent.click(submitButton);
            });
    
            await waitFor(() => {
                expect(screen.getByTestId('error-message')).toHaveTextContent('Login failed');
            });
        });
    });

    describe('Register Mode', () => {
        it('switches to register form', () => {
            renderAuth();
            const switchButton = screen.getByTestId('toggle-auth-mode-button');
            fireEvent.click(switchButton);

            expect(screen.getByTestId('auth-title')).toHaveTextContent('Register');
            expect(screen.getByTestId('name-input')).toBeInTheDocument();
            expect(screen.getByTestId('address-input')).toBeInTheDocument();
        });

        it('handles successful registration', async () => {
            renderAuth();
            const switchButton = screen.getByTestId('toggle-auth-mode-button');
            fireEvent.click(switchButton);

            const emailInput = screen.getByTestId('email-input');
            const passwordInput = screen.getByTestId('password-input');
            const nameInput = screen.getByTestId('name-input');
            const addressInput = screen.getByTestId('address-input');
            const submitButton = screen.getByTestId('submit-button');

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.change(nameInput, { target: { value: 'Test User' } });
            fireEvent.change(addressInput, { target: { value: 'Test Address' } });

            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(authService.register).toHaveBeenCalledWith(
                    'test@example.com',
                    'password123',
                    expect.objectContaining({
                        email: 'test@example.com',
                        name: 'Test User',
                        address: 'Test Address'
                    })
                );
                expect(mockNavigate).toHaveBeenCalledWith('/');
            });
        });
    });
});