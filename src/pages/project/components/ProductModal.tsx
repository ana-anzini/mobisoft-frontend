import React, { useState, useEffect } from 'react';
import { Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { ValueFormProduct } from '../IProject';
import api from '../../../service/api';

interface IProductModal {
    isModalVisible: boolean;
    handleCancel: () => void;
    handleSave: (data: ValueFormProduct) => void;
    form: any;
    categoryList: any;
}

interface Product {
    label: string;
    value: string;
}

const ProductModal = ({ isModalVisible, handleCancel, handleSave, form, categoryList }: IProductModal) => {
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
    const [productList, setProductList] = useState<Product[]>([]);
    const [editDisabled, setEditDisabled] = useState(false);

    const handleCategoryChange = (value: any) => {
        setCategoryId(value);
    };

    const loadProduct = (categoryId: string) => {
        api.get(`/products/findByCategory/${categoryId}`)
            .then((response) => {
                if (response.status === 200) {
                    const productData = response.data.map((item: any) => ({
                        label: item.description,
                        value: item.id,
                    }));
                    setProductList(productData);
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar produtos:", err);
            });
    };

    useEffect(() => {
        if (categoryId) {
            form.setFieldsValue({ productId: undefined });
            loadProduct(categoryId);
        } else {
            setProductList([]);
        }
    }, [categoryId, form]);

    const handleModalClose = () => {
        form.resetFields();
        setCategoryId(undefined);
        handleCancel();
    };

    return (
        <Modal
            width={600}
            title="Novo produto"
            open={isModalVisible}
            okButtonProps={{ htmlType: "submit", form: "new-form" }}
            onCancel={handleModalClose}
            className="gs-modal"
            cancelText="Cancelar"
            okText="Salvar"
            centered
        >
            <Form
                form={form}
                name="new-form"
                onFinish={(data: ValueFormProduct) => {
                    setEditDisabled(false);
                    handleSave(data);
                }}
            >
                <Row gutter={16}>
                    <Col span={10}>
                        <Form.Item
                            name="categoryId"
                            label="Categoria"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Select
                                placeholder="Selecione"
                                options={categoryList}
                                onChange={handleCategoryChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={14}>
                        <Form.Item
                            name="productId"
                            label="Produto/Ambiente"
                            rules={[
                                {
                                    required: !!categoryId,
                                    message: "Campo obrigatório",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Selecione"
                                disabled={!categoryId}
                                options={productList}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ProductModal;