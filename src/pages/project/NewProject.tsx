import React from 'react';
import { Form, Input, Button, Collapse, Col, Row } from 'antd';
import "./style.sass";

const { Panel } = Collapse;

const NewProject = () => {
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        console.log("Dados do novo projeto:", values);
    };

    return (
        <main id="main">
            <div className='new-project-container'>
                <h2>Novo Projeto</h2>
                <Collapse defaultActiveKey={['1']} accordion>
                    <Panel header="Informações" key="1">
                        <Form form={form} onFinish={handleSave} layout="vertical">
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
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Salvar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                </Collapse>
            </div>
        </main>
    );
};

export default NewProject;