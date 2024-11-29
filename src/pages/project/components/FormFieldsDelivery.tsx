import React from 'react';
import { Form, Input, Select, Col, Row, Checkbox, InputNumber, Divider, Typography, Button } from 'antd';
import { PaymentType, StatusType } from '../IProject';
import { statusTypeLabels } from './ProjectTable';
import ZipCodeSearch from '../../../components/CEPSearch';

const { Text } = Typography;

interface IFormFieldsDeliveryProps {
    form: any;
}

const FormFieldsDelivery: React.FC<IFormFieldsDeliveryProps> = ({ form }) => {
    const handleAddressChange = (address: string, neighborhood: string) => {
        form.setFieldsValue({ address, neighborhood });
    };

    return (
        <Row gutter={16}>
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
            <Col span={6}>
                <Form.Item
                    name="address"
                    label="Endereço"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={2}>
                <Form.Item
                    name="number"
                    label="Número"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="neighborhood"
                    label="Bairro"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="additional"
                    label="Complemento"
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="deliveryDate"
                    label="Data de Entrega"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input type="datetime-local" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="freight"
                    label="Frete R$"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Digite o valor"
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default FormFieldsDelivery;