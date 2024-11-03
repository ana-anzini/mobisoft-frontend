import "./style.sass";
import { Button, Input } from 'antd';
import { ITopButtons } from './ITopButtons';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const TopButtons = ({
    pageTitle,
    handleNew,
    mainButtonTitle,
    hasSelection,
    handleDelete,
    onSearch,
}: ITopButtons) => {
    return (
        <div className='main-header'>
            <h2>{pageTitle}</h2>
            <div className='top-buttons'>
                <div className='top-buttons-left'>
                    {hasSelection && (
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete()}
                            className="tp-delete-button"
                        />
                    )}
                    <Search
                        placeholder="Buscar"
                        onChange={(e) => onSearch(e.target.value)}
                        className="tp-search-input"
                        style={{ width: 200, marginRight: '10px' }}
                    />
                    <Button
                        icon={<PlusOutlined />}
                        onClick={handleNew}
                        className="tp-main-button"
                    >
                        {mainButtonTitle}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TopButtons;
