import { useLocation } from "react-router-dom";
import { Menu, Dropdown, Avatar, Space, Form } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import "./style.sass";
import React, { useEffect, useState } from "react";
import api from "../../service/api";
import { ItemType } from "antd/es/menu/interface";

const Navbar = () => {
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

    async function checkAuthentication() {
        const request = await api.get("/auth/isAuthenticated")
        const isAuthenticated: boolean = request.data || false;
        setIsAuthenticated(isAuthenticated);
    }

    async function loadUser() {
        const request = await api.get("/auth/getInfo")

        if (request.status === 200) {
            const info = request.data;
            setUserName(info.name);
        }

    }

    const profileMenu: ItemType[] = [
        {
            key: "settings",
            icon: < SettingOutlined />,
            title: "Configurações"
        }
    ]

    return (
        <>
            {!isIndexPath &&
                <nav className='navbar'>
                    <div className="navbar-content">
                        <h1 style={{ color: "white" }}>MOBISOFT</h1>
                        <Dropdown menu={{ items: profileMenu }} placement="bottomRight" arrow>
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