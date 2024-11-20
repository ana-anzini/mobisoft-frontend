import React, { useState, useEffect } from 'react';
import { Form, Button, Tabs } from 'antd';
import FormFields from './components/AdministrationFields';
import api from '../../service/api';
import { DataType, ValueForm, } from './IAdministration';
import { Notification } from '../../components/notification/Notification';

const NewProject: React.FC = () => {
    const [form] = Form.useForm();
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [editingAdministrationId, setEditingAdministrationId] = useState<React.Key | null>(null);

    useEffect(() => {

    }, []);

    /*function loadForm(projectId: string) {
        api.get(`/projects/${projectId}`)
            .then((response) => {
                if (response.status === 200) {
                    const project = response.data;

                    const treatedData = {
                        costumerId: project.costumer.id,
                        projectDesignerId: project.projectDesigner.id,
                        sellerId: project.seller.id,
                        ...project,
                        referenceDate: moment(project.referenceDate).format("YYYY-MM-DD"),
                    };

                    setProjectData(treatedData);
                    form.setFieldsValue(treatedData);
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar dados do projeto:", error);
            });
    }*/

    function handleSave(data: ValueForm) {
        form.resetFields();
        const dataToSave = {
            id: isNewRegistration ? null : editingAdministrationId,
            tax: data.tax,
            additionalFinancial: data.additionalFinancial,
            additionalSeller: data.additionalSeller,
            additionalProjectDesigner: data.additionalProjectDesigner,
            additionalAssembler: data.additionalAssembler,
        };

        if (isNewRegistration) {
            api.post("/administration", dataToSave)
                .then((response) => {
                    if (response.status === 201) {
                        Notification({ type: "success", message: "Informações salvas com sucesso!" });
                    }
                })
                .catch((error) => {
                    console.error("Erro ao salvar as informações:", error);
                });
        } else {
            const administration = dataToSave.id;
            api.put(`/administration/${administration}`, dataToSave)
                .then((response) => {
                    if (response.status === 200) {
                        Notification({ type: "success", message: "Informações atualizadas com sucesso!" });
                    }
                })
                .catch((error) => {
                    console.error("Erro ao atualizar as informações:", error);
                });
        }
    }

    return (
        <main id="main">
            <div className="new-project-container">
                <h2>Administração</h2>
                <Form form={form} onFinish={handleSave} layout="vertical">
                    <FormFields
                        form={form}
                    />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </main>
    );
};

export default NewProject;