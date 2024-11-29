import React from 'react';
import { Form, Input, Select, Col, Row, Checkbox, InputNumber, Divider } from 'antd';

interface IAdministrationFieldsProps {
}

const AdministrationFields: React.FC<IAdministrationFieldsProps> = () => {
    return (
        <Row gutter={16}>
            <Col span={4}>
                <Form.Item
                    name="additionalFinancial"
                    label="% Lucro"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Digite o valor"
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="tax"
                    label="% Imposto"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Digite o valor"
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="additionalProjectDesigner"
                    label="% Projetista"
                    rules={[{ required: false, message: "Campo obrigatório" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Digite o valor"
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="additionalSeller"
                    label="% Vendedor"
                    rules={[{ required: false, message: "Campo obrigatório" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Digite o valor"
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="additionalAssembler"
                    label="% Montador"
                    rules={[{ required: false, message: "Campo obrigatório" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Digite o valor"
                    />
                </Form.Item>
            </Col>
            <Divider />
            <Col span={24}>
                <h2>Dados da Empresa</h2>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="companyName"
                    label="Nome da Empresa"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input placeholder="Digite o nome da empresa" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="socialReason"
                    label="Razão Social"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input placeholder="Digite a razão social" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name="address"
                    label="Endereço"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input placeholder="Digite o endereço" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="phone"
                    label="Telefone"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input placeholder="Digite o telefone" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input placeholder="Digite o email" />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default AdministrationFields;