import { useLocation } from "react-router-dom";
import { Menu, Dropdown, Avatar, Space, Form } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import "./style.sass";
import { useEffect, useState } from "react";
import api from "../../service/api";

const Navbar = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const isIndexPath = location.pathname === '/';
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        checkAuthentication();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            loadUser();
        }
    }, [isAuthenticated]);

    function checkAuthentication() {
        api.get("/auth/isAuthenticated")
            .then((response) => {
                setIsAuthenticated(response.data);
            })
            .catch(() => {
                setIsAuthenticated(false);
                console.error("Erro ao verificar autenticação");
            });
    }

    function loadUser() {
        api.get("/auth/getInfo")
            .then((response) => {
                if (response.status === 200) {
                    const info = response.data;
                    setUserName(info.name);
                    form.setFieldsValue(info);
                }
            })
            .catch(() => {
                console.error("Erro ao carregar dados do usuário");
            });
    }

    const profileMenu = (
        <Menu>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                Configurações
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {!isIndexPath &&
                <nav className='navbar'>
                    <div className="navbar-content">
                        <h1 style={{ color: "white" }}>MOBISOFT</h1>
                        <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
                            <Space>
                                <Avatar icon={<UserOutlined />} />
                                <span style={{ color: "white" }}>{userName || 'Usuário'}</span>
                            </Space>
                        </Dropdown>
                    </div>
                </nav>}
        </>
    );
}

export default Navbar;