import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Tabs } from 'antd';
import api from '../../service/api';
import FormFields from './components/FormFields';
import "./style.sass";

const { TabPane } = Tabs;

const EditProject: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [projectData, setProjectData] = useState<any>(null);

    useEffect(() => {
        if (id) {
            api.get(`/projects/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        setProjectData(response.data);
                        form.setFieldsValue(response.data);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao carregar dados do projeto:", error);
                });
        }
    }, [id]);

    const handleUpdate = (values: any) => {
        api.put(`/projects/${id}`, values)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Projeto atualizado com sucesso!");
                }
            })
            .catch((error) => {
                console.error("Erro ao atualizar o projeto:", error);
            });
    };

    return (
        <main id="main">
            <div className="edit-project-container">
                <h2>Editar Projeto</h2>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Informações" key="1">
                        <Form form={form} onFinish={handleUpdate} layout="vertical">
                            <FormFields form={form} {...projectData} />
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Atualizar
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    {/* Outras abas podem ser replicadas aqui */}
                </Tabs>
            </div>
        </main>
    );
};

export default EditProject;