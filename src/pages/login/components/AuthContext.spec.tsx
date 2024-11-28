import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { MemoryRouter } from 'react-router-dom';
import api from '../../../service/api';

// Mock da instância do axios
jest.mock('../../../service/api', () => ({
    post: jest.fn(),
    defaults: {
        headers: {
            common: {},
        },
    },
}));

describe('AuthContext', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
            <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
    );

    beforeEach(() => {
        sessionStorage.clear();  // Limpar o sessionStorage antes de cada teste
        (api.post as jest.Mock).mockReset();  // Resetando o mock
    });

    it('should initialize with isAuthenticated as false', () => {
        render(
            <Wrapper>
                <TestComponent />
            </Wrapper>
        );

        expect(screen.getByText('false')).toBeInTheDocument();
    });

    it('should set isAuthenticated to true after login', async () => {
        const mockToken = 'testToken';

        // Simula a resposta da API para o login
        (api.post as jest.Mock).mockResolvedValueOnce({
            data: {
                token: mockToken,
            },
        });

        render(
            <Wrapper>
                <TestComponent />
            </Wrapper>
        );

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            // Verifica se o token foi armazenado no sessionStorage
            expect(sessionStorage.getItem('token')).toBe(mockToken);

            // Verifica se o estado de isAuthenticated foi atualizado para true
            expect(screen.getByText('true')).toBeInTheDocument();
        });
    });

    it('should set isAuthenticated to false after logout', async () => {
        sessionStorage.setItem('token', 'testToken');  // Simula que o usuário já está autenticado

        render(
            <Wrapper>
                <TestComponent />
            </Wrapper>
        );

        fireEvent.click(screen.getByText('Logout'));

        await waitFor(() => {
            expect(sessionStorage.getItem('token')).toBeNull();
        });

        expect(screen.getByText('false')).toBeInTheDocument();
    });

    it('should redirect to login page on logout', async () => {
        sessionStorage.setItem('token', 'testToken');

        render(
            <Wrapper>
                <TestComponent />
            </Wrapper>
        );

        fireEvent.click(screen.getByText('Logout'));

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });

    it('should set Authorization header with token on login', async () => {
        const mockToken = 'testToken';

        // Simula a resposta da API para o login
        (api.post as jest.Mock).mockResolvedValueOnce({
            data: {
                token: mockToken,
            },
        });

        render(
            <Wrapper>
                <TestComponent />
            </Wrapper>
        );

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(api.defaults.headers.common['Authorization']).toBe(`Bearer ${mockToken}`);
        });
    });
});

// Test component to use useAuth hook
const TestComponent = () => {
    const { isAuthenticated, login, logout } = useAuth();

    return (
        <div>
            <span>{isAuthenticated.toString()}</span>
            <button onClick={() => login('testToken')}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};