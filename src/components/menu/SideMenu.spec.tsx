import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideMenu from './SideMenu'; // Caminho correto do seu componente
import { useLocation } from 'react-router-dom';
import React from 'react';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('SideMenu', () => {
    it('deve renderizar o menu corretamente com base na localização', () => {
        (useLocation as jest.Mock).mockReturnValue({ pathname: '/products' });

        render(
            <Router>
                <SideMenu />
            </Router>
        );

        expect(screen.getByText('Produtos')).toBeInTheDocument();
    });
});