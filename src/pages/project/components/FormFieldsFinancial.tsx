import React from 'react';
import { Form, Input, Select, Col, Row, Checkbox, InputNumber, Divider, Typography, Button } from 'antd';
import { PaymentType, StatusType } from '../IProject';
import { statusTypeLabels } from './ProjectTable';

const { Text } = Typography;

interface IFormFieldsFinancialProps {
    form: any;
}

export const paymentTypeLabels: { [key in PaymentType]: string } = {
    [PaymentType.CREDIT]: 'Crédito',
    [PaymentType.DEBIT]: 'Débito',
    [PaymentType.INSTALLMENT_BOOK]: 'Carnê',
    [PaymentType.CHECK]: 'Cheque',
};

const FormFields: React.FC<IFormFieldsFinancialProps> = ({ form }) => {
    return (
        <Row gutter={16}>
            <Col span={4}>
                <Form.Item
                    name="totalCusts"
                    label="Valor Total dos Produtos (R$)"
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        readOnly
                        disabled={true}
                    />
                </Form.Item>
            </Col>
            <Col span={2}>
                <Form.Item
                    name="installmentNumber"
                    label="N. Parcelas"
                    rules={[
                        { required: true, message: "Campo obrigatório" },
                        {
                            type: "integer",
                            message: "Apenas valores inteiros são permitidos!",
                        },
                    ]}
                >
                    <InputNumber
                        min={0}
                        max={24}
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
                        {Object.values(PaymentType).map((type) => (
                            <Select.Option key={type} value={type}>
                                {paymentTypeLabels[type]}
                            </Select.Option>
                        ))}
                    </Select>
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
        </Row>
    );
};

export default FormFields;