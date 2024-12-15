import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Checkbox, message } from 'antd';
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

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        if (rememberedEmail && rememberedPassword) {
            form.setFieldsValue({ email: rememberedEmail, password: rememberedPassword });
        }
    }, []);

    const [form] = Form.useForm();

    const onLoginFinish = async (values: any) => {
        try {
            const response = await api.post('/auth/login', {
                login: values.email,
                password: values.password,
            });

            sessionStorage.setItem('token', response.data.token);

            if (values.remember) {
                localStorage.setItem('rememberedEmail', values.email);
                localStorage.setItem('rememberedPassword', values.password);
            } else {
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
            }

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
                name: values.name,
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
                    form={form}
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
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Lembrar e-mail e senha</Checkbox>
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
                                name="name"
                                rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
                            >
                                <Input placeholder="Nome" />
                            </Form.Item>
                            <Form.Item
                                name="login"
                                rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
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