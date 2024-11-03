import "./style.sass";
import { Button } from 'antd';
import { ITopButtons } from './ITopButtons';
import { PlusOutlined } from '@ant-design/icons';

const TopButtons = ({
    pageTitle,
    handleNew,
    mainButtonTitle,
}: ITopButtons) => {
    return (
        <div className='main-header'>
            <h2>{pageTitle}</h2>
            <div className='top-buttons'>
                <div className='top-buttons-right'>
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
