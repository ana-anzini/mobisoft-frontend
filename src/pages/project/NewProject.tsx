import React from 'react';
import { Form, Input, Button, Tabs, Col, Row, Select, Checkbox } from 'antd';
import "./style.sass";
import FormFields from './components/FormFields';
import ProductsTable from './components/ProductsTable';

const { TabPane } = Tabs;

interface INewProject {
    supplierList: any;
}

const NewProject = () => {
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        console.log("Dados do novo projeto:", values);
    };

    return (
        <main id="main">
            <div className='new-project-container'>
                <h2>Novo Projeto</h2>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Informações" key="1">
                        <Form form={form} onFinish={handleSave} layout="vertical">
                            <FormFields form={form} />
                        </Form>
                    </TabPane>
                    <TabPane tab="Ambientes" key="2">
                        <ProductsTable />
                    </TabPane>
                    <TabPane tab="Financeiro" key="3">
                        {/* Adicione aqui o conteúdo dos produtos */}
                    </TabPane>
                    <TabPane tab="Entregas" key="4">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Salvar
                            </Button>
                        </Form.Item>
                    </TabPane>
                </Tabs>
            </div>
        </main>
    );
};

export default NewProject;
