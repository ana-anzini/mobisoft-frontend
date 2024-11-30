import React, { useState, useEffect } from 'react';
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { NetworkType, PersonType, ValueForm } from '../ICostumer';
import ZipCodeSearch from '../../../components/CEPSearch';
import { networkTypeLabels, personTypeLabels } from './CostumerTable';
import MaskedInput from '../../../components/MaskedInput';

interface IEmployeesModal {
    isModalVisible: boolean;
    handleSave: (data: ValueForm) => void;
    handleCancel: () => void;
    form: any;
}

const EmployeesModal = ({ isModalVisible, handleSave, handleCancel, form }: IEmployeesModal) => {
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
                title="Novo Cliente"
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
                    layout="vertical"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Nome"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="cpfOrCnpj"
                                label="CPF/CNPJ"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <MaskedInput maskType="cpfCnpj" placeholder="Digite o CPF ou CNPJ" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="rg"
                                label="RG"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input maxLength={12} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="phone"
                                label="Telefone"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <MaskedInput maskType="telefone" placeholder="Digite o telefone" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="birthday"
                                label="Data de Aniversário"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: "Campo obrigatório", type: 'email' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="personType"
                                label="Tipo"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Select placeholder="Selecione um tipo">
                                    {Object.values(PersonType).map((type) => (
                                        <Select.Option key={type} value={type}>
                                            {personTypeLabels[type]}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="networkType"
                                label="Conheceu por"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Select placeholder="Selecione um tipo">
                                    {Object.values(NetworkType).map((type) => (
                                        <Select.Option key={type} value={type}>
                                            {networkTypeLabels[type]}
                                        </Select.Option>
                                    ))}
                                </Select>
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
                        <Col span={10}>
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
                        <Col span={5}>
                            <Form.Item
                                name="neighborhood"
                                label="Bairro"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                name="additional"
                                label="Complemento"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="notes"
                                label="Notas"
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

export default EmployeesModal;