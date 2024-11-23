import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import api from '../../service/api';

const { Title, Link } = Typography;

const LoginForm = () => {
    const onFinish = async (values: any) => {
        try {
            const response = await api.post('/auth/login', {
                login: values.email,
                password: values.password,
            });

            localStorage.setItem('token', response.data.token);

            message.success('Login realizado com sucesso!');
            window.location.href = '/projects';
        } catch (error: any) {
            console.error('Erro no login:', error);
            message.error('Email ou senha inválidos!');
        }
    };

    return (
        <div className="login-container">
            <Form
                className="login-form"
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Title level={2} className="title">
                    Faça seu login
                </Title>
                <Link href="/register" className="register-link">
                    Crie sua conta
                </Link>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Por favor, insira seu email!' },
                        { type: 'email', message: 'Insira um email válido!' },
                    ]}
                >
                    <Input placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                >
                    <Input.Password placeholder="Senha" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-button">
                        ENTRAR
                    </Button>
                </Form.Item>
                <Link href="/forgot-password" className="forgot-password">
                    Esqueci a senha
                </Link>
            </Form>
        </div>
    );
};

export default LoginForm;