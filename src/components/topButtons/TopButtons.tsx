import React from 'react';
import "./style.sass";
import { Button } from 'antd';
import { Icon } from '@iconify/react';
import Search from 'antd/es/transfer/search';
import { ITopButtons } from './ITopButtons';
import { PlusOutlined } from '@ant-design/icons';

const TopButtons = ({
    pageTittle,
    mainButtonIcon = <PlusOutlined />,
    handleNew,
    disabledMainButton,
    mainButtonTitle,
    handleSearch
}: ITopButtons) => {
    return (
        <div className='main-header'>
            <h2>{pageTittle}</h2>
            <div className='top-buttons'>
                <div className='top-buttons-right'>
                    <Button
                        icon={mainButtonIcon}
                        onClick={handleNew}
                        className="tp-main-button"
                        disabled={disabledMainButton}
                    >
                        {mainButtonTitle}
                    </Button>
                </div>
                {handleSearch &&
                    <div style={{ width: "300px" }}>
                        <Search
                            placeholder="Pesquisar"
                            onChange={handleSearch}
                        />
                    </div>}
            </div>
        </div>
    );
}

export default TopButtons;
