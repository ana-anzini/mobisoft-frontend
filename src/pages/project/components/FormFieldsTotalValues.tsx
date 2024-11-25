import React from 'react';
import { Form, Input, Select, Col, Row, Checkbox, InputNumber, Divider, Typography, Button } from 'antd';
import { PaymentType, StatusType } from '../IProject';
import { statusTypeLabels } from './ProjectTable';
import ZipCodeSearch from '../../../components/CEPSearch';

const { Text } = Typography;

interface IFormFieldsTotalProps {
    form: any;
}

const FormFieldsTotalValues: React.FC<IFormFieldsTotalProps> = ({ form }) => {
    return (
        <Row gutter={16}>
            <Divider />
            <Col span={24}>
                <h3>Valores Finais</h3>
            </Col>
            <Col>
                <Form.Item
                    name="totalValue"
                    label="Valor total a ser pago pelo cliente"
                >
                    <Text>R$ 1000</Text>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="tax"
                    label="Impostos"
                >
                    <Text>R$ 1000</Text>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="totalProjectDesigner"
                    label="Projetista"
                >
                    <Text>R$ 1000</Text>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="totalSeller"
                    label="Vendedor"
                >
                    <Text>R$ 1000</Text>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="totalProfit"
                    label="Lucro"
                >
                    <Text>R$ 1000</Text>
                </Form.Item>
            </Col>
        </Row>
    );
};

export default FormFieldsTotalValues;