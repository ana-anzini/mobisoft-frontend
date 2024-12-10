import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { ValueForm } from '../ISupplier';
import ZipCodeSearch from '../../../components/CEPSearch';
import MaskedInput from '../../../components/MaskedInput';

interface ISupplierModal {
    isModalVisible: boolean;
    handleSave: (data: ValueForm) => void;
    handleCancel: () => void;
    form: any;
    categoryList: any;
}

const validateCPF = (cpf: string): boolean => {
    const onlyNumbers = cpf.replace(/\D/g, '');
    if (onlyNumbers.length !== 11 || /^(\d)\1+$/.test(onlyNumbers)) {
        return false;
    }

    const calculateDigit = (cpf: string, factor: number) => {
        let sum = 0;
        for (let i = 0; i < factor - 1; i++) {
            sum += parseInt(cpf[i]) * (factor - i);
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstDigit = calculateDigit(onlyNumbers, 10);
    const secondDigit = calculateDigit(onlyNumbers, 11);

    return (
        firstDigit === parseInt(onlyNumbers[9]) &&
        secondDigit === parseInt(onlyNumbers[10])
    );
};

const validateCNPJ = (cnpj: string): boolean => {
    const onlyNumbers = cnpj.replace(/\D/g, '');
    if (onlyNumbers.length !== 14 || /^(\d)\1+$/.test(onlyNumbers)) {
        return false;
    }

    const calculateDigit = (cnpj: string, factor: number[]) => {
        let sum = 0;
        for (let i = 0; i < factor.length; i++) {
            sum += parseInt(cnpj[i]) * factor[i];
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstFactor = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondFactor = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const firstDigit = calculateDigit(onlyNumbers, firstFactor);
    const secondDigit = calculateDigit(onlyNumbers, secondFactor);

    return (
        firstDigit === parseInt(onlyNumbers[12]) &&
        secondDigit === parseInt(onlyNumbers[13])
    );
};

const SupplierModal = ({ isModalVisible, handleSave, handleCancel, form, categoryList }: ISupplierModal) => {
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
                title="Fornecedores"
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
                        <Col span={7} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="cpfOrCnpj"
                                label="CPF/CNPJ"
                                rules={[
                                    { required: true, message: "Campo obrigatório" },
                                    {
                                        validator: (_, value) => {
                                            const onlyNumbers = value?.replace(/\D/g, '') || '';
                                            if (onlyNumbers.length === 11) {
                                                return validateCPF(onlyNumbers)
                                                    ? Promise.resolve()
                                                    : Promise.reject(new Error('CPF inválido'));
                                            } else if (onlyNumbers.length === 14) {
                                                return validateCNPJ(onlyNumbers)
                                                    ? Promise.resolve()
                                                    : Promise.reject(new Error('CNPJ inválido'));
                                            } else {
                                                return Promise.reject(new Error('CPF ou CNPJ inválido'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                <MaskedInput maskType="cpfCnpj" placeholder="Digite o CPF ou CNPJ" />
                            </Form.Item>
                        </Col>
                        <Col span={8} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="name"
                                label="Nome"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                name="phone"
                                label="Telefone"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <MaskedInput maskType="telefone" placeholder="Digite o telefone" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="categoryId"
                                label="Categoria"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Select placeholder="Selecione" options={categoryList} />
                            </Form.Item>
                        </Col>
                        <Col span={9} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[{ required: true, message: "Campo obrigatório" }, { type: 'email', message: 'E-mail inválido' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
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
                    </Row>
                    <Row>
                        <Col span={12} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="address"
                                label="Endereço"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={5} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="number"
                                label="Número"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={5} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="neighborhood"
                                label="Bairro"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={23} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="additional"
                                label="Complemento"
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

export default SupplierModal;