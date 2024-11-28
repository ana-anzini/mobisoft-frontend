import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Caminho correto para o seu componente
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('não deve renderizar o SideMenu na rota inicial "/"', async () => {
        (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

        render(
            <Router>
                <App />
            </Router>
        );

        expect(screen.queryByText('Produtos')).not.toBeInTheDocument();
    });
});