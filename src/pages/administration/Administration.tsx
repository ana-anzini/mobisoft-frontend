import React, { useState, useEffect } from 'react';
import { Form, Button, Tabs, Divider } from 'antd';
import FormFields from './components/AdministrationFields';
import api from '../../service/api';
import { DataType, ValueForm, } from './IAdministration';
import { Notification } from '../../components/notification/Notification';
import moment from 'moment';

const NewProject: React.FC = () => {
    const [form] = Form.useForm();
    const [administrationData, setAdministrationData] = useState<any>(null);
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [editingAdministrationId, setEditingAdministrationId] = useState<React.Key | null>(null);

    useEffect(() => {
        loadFormAdministration();
    }, []);

    function loadFormAdministration() {
        api.get("/administration").then((response) => {
            if (response.status === 200) {
                const administration = response.data;
                setAdministrationData(administration);
                form.setFieldsValue(administration);
            }
        }).catch((err) => {
            console.error("Erro ao carregar dados");
        });
    }

    function handleSave(data: ValueForm) {
        const dataToSave = {
            id: isNewRegistration ? null : editingAdministrationId,
            tax: data.tax,
            additionalFinancial: data.additionalFinancial,
            additionalSeller: data.additionalSeller,
            additionalProjectDesigner: data.additionalProjectDesigner,
            additionalAssembler: data.additionalAssembler,
            companyName: data.companyName,
            socialReason: data.socialReason,
            address: data.address,
            phone: data.phone,
            email: data.email,
        };

        api.put(`/administration`, dataToSave)
            .then((response) => {
                if (response.status === 200) {
                    Notification({ type: "success", message: "Informações atualizadas com sucesso!" });
                }
            })
            .catch((error) => {
                console.error("Erro ao atualizar as informações:", error);
            });
    }

    return (
        <main id="main">
            <div className="new-project-container">
                <h2>Administração</h2>
                <Form form={form} onFinish={handleSave} layout="vertical">
                    <FormFields
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