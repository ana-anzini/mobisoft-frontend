import "./style.sass";
import { Button, Input, Dropdown, MenuProps } from "antd";
import { ITopButtons } from "./ITopButtons";
import { DeleteOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";

const { Search } = Input;

const TopButtons = ({
    pageTitle,
    handleNew,
    mainButtonTitle,
    hasSelection,
    handleDelete,
    onSearch,
    showButton,
    onDownloadExample,
    onUploadCSV,
}: ITopButtons) => {
    const csvMenu: MenuProps["items"] = [
        {
            key: "1",
            label: "Exportar CSV Exemplo",
            onClick: onDownloadExample,
        },
        {
            key: "2",
            label: "Importar CSV",
            onClick: onUploadCSV,
        },
    ];

    return (
        <div className="main-header">
            <h2>{pageTitle}</h2>
            <div className="top-buttons">
                <div className="top-buttons-left">
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
                        style={{ width: 200, marginRight: "10px" }}
                    />
                    {(onDownloadExample || onUploadCSV) && (
                        <Dropdown menu={{ items: csvMenu }} trigger={["click"]}>
                            <Button className="tp-csv-button">
                                CSV <DownOutlined />
                            </Button>
                        </Dropdown>
                    )}
                    {showButton && (
                        <Button
                            icon={<PlusOutlined />}
                            onClick={handleNew}
                            className="tp-main-button"
                        >
                            {mainButtonTitle}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopButtons;