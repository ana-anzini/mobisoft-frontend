import React, { useState } from 'react';
import { Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { ValueForm } from '../IProduct';

interface IProductModal {
    isModalVisible: boolean;
    handleSave: (data: ValueForm) => void;
    handleCancel: () => void;
    form: any;
    categoryList: any;
    supplierList: any;
}

const ProductModal = ({ isModalVisible, handleSave, handleCancel, form, categoryList, supplierList }: IProductModal) => {
    const [editDisabled, setEditDisabled] = useState(false);

    return (
        <>
            <Modal
                width={800}
                title="Novo produto"
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
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                name="description"
                                label="Descrição"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="categoryId"
                                label="Categoria"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Select placeholder="Selecione" options={categoryList} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="supplierId"
                                label="Fornecedor"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Select placeholder="Selecione" options={supplierList} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="productValue"
                                label="Valor de Custo (R$)"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: "100%" }}
                                    precision={2}
                                    step={0.01}
                                    placeholder="Digite o valor"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default ProductModal;