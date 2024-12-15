import React, { useState } from "react";
import { Modal, Upload, Button, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface ImportCSVModalProps {
    isVisible: boolean;
    onClose: () => void;
    onImport: (file: File) => void;
}

const ImportCSVModal: React.FC<ImportCSVModalProps> = ({ isVisible, onClose, onImport }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = ({ file }: any) => {
        setFile(file);
    };

    const handleImport = () => {
        if (file) {
            onImport(file);
            notification.success({
                message: "Importação Iniciada",
                description: "O arquivo está sendo processado.",
            });
            onClose();
        } else {
            notification.error({
                message: "Erro",
                description: "Por favor, selecione um arquivo antes de importar.",
            });
        }
    };

    return (
        <Modal
            title="Importar CSV"
            visible={isVisible}
            onCancel={onClose}
            onOk={handleImport}
            okText="Importar"
            cancelText="Cancelar"
        >
            <Upload
                accept=".csv"
                beforeUpload={() => false}
                onChange={handleUpload}
                maxCount={1}
            >
                <Button icon={<UploadOutlined />}>Selecionar Arquivo CSV</Button>
            </Upload>
        </Modal>
    );
};

export default ImportCSVModal;