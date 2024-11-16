import React from 'react';
import { Form, Input, Select, Col, Row, Checkbox } from 'antd';
import { StatusType } from '../IProject';
import { statusTypeLabels } from './ProjectTable';

interface IFormFieldsProps {
    form: any;
    costumerList: { value: string; label: string }[];
    projectDesignersList: { value: string; label: string }[];
    salespersonList: { value: string; label: string }[];
}

const FormFields: React.FC<IFormFieldsProps> = ({ form, costumerList, projectDesignersList, salespersonList }) => {
    return (
        <Row gutter={16}>
            <Col span={6}>
                <Form.Item
                    label="Descrição"
                    name="description"
                    rules={[{ required: true, message: 'Campo obrigatório' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name="costumerId"
                    label="Cliente"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Select
                        placeholder="Selecione"
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={costumerList}
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name="projectDesignerId"
                    label="Projetista"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Select
                        placeholder="Selecione"
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={projectDesignersList}
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name="sellerId"
                    label="Vendedor"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Select
                        placeholder="Selecione"
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={salespersonList}
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="referenceDate"
                    label="Data de Competência"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input type="date" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name="financialStatus"
                    label="Status Financeiro"
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
            <Col span={6}>
                <Form.Item
                    name="deliveryStatus"
                    label="Status Entrega"
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
            <Col span={6} className="checkbox-container">
                <Form.Item name="conclusionPending" valuePropName="checked">
                    <Checkbox>Pendente de conclusão</Checkbox>
                </Form.Item>
            </Col>
        </Row>
    );
};

export default FormFields;