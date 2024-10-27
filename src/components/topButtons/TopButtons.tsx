import React from 'react'
import "./style.sass";
import { Button, Popconfirm } from 'antd';
import { Icon } from '@iconify/react';
import Search from 'antd/es/transfer/search';
import { ITopButtons } from './ITopButtons';

const TopButtons = ({
    pageTittle,
    mainButtonIcon = <Icon icon="akar-icons:circle-plus-fill" />,
    handleNew,
    disabledMainButton,
    mainButtonTitle,
    handleEdit,
    handleDelete,
    handleSearch,
    isEditable,
    isDeletable
}: ITopButtons) => {
    return (
        <div className='main-header'>
            <h2>{pageTittle}</h2>
            <div className='top-buttons'>
                <div className='top-buttons-left'>
                    <Button
                        icon={mainButtonIcon}
                        onClick={handleNew}
                        className="tp-main-button"
                        disabled={disabledMainButton}
                    // style={mainButtonStyles ? mainButtonStyles : null}
                    >
                        {mainButtonTitle}
                    </Button>
                    {handleEdit &&
                        <Button
                            className="top-tool-buttons edit"
                            onClick={handleEdit}
                            icon={<Icon icon="icomoon-free:pencil" />}
                            disabled={!isEditable}
                        />
                    }
                    {handleDelete &&
                        <Popconfirm
                            placement="bottom"
                            overlayClassName="popconfirm-delete"
                            title="Tem certeza que deseja deletar?"
                            onConfirm={handleDelete}
                            disabled={!isDeletable}
                            okText="Sim"
                            cancelText="Cancelar"
                            okButtonProps={{ danger: true, className: 'popconfirm-delete-button' }}
                        >
                            <Button
                                disabled={!isDeletable}
                                className="top-tool-buttons trash"
                                icon={<Icon icon="icomoon-free:bin" />}
                            />

                        </Popconfirm>
                    }
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
    )
}

export default TopButtons