import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Switch } from 'antd';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Cadastros', 'sub1', <Icon icon="carbon:enterprise" style={{ fontSize: "20px" }} />, [
        getItem(<Link to="/suppliers" >Fornecedores</Link>, '1'),
    ]),
];

export default function SideMenu() {

    const location = useLocation();
    const isIndexPath = location.pathname === '/';

    const [theme, setTheme] = useState<MenuTheme>('light');
    const [current, setCurrent] = useState('1');

    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
    };

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            {!isIndexPath &&
                <Menu
                    theme={theme}
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    mode="inline"
                    items={items}
                    id="main-menu"
                />
            }
        </>
    );
};