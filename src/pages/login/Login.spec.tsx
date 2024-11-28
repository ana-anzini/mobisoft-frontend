import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import api from '../../service/api';
import { message } from 'antd';
import AuthForm from './Login';

jest.mock('../../service/api');
jest.mock('antd', () => ({
    ...jest.requireActual('antd'),
    message: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('AuthForm', () => {
    const mockApiPost = api.post as jest.Mock;
    const mockMessageSuccess = message.success as jest.Mock;
    const mockMessageError = message.error as jest.Mock;

    beforeEach(() => {
        mockApiPost.mockClear();
        mockMessageSuccess.mockClear();
        mockMessageError.mockClear();
    });

    it('should render login form by default', () => {
        render(<AuthForm />);

        expect(screen.getByText('Faça seu login')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
        expect(screen.getByText('Registrar nova conta')).toBeInTheDocument();
    });

    it('should switch to registration form when "Registrar nova conta" is clicked', () => {
        render(<AuthForm />);

        fireEvent.click(screen.getByText('Registrar nova conta'));

        expect(screen.getByText('Crie sua conta')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
        expect(screen.getByText('Já tem uma conta? Faça login')).toBeInTheDocument();
    });

    it('should switch back to login form when "Já tem uma conta? Faça login" is clicked', () => {
        render(<AuthForm />);

        fireEvent.click(screen.getByText('Registrar nova conta'));
        fireEvent.click(screen.getByText('Já tem uma conta? Faça login'));

        expect(screen.getByText('Faça seu login')).toBeInTheDocument();
    });

    it('should call api.post and show success message on login', async () => {
        const mockResponse = { data: { token: 'mockToken' } };
        mockApiPost.mockResolvedValueOnce(mockResponse);

        render(<AuthForm />);

        fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('ENTRAR'));

        await waitFor(() => expect(mockApiPost).toHaveBeenCalledTimes(1));
        expect(mockApiPost).toHaveBeenCalledWith('/auth/login', {
            login: 'test@example.com',
            password: 'password123',
        });
        expect(mockMessageSuccess).toHaveBeenCalledWith('Login realizado com sucesso!');
    });

    it('should show error message on login failure', async () => {
        mockApiPost.mockRejectedValueOnce(new Error('Invalid credentials'));

        render(<AuthForm />);

        fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText('ENTRAR'));

        await waitFor(() => expect(mockApiPost).toHaveBeenCalledTimes(1));
        expect(mockMessageError).toHaveBeenCalledWith('Email ou senha inválidos!');
    });

    it('should call api.post and show success message on register', async () => {
        mockApiPost.mockResolvedValueOnce({});

        render(<AuthForm />);

        fireEvent.click(screen.getByText('Registrar nova conta'));

        fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('REGISTRAR'));

        await waitFor(() => expect(mockApiPost).toHaveBeenCalledTimes(1));
        expect(mockApiPost).toHaveBeenCalledWith('/auth/register', {
            name: 'John Doe',
            login: 'john.doe@example.com',
            password: 'password123',
            role: '1',
        });
        expect(mockMessageSuccess).toHaveBeenCalledWith('Registro realizado com sucesso!');
    });

    it('should show error message on register failure', async () => {
        mockApiPost.mockRejectedValueOnce(new Error('Registration failed'));

        render(<AuthForm />);

        fireEvent.click(screen.getByText('Registrar nova conta'));

        fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('REGISTRAR'));

        await waitFor(() => expect(mockApiPost).toHaveBeenCalledTimes(1));
        expect(mockMessageError).toHaveBeenCalledWith('Erro ao registrar. Tente novamente!');
    });
});