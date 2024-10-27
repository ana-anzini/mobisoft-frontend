import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, FormProps, Input, Modal, Row } from 'antd';
import { Notification } from '../../../components/notification/Notification';
import { DataType, ValueForm } from '../ISupplier';
import { Icon } from '@iconify/react';

interface ISupplierModal {
    isModalVisible: boolean;
    isNewRegistration: boolean;
    newRegistrationList: ValueForm[];
    handleSave: (data: ValueForm[]) => void;
    handleCancel: () => void;
    form: any;
    handleSubmit: (data: any) => void;
    setNewRegistrationList: (data: ValueForm[]) => void;
}

const SupplierModal = ({ isModalVisible, isNewRegistration, newRegistrationList, handleSave, handleCancel, form, handleSubmit, setNewRegistrationList }: ISupplierModal) => {

    const modalTitle = isNewRegistration ? "Novo fornecedor" : "Editar fornecedor";
    const [editDisebled, setEditDisebled] = useState(false);
    const [value, setValue] = useState('');

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleInputChange = (event: any) => {
        const inputValue = event.target.value;
        const telephoneValue = inputValue.replace(/\D/g, '');
        const formattedValue = formatTelephone(telephoneValue);

        setValue(formattedValue);
    };

    const formatTelephone = (value: string) => {
        const formattedValue = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        console.log(formattedValue);
        console.log(value);
        return formattedValue;
    };

    function handleEditListItem(supplier: ValueForm) {
        setEditDisebled(true);
        form.setFieldsValue({
            cpfOrCnpj: supplier.cpfOrCnpj,
            name: supplier.name,
            phone: supplier.phone,
        })
        handleDeleteListItem(supplier.cpfOrCnpj);
    }

    function handleDeleteListItem(code: string) {
        const suppliers = [...newRegistrationList];
        const i = suppliers.findIndex((supplier) => (supplier.cpfOrCnpj === code));
        suppliers.splice(i, 1);
        setNewRegistrationList(suppliers);
    }

    return (
        <>
            <Modal
                width={800}
                title="Fornecedores"
                open={isModalVisible}
                okButtonProps={!isNewRegistration ? { htmlType: "submit", form: "new-form" } : {}}
                onCancel={() => {
                    handleCancel()
                }}
                className="gs-modal link-account-modal"
                cancelText="Cancelar"
                okText="Salvar"
                onOk={() => {
                    if (isNewRegistration) {
                        if (newRegistrationList.length > 0) {
                            handleSave(newRegistrationList);
                        } else {
                            Notification({
                                type: 'warning',
                                message: 'Nenhum item adicionado a lista.'
                            })
                        }
                    }
                }}
                centered
            >
                <Form
                    form={form}
                    name="new-form"
                    className={isNewRegistration ? "form-new" : ""}
                    onFinish={(data) => {
                        setEditDisebled(false)
                        handleSubmit(data);
                    }}
                >
                    <Row>
                        <Col span={7} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="cpfOrCnpj"
                                label="CPF/CNPJ"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} style={{ marginRight: 20 }}>
                            <Form.Item
                                name="name"
                                label="Nome"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                name="phone"
                                label="Telefone"
                                rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Input value={value} onChange={handleInputChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div>
                        {isNewRegistration &&
                            <Button
                                style={{ marginTop: 20, marginLeft: "auto", marginRight: "20px" }}
                                type="default"
                                htmlType="submit"
                                className="gs-secondary-button"
                                icon={<Icon icon="akar-icons:circle-plus-fill" />}
                            >Adicionar à lista</Button>}
                    </div>
                </Form>
                {isNewRegistration &&
                    (newRegistrationList.length > 0 ?
                        <>
                            <div className="new-account-table-head">
                                <Row align="middle" gutter={2}>
                                    <Col span={7}>CPF/CNPJ</Col>
                                    <Col span={8}>Nome</Col>
                                    <Col span={7}>Telefone</Col>
                                    <Col span={1} />
                                    <Col span={1} />
                                </Row>
                            </div>
                            <div className="new-account-table-body">
                                {newRegistrationList.map((supplier) => {
                                    return (
                                        <Row key={supplier.cpfOrCnpj} align="middle" gutter={2}>
                                            <Col span={7}>{supplier.cpfOrCnpj}</Col>
                                            <Col span={8}>{supplier.name}</Col>
                                            <Col span={7}>{supplier.phone}</Col>
                                            <Col span={1}>
                                                <Button
                                                    disabled={editDisebled}
                                                    onClick={() => handleEditListItem(supplier)}
                                                    icon={<Icon className="edit-button" icon="material-symbols:edit-sharp" />}
                                                />
                                            </Col>
                                            <Col span={1}>
                                                <Icon
                                                    className="delete-icon"
                                                    onClick={() => handleDeleteListItem(supplier.cpfOrCnpj)}
                                                    icon="fa6-solid:trash"
                                                />
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </div>
                        </>
                        :
                        <div className="modal-list-empty">
                            <Icon icon="icomoon-free:file-empty" />
                            <p>Nenhum item adicionado à lista</p>
                        </div>
                    )
                }
            </Modal>
        </>
    );
};

export default SupplierModal;