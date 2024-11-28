import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactDOM from 'react-dom/client';

jest.mock('jspdf', () => {
    return jest.fn().mockImplementation(() => ({
        save: jest.fn(),
    }));
});

global.HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
    fillText: jest.fn(),
});

jest.mock('react-dom/client', () => ({
    createRoot: jest.fn().mockReturnValue({
        render: jest.fn(),
    }),
}));

describe('index.tsx', () => {
    it('deve chamar o ReactDOM.createRoot e renderizar o app', () => {
        require('./index.tsx');
        expect(ReactDOM.createRoot).toHaveBeenCalledTimes(1);
    });
});