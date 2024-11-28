import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { AuthProvider } from './AuthContext';

describe('ProtectedRoutes', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter initialEntries={['/protected']}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </MemoryRouter>
    );

    it('should redirect to login if not authenticated', () => {
        // Remove o token para simular o estado de não autenticado
        sessionStorage.removeItem('token');

        render(
            <Wrapper>
                <Routes>
                    <Route path="/" element={<div>Login Page</div>} />
                    <Route path="/protected" element={<ProtectedRoutes />}>
                        <Route path="protected-page" element={<div>Protected Content</div>} />
                    </Route>
                </Routes>
            </Wrapper>
        );

        // Espera-se que a página seja redirecionada para "/"
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('should render the outlet if authenticated', () => {
        sessionStorage.setItem('token', 'testToken');

        render(
            <Wrapper>
                <Routes>
                    <Route path="/" element={<div>Login Page</div>} />
                    <Route path="/protected" element={<ProtectedRoutes />}>
                        <Route path="protected-page" element={<div>Protected Content</div>} />
                    </Route>
                </Routes>
            </Wrapper>
        );
    });
});