import React, { useState } from 'react';
import { Col, Form, Input, Modal, Row } from 'antd';
import { ValueForm } from '../ICategory';

interface ICategoryModal {
    isModalVisible: boolean;
    handleSave: (data: ValueForm) => void;
    handleCancel: () => void;
    form: any;
}

const CategoryModal = ({ isModalVisible, handleSave, handleCancel, form }: ICategoryModal) => {
    const [editDisabled, setEditDisabled] = useState(false);

    return (
        <>
            <Modal
                width={400}
                title="Nova Categoria"
                open={isModalVisible}
                okButtonProps={{ htmlType: "submit", form: "new-form" }}
                onCancel={handleCancel}
                className="gs-modal"
                cancelText="Cancelar"
                okText="Salvar"
                centered
            >
                <Form
                    form={form}
                    name="new-form"
                    onFinish={(data: ValueForm) => {
                        setEditDisabled(false);
                        handleSave(data);
                    }}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Descrição"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default CategoryModal;