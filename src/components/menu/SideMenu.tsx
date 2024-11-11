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
            {
                key: '/products',
                label: (
                    <Link to="/products" className="rounded-item">
                        <Icon icon="fluent:box-edit-20-filled" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Produtos
                    </Link>
                ),
            },
            {
                key: '/employees',
                label: (
                    <Link to="/employees" className="rounded-item">
                        <Icon icon="ion:people" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Colaboradores
                    </Link>
                ),
            },
            {
                key: '/costumers',
                label: (
                    <Link to="/costumers" className="rounded-item">
                        <Icon icon="ion:people" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Clientes
                    </Link>
                ),
            },
        ],
    },
    {
        type: 'group',
        label: 'Projetos',
        children: [
            {
                key: '/deliveries',
                label: (
                    <Link to="/deliveries" className="rounded-item">
                        <Icon icon="iconamoon:delivery-fill" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Entregas Agendadas
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