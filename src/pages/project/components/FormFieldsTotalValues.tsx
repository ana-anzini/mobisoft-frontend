import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Divider, Typography, Spin, message } from 'antd';
import { useParams } from 'react-router-dom';

const { Text } = Typography;

interface IFormFieldsTotalProps {
    form: any;
}

const FormFieldsTotalValues: React.FC<IFormFieldsTotalProps> = ({ form }) => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);

    return (
        <Row gutter={16}>
            <Divider />
            <Col span={24}>
                <h3>Valores Finais</h3>
            </Col>
            {loading ? (
                <Spin tip="Carregando valores..." />
            ) : (
                <>
                    <Col span={24}>
                        <Form.Item name="totalValue" label="Valor total a ser pago pelo cliente">
                            <Text>R$ {form.getFieldValue('totalValue')?.toFixed(2) || '0.00'}</Text>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="tax" label="Impostos">
                            <Text>R$ {form.getFieldValue('totalTax')?.toFixed(2) || '0.00'}</Text>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="totalProjectDesigner" label="Projetista">
                            <Text>R$ {form.getFieldValue('totalProjectDesigner')?.toFixed(2) || '0.00'}</Text>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="totalSeller" label="Vendedor">
                            <Text>R$ {form.getFieldValue('totalSeller')?.toFixed(2) || '0.00'}</Text>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="totalProfit" label="Lucro">
                            <Text>R$ {form.getFieldValue('totalProfit')?.toFixed(2) || '0.00'}</Text>
                        </Form.Item>
                    </Col>
                </>
            )}
        </Row>
    );
};

export default FormFieldsTotalValues;
