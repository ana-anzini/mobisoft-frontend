import React, { useState, useEffect } from 'react';
import { Form, Button, Tabs } from 'antd';
import "./style.sass";
import FormFields from './components/FormFields';
import ProductsTable from './components/ProductsTable';
import api from '../../service/api';

const { TabPane } = Tabs;

const NewProject: React.FC = () => {
    const [form] = Form.useForm();
    const [costumerList, setCostumerList] = useState([]);

    useEffect(() => {
        api.get("/costumers")
            .then((response) => {
                if (response.status === 200) {
                    const costumers = response.data.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    setCostumerList(costumers);
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar clientes:", err);
            });
    }, []);

    const handleSave = (values: any) => {
        console.log("Dados do novo projeto:", values);
    };

    return (
        <main id="main">
            <div className="new-project-container">
                <h2>Novo Projeto</h2>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Informações" key="1">
                        <Form form={form} onFinish={handleSave} layout="vertical">
                            <FormFields form={form} costumerList={costumerList} />
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Salvar
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Ambientes" key="2">
                        <ProductsTable />
                    </TabPane>
                    <TabPane tab="Financeiro" key="3">
                    </TabPane>
                    <TabPane tab="Entregas" key="4">
                    </TabPane>
                </Tabs>
            </div>
        </main>
    );
};

export default NewProject;