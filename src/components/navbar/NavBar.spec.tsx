import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import api from '../../service/api';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import { useLocation } from 'react-router-dom';

jest.mock('../../service/api', () => ({
    get: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/navbar' });
});
describe('Navbar', () => {

    it('deve renderizar a navbar quando o usuário está autenticado', async () => {
        // Simula a resposta da autenticação
        (api.get as jest.Mock).mockImplementation((url: string) => {
            if (url === '/auth/isAuthenticated') {
                return Promise.resolve({ data: true }); // Usuário autenticado
            }
            if (url === '/auth/getInfo') {
                return Promise.resolve({
                    status: 200,
                    data: { name: 'John Doe' }, // Dados do usuário
                });
            }
            return Promise.reject();
        });

        render(
            <React.StrictMode>
                <Router>
                    <Navbar />
                </Router>
            </React.StrictMode>
        );
        console.log(screen.debug());

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

    });
});
