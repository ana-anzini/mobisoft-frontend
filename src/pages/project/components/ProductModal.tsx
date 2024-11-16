import React, { useState } from 'react';
import { Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { ValueFormProduct } from '../IProject';

interface IProductModal {
    isModalVisible: boolean;
}

const ProductModal = ({ isModalVisible }: IProductModal) => {
    const [editDisabled, setEditDisabled] = useState(false);

    return (
        <>
            <Modal
                width={800}
                title="Novo produto"
                open={isModalVisible}
                okButtonProps={{ htmlType: "submit", form: "new-form" }}
                className="gs-modal"
                cancelText="Cancelar"
                okText="Salvar"
                centered
            >
                <Form
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
                                <Select placeholder="Selecione" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="supplierId"
                                label="Fornecedor"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Select placeholder="Selecione" />
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