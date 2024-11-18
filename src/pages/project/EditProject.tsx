import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Tabs } from 'antd';
import api from '../../service/api';
import FormFields from './components/FormFields';
import { PlusOutlined } from '@ant-design/icons';
import "./style.sass";
import { DataTypeProduct, ValueForm, ValueFormProduct } from './IProject';
import { Notification } from '../../components/notification/Notification';
import { TableRowSelection } from 'antd/es/table/interface';
import ProductsTable from './components/ProductsTable';
import ProductModal from './components/ProductModal';
import moment from 'moment';

const { TabPane } = Tabs;

const EditProject: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [formProduct] = Form.useForm();
    const [projectData, setProjectData] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [tableData, setTableData] = useState<DataTypeProduct[]>([]);
    const [loadingTableData, setLoadingTableData] = useState(true);
    const [selectedRows, setSelectedRows] = useState<DataTypeProduct[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [filteredData, setFilteredData] = useState<DataTypeProduct[]>([]);
    const [costumerList, setCostumerList] = useState([]);
    const [projectDesignersList, setProjectDesignersList] = useState([]);
    const [salespersonList, setSalespersonList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadFormProject(id);
            loadCostumers();
            loadProjectDesigners();
            loadSalesperson();
        }
    }, [id]);

    function loadFormProject(projectId: string) {
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
    }

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

    function handleSaveProject(data: ValueForm) {
        const dataToSave = {
            description: data.description,
            costumerId: data.costumerId,
            projectDesignerId: data.projectDesignerId,
            sellerId: data.sellerId,
            referenceDate: moment(data.referenceDate),
            financialStatus: data.financialStatus,
            deliveryStatus: data.deliveryStatus,
        };

        api.put(`/projects/${id}`, dataToSave)
            .then((response) => {
                if (response.status === 200) {
                    Notification({ type: "success", message: "Projeto atualizado com sucesso!" });
                }
            })
            .catch((error) => {
                console.error("Erro ao atualizar o projeto:", error);
            });
    }

    function handleCloseModal() {
        setSelectedRowKeys([]);
        setSelectedRows([]);
        setIsModalVisible(false);
        formProduct.resetFields();
    }

    return (
        <main id="main">
            <div className="edit-project-container">
                <h2>Editar Projeto</h2>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Informações" key="1">
                        <Form form={form} onFinish={handleSaveProject} layout="vertical">
                            <FormFields
                                form={form}
                                costumerList={costumerList}
                                projectDesignersList={projectDesignersList}
                                salespersonList={salespersonList}
                            />
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
                                handleCancel={handleCloseModal}
                                form={formProduct}
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