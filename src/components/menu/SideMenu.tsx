import { Icon } from '@iconify/react';
import { Menu, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
        type: 'group',
        label: 'CADASTROS',
        children: [
            {
                key: '/suppliers',
                label: (
                    <Link to="/suppliers" className="rounded-item">
                        <Icon icon="carbon:enterprise" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Fornecedores
                    </Link>
                ),
            },
        ],
    },
    {
        type: 'group',
        label: 'NOVO',
        children: [
            {
                key: '/new',
                label: (
                    <Link to="/new" className="rounded-item">
                        <Icon icon="carbon:enterprise" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Novo
                    </Link>
                ),
            },
        ],
    },
];

export default function SideMenu() {
    const location = useLocation();

    return (
        <Menu
            style={{ width: 256 }}
            mode="inline"
            selectedKeys={[location.pathname]}
            items={items}
            id="main-menu"
        />
    );
}