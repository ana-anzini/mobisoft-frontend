import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import api from '../../service/api';
import './login.sass';

const { Title, Link } = Typography;

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            mainContainer.style.display = 'block';
        }

        return () => {
            if (mainContainer) {
                mainContainer.style.display = '';
            }
        };
    }, []);

    const onLoginFinish = async (values: any) => {
        try {
            const response = await api.post('/auth/login', {
                login: values.email,
                password: values.password,
            });

            sessionStorage.setItem('token', response.data.token);

            message.success('Login realizado com sucesso!');
            window.location.href = '/projects';
        } catch (error) {
            console.error('Erro no login:', error);
            message.error('Email ou senha inválidos!');
        }
    };

    const onRegisterFinish = async (values: any) => {
        try {
            await api.post('/auth/register', {
                login: values.login,
                password: values.password,
                role: "1",
            });

            message.success('Registro realizado com sucesso!');
            setIsLogin(true);
        } catch (error) {
            console.error('Erro no registro:', error);
            message.error('Erro ao registrar. Tente novamente!');
        }
    };

    return (
        <div className="login-page">
            <div className="login-column">
                <Form
                    className="auth-form"
                    name={isLogin ? 'login' : 'register'}
                    initialValues={{ remember: true }}
                    onFinish={isLogin ? onLoginFinish : onRegisterFinish}
                    autoComplete="off"
                >
                    <Title level={2} className="title">
                        {isLogin ? 'Faça seu login' : 'Crie sua conta'}
                    </Title>
                    {isLogin ? (
                        <>
                            <Link onClick={() => setIsLogin(false)} className="register-link">
                                <span>Registrar nova conta</span>
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
                        </>
                    ) : (
                        <>
                            <Link onClick={() => setIsLogin(true)} className="login-link">
                                <span>Já tem uma conta? Faça login</span>
                            </Link>
                            <Form.Item
                                name="login"
                                rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
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
                                <Button type="primary" htmlType="submit" className="register-button">
                                    REGISTRAR
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </div>

            <div className="image-column">
                <div className="content"></div>
            </div>
        </div>
    );
};

export default AuthForm;