import { Icon } from '@iconify/react';
import { Menu, MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const items = (handleLogout: () => void): MenuProps['items'] => [
    {
        type: 'group',
        label: 'Cadastros',
        children: [
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
                key: '/suppliers',
                label: (
                    <Link to="/suppliers" className="rounded-item">
                        <Icon icon="mingcute:box-3-fill" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Fornecedores
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
                        <Icon icon="tabler:user-filled" style={{ fontSize: '20px', marginRight: '8px' }} />
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
            {
                key: '/projects',
                label: (
                    <Link to="/projects" className="rounded-item">
                        <Icon icon="fluent:table-edit-28-filled" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Projetos
                    </Link>
                ),
            },
        ],
    },
    {
        type: 'group',
        label: 'Administração',
        children: [
            {
                key: '/administration',
                label: (
                    <Link to="/administration" className="rounded-item">
                        <Icon icon="icon-park-solid:percentage" style={{ fontSize: '20px', marginRight: '8px' }} />
                        Administração
                    </Link>
                ),
            },
        ],
    },
    {
        key: 'divider',
        type: 'divider',
        style: { margin: '8px 0' },
    },
    {
        key: 'logout',
        label: (
            <span style={{ display: 'flex', alignItems: 'center', color: '#FE5751' }}>
                <Icon icon="mdi:logout" style={{ fontSize: '20px', marginRight: '8px' }} />
                Sair
            </span>
        ),
        onClick: handleLogout,
    }
];

export default function SideMenu() {
    const currentLocation = useLocation();
    const navigate = useNavigate();

    const isProjectRoute = ['/projects', '/new-project', '/edit-project'].some(route =>
        currentLocation.pathname.startsWith(route)
    );

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Menu
            style={{ width: 256 }}
            mode="inline"
            selectedKeys={isProjectRoute ? ['/projects'] : [currentLocation.pathname]}
            items={items(handleLogout)}
            id="main-menu"
        />
    );
}