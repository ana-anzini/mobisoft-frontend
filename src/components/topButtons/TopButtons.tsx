import "./style.sass";
import { Button } from 'antd';
import { ITopButtons } from './ITopButtons';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const TopButtons = ({
    pageTitle,
    handleNew,
    mainButtonTitle,
    hasSelection,
}: ITopButtons) => {
    return (
        <div className='main-header'>
            <h2>{pageTitle}</h2>
            <div className='top-buttons'>
                <div className='top-buttons-left'>
                    {hasSelection && (
                        <Button
                            icon={<DeleteOutlined />}
                            //onClick={handleDeleteSelected}
                            className="tp-delete-button"
                        />
                    )}
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
