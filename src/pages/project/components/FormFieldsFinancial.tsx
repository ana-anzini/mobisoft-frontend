import React from 'react';
import { Form, Input, Select, Col, Row, Checkbox, InputNumber } from 'antd';
import { StatusType } from '../IProject';
import { statusTypeLabels } from './ProjectTable';

interface IFormFieldsFinancialProps {
    form: any;
}

const FormFields: React.FC<IFormFieldsFinancialProps> = ({ form }) => {
    return (
        <Row gutter={16}>
            <Col span={4}>
                <Form.Item
                    name="totalCusts"
                    label="Valor Total dos Produtos (R$)"
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        precision={2}
                        step={0.01}
                        placeholder="Digite o valor"
                        disabled={true}
                    />
                </Form.Item>
            </Col>
            <Col span={2}>
                <Form.Item
                    name="installmentNumber"
                    label="N. Parcelas"
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
                    name="firstPayment"
                    label="Primeiro Pagamento"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input type="date" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="paymentType"
                    label="Tipo de Pagamento"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Select placeholder="Selecione um tipo">
                    </Select>
                </Form.Item>
            </Col>
            <Col span={2}>
                <Form.Item
                    name="discount"
                    label="Desconto R$"
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
                    name="additionalExpenses"
                    label="Despesas Extras R$"
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
        </Row>
    );
};

export default FormFields;