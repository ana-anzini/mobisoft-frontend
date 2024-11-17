import React, { useState, useEffect } from 'react';
import { Form, Button, Tabs } from 'antd';
import "./style.sass";
import FormFields from './components/FormFields';
import ProductsTable from './components/ProductsTable';
import api from '../../service/api';
import { DataType, StatusType, ValueForm, ValueFormProduct } from './IProject';
import { TableRowSelection } from 'antd/es/table/interface';
import { PlusOutlined } from '@ant-design/icons';
import ProductModal from './components/ProductModal';
import { Notification } from '../../components/notification/Notification';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

export const statusTypeLabels: { [key in StatusType]: string } = {
    [StatusType.PENDING]: 'Pendente',
    [StatusType.PROCESSING]: 'Em processamento',
    [StatusType.SHIPPED]: 'Enviado',
    [StatusType.DELIVERED]: 'Entregue',
    [StatusType.CANCELLED]: 'Cancelado',
};

const NewProject: React.FC = () => {
    const [form] = Form.useForm();
    const [costumerList, setCostumerList] = useState([]);
    const [projectDesignersList, setProjectDesignersList] = useState([]);
    const [salespersonList, setSalespersonList] = useState([]);
    const [loadingTableData, setLoadingTableData] = useState(true);
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [editingCategoryId, setEditingCategoryId] = useState<React.Key | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadCostumers();
        loadProjectDesigners();
        loadSalesperson();
    }, []);

    const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: DataType[]) => {
        setSelectedRows(newSelectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
    };


    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function loadCostumers() {
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
    }


    function loadProjectDesigners() {
        api.get("employees/findByType?type=PROJECT_DESIGNER")
            .then((response) => {
                if (response.status === 200) {
                    const projectDesigners = response.data.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    setProjectDesignersList(projectDesigners);
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar projetistas:", err);
            });
    }

    function loadSalesperson() {
        api.get("employees/findByType?type=SALESPERSON")
            .then((response) => {
                if (response.status === 200) {
                    const salespersons = response.data.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    setSalespersonList(salespersons);
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar vendedores:", err);
            });
    }

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

    function onSave(response: any) {
        if (response) {
            Notification({
                type: "success",
                message: "Salvo com sucesso",
            });
        }
        loadTableData();
    }

    function handleSave(data: ValueForm) {
        form.resetFields();
        const dataToSave = {
            id: isNewRegistration ? null : editingCategoryId,
            description: data.description,
            costumerId: data.costumerId,
            projectDesignerId: data.projectDesignerId,
            sellerId: data.sellerId,
            referenceDate: data.referenceDate,
            financialStatus: data.financialStatus,
            deliveryStatus: data.deliveryStatus,
        };

        if (isNewRegistration) {
            api.post("/projects", dataToSave)
                .then((response) => {
                    if (response.status === 201) {
                        const savedProjectId = response.data.id;
                        Notification({ type: "success", message: "Projeto salvo com sucesso!" });
                        navigate(`/edit-project/${savedProjectId}`);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao salvar o projeto:", error);
                });
        } else {
            const categoryId = dataToSave.id;
            api.put(`/projects/${categoryId}`, dataToSave)
                .then((response) => {
                    if (response.status === 200) {
                        Notification({ type: "success", message: "Projeto atualizado com sucesso!" });
                        navigate(`/edit-project/${categoryId}`);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao atualizar o projeto:", error);
                });
        }

        setSelectedRowKeys([]);
        setSelectedRows([]);
        setIsModalVisible(false);
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
            <div className="new-project-container">
                <h2>Novo Projeto</h2>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Informações" key="1">
                        <Form form={form} onFinish={handleSave} layout="vertical">
                            <FormFields
                                form={form}
                                costumerList={costumerList}
                                projectDesignersList={projectDesignersList}
                                salespersonList={salespersonList}
                            />
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Salvar
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

export default NewProject;