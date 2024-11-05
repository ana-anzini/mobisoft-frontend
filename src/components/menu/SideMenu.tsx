import { Icon } from '@iconify/react';
import { Menu, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
        type: 'group',
        label: 'Cadastros',
        children: [
            {
                key: '/suppliers',
                label: (
                    <Link to="/suppliers" className="rounded-item">
                        <Icon icon="mingcute:box-3-fill" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Fornecedores
                    </Link>
                ),
            },
            {
                key: '/categories',
                label: (
                    <Link to="/categories" className="rounded-item">
                        <Icon icon="tabler:tags-filled" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Categorias
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