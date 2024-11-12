import React, { useState, useEffect } from 'react';
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { StatusType, ValueForm } from '../IDeliveries';
import ZipCodeSearch from '../../../components/CEPSearch';
import { statusTypeLabels } from './DeliveriesTable';

interface IDeliveriesModal {
    isModalVisible: boolean;
    handleSave: (data: ValueForm) => void;
    handleCancel: () => void;
    form: any;
    projectList: any;
}

const DeliveriesModal = ({ isModalVisible, handleSave, handleCancel, form, projectList }: IDeliveriesModal) => {
    const [editDisabled, setEditDisabled] = useState(false);
    const [cep, setCep] = useState('');

    const handleAddressChange = (address: string, neighborhood: string) => {
        form.setFieldsValue({ address, neighborhood });
    };

    useEffect(() => {
        if (isModalVisible) {
            setCep(form.getFieldValue('cep') || '');
        }
    }, [isModalVisible, form]);

    return (
        <>
            <Modal
                width={800}
                title="Entrega Agendada"
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
                        <Col span={8}>
                            <Form.Item
                                name="projectDescription"
                                label="Projeto"
                            >
                                <Select placeholder="Selecione" options={projectList} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="cep"
                                label="CEP"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <ZipCodeSearch
                                    onAddressChange={handleAddressChange}
                                    value={form.getFieldValue('cep')}
                                    onChange={(cep) => form.setFieldsValue({ cep })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="address"
                                label="Endereço"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="number"
                                label="Número"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={4}>
                            <Form.Item
                                name="neighborhood"
                                label="Bairro"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="additional"
                                label="Complemento"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="deliveryDate"
                                label="Data de Entrega"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="statusType"
                                label="Tipo"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Select placeholder="Selecione um tipo">
                                    {Object.values(StatusType).map((type) => (
                                        <Select.Option key={type} value={type}>
                                            {statusTypeLabels[type]}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default DeliveriesModal;