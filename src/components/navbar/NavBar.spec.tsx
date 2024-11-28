import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import api from '../../service/api'; // Mock da API
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Simula roteamento para o teste
import Navbar from './NavBar'; // Componente a ser testado
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

        // expect(screen.getByRole('button')).toBeInTheDocument();
        // expect(screen.getByText('Configurações')).toBeInTheDocument();
    });

    // it('deve lidar com falha de autenticação', async () => {
    //     // Simula uma resposta indicando falha de autenticação
    //     (api.get as jest.Mock).mockResolvedValueOnce({
    //         status: 200,
    //         data: false,
    //     });

    //     render(
    //         <Router>
    //             <Navbar />
    //         </Router>
    //     );

    //     // Aguarda que o texto "Usuário" seja exibido (estado padrão)
    //     await waitFor(() => expect(screen.getByText('Usuário')).toBeInTheDocument());

    //     // Verifica se o menu "Configurações" não está visível
    //     expect(screen.queryByText('Configurações')).toBeNull();
    // });

    // it('deve lidar com erro de sessão expirada', async () => {
    //     // Simula um erro na API (sessão expirada)
    //     (api.get as jest.Mock).mockRejectedValueOnce({
    //         response: { status: 401 }, // Status de sessão expirada
    //     });

    //     // Mock do redirecionamento
    //     // delete global.window.location;
    //     global.window.location = { href: '' } as any;

    //     render(
    //         <Router>
    //             <Navbar />
    //         </Router>
    //     );

    //     // Aguarda pelo redirecionamento para a página inicial
    //     await waitFor(() => expect(global.window.location.href).toBe('/'));
    // });
});
