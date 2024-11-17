import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Tabs } from 'antd';
import api from '../../service/api';
import FormFields from './components/FormFields';
import { PlusOutlined } from '@ant-design/icons';
import "./style.sass";
import { DataTypeProduct, ValueFormProduct } from './IProject';
import { Notification } from '../../components/notification/Notification';
import { TableRowSelection } from 'antd/es/table/interface';
import ProductsTable from './components/ProductsTable';
import ProductModal from './components/ProductModal';

const { TabPane } = Tabs;

const EditProject: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [projectData, setProjectData] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [editingCategoryId, setEditingCategoryId] = useState<React.Key | null>(null);
    const [tableData, setTableData] = useState<DataTypeProduct[]>([]);
    const [loadingTableData, setLoadingTableData] = useState(true);
    const [selectedRows, setSelectedRows] = useState<DataTypeProduct[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [filteredData, setFilteredData] = useState<DataTypeProduct[]>([]);

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

    const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: DataTypeProduct[]) => {
        setSelectedRows(newSelectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
    };


    const rowSelection: TableRowSelection<DataTypeProduct> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function loadTableData() {
        api.get("/categories/findAll").then((response) => {
            if (response.status === 200) {
                const dataTable = response.data.map((item: any) => ({
                    key: item.id,
                    description: item.description
                }));
                setTableData(dataTable);
                setLoadingTableData(false);
            }
        }).catch((err) => {
            console.error("Erro ao carregar dados");
        });
    }

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

    function onSave(response: any) {
        if (response) {
            Notification({
                type: "success",
                message: "Salvo com sucesso",
            });
        }
        loadTableData();
    }

    function handleSaveProject(data: ValueFormProduct) {
        form.resetFields();
        const dataToSave = {
            id: isNewRegistration ? null : editingCategoryId,
            description: data.description,
        };

        if (isNewRegistration) {
            api.post("/categories", dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao salvar o categoria:", error);
                });
        } else {
            const categoryId = dataToSave.id;
            api.put(`/categories/${categoryId}`, dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao atualizar o categoria:", error);
                });
        }

        setSelectedRowKeys([]);
        setSelectedRows([]);
        setIsModalVisible(false);
    }

    function handleCloseModal() {
        setSelectedRowKeys([]);
        setSelectedRows([]);
        form.resetFields();
        setIsModalVisible(false);
    }

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
                    <TabPane tab="Ambientes" key="2">
                        <div className="top-buttons">
                            <Button
                                icon={<PlusOutlined />}
                                className="tp-main-button"
                                onClick={() => setIsModalVisible(true)}
                            >
                                {"Novo Ambiente"}
                            </Button>
                            <ProductsTable
                                loading={loadingTableData}
                                tableData={filteredData}
                                rowSelection={rowSelection}
                            />
                            <ProductModal
                                isModalVisible={isModalVisible}
                                handleSaveProduct={handleSaveProject}
                                handleCancel={handleCloseModal}
                                form={form}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Financeiro" key="3">
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

export default EditProject;