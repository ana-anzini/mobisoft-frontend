import React, { useState } from 'react';
import { Button, Checkbox, Form, FormProps, Input, Modal } from 'antd';
import { Notification } from '../../../components/notification/Notification';
import { DataType, ValueForm } from '../ISupplier';

interface ISupplierModal {
    isModalVisible: boolean;
    isNewRegistration: boolean;
    newRegistrationList: ValueForm[];
    handleSave: (data: ValueForm[]) => void;
    handleCancel: () => void;
}

const SupplierModal = ({ isModalVisible, isNewRegistration, newRegistrationList, handleSave, handleCancel }: ISupplierModal) => {

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

    return (
        <>
            <Modal
                title="Basic Modal"
                open={isModalVisible}
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
                onCancel={handleCancel}
                okButtonProps={!isNewRegistration ? { htmlType: "submit", form: "new-form" } : {}}
            >
                <Form
                    name="new-form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
};

export default SupplierModal;