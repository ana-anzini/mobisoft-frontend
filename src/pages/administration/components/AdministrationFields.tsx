import React from 'react';
import { Form, Input, Select, Col, Row, Checkbox, InputNumber } from 'antd';

interface IFormFieldsProps {
    form: any;
}

const FormFields: React.FC<IFormFieldsProps> = ({ form }) => {
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
        </Row>
    );
};

export default FormFields;