import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import "./style.sass";
import { Avatar, Dropdown, MenuProps } from 'antd';

const Navbar = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const isIndexPath = location.pathname === '/';

    const items: MenuProps['items'] = [
        // {
        //     key: '1',
        //     label: (
        //         <a onClick={handleChangePassword}>
        //             Trocar senha
        //         </a>
        //     )
        // },
        // {
        //     key: '2',
        //     label: (
        //         <a onClick={handleLogOut}>
        //             Sair
        //         </a>
        //     )
        // }
    ];

    return (
        <>
            {!isIndexPath &&
                <nav className='navbar'>
                    <h1 style={{ color: "white" }}>MOBISOFT</h1>
                </nav>}
        </>
    )
}

export default Navbar