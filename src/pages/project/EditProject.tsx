import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Tabs, Modal } from 'antd';
import api from '../../service/api';
import FormFields from './components/FormFields';
import FormFieldsFinancial from './components/FormFieldsFinancial';
import { PlusOutlined } from '@ant-design/icons';
import "./style.sass";
import { DataTypeProduct, ValueForm, ValueFormDelivery, ValueFormFinancial, ValueFormProduct } from './IProject';
import { Notification } from '../../components/notification/Notification';
import { TableRowSelection } from 'antd/es/table/interface';
import ProductsTable from './components/ProductsTable';
import ProductModal from './components/ProductModal';
import moment from 'moment';
import FormFieldsDelivery from './components/FormFieldsDelivery';
import FormFieldsTotalValues from './components/FormFieldsTotalValues';

const { TabPane } = Tabs;

const EditProject: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [formProduct] = Form.useForm();
    const [formFinancial] = Form.useForm();
    const [formDelivery] = Form.useForm();
    const [formValues] = Form.useForm();
    const [projectData, setProjectData] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isNewProduct, setIsNewProduct] = useState<boolean>(true);
    const [isNewDelivery, setIsNewDelivery] = useState<boolean>(false);
    const [tableData, setTableData] = useState<DataTypeProduct[]>([]);
    const [loadingTableData, setLoadingTableData] = useState(true);
    const [selectedRows, setSelectedRows] = useState<DataTypeProduct[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [filteredData, setFilteredData] = useState<DataTypeProduct[]>([]);
    const [costumerList, setCostumerList] = useState([]);
    const [projectDesignersList, setProjectDesignersList] = useState([]);
    const [salespersonList, setSalespersonList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [editingProductId, setEditingProductId] = useState<React.Key | null>(null);
    const [editingDeliveryId, setEditingDeliveryId] = useState<React.Key | null>(null);
    const [financialData, setFinancialData] = useState<any>(null);
    const [deliveryData, setDeliveryData] = useState<any>(null);
    const [totalValuesData, setTotalValuesData] = useState<any>(null);
    const [loadingFinancial, setLoadingFinancial] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadFormProject(id);
            loadCostumers();
            loadProjectDesigners();
            loadSalesperson();
            loadCategories();
            loadTableData();
            loadFormFinancial(id);
            loadFormDelivery(id);
            loadFormTotalValues();
        }
    }, [id]);

    useEffect(() => {
        setFilteredData(tableData);
    }, [tableData]);

    const reloadFinancialForm = () => {
        setLoadingFinancial(true);
        api.get(`/financial/projects/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    const financial = response.data;
                    const treatedData = {
                        ...financial,
                        firstPayment: moment(financial.firstPayment).format("YYYY-MM-DD"),
                    }
                    setFinancialData(treatedData);
                    formFinancial.setFieldsValue(treatedData);
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar dados financeiros:", error);
            })
            .finally(() => {
                setLoadingFinancial(false);
            });
    }

    const onTabClick = (key: string) => {
        if (key === "3") {
            reloadFinancialForm();
        }
    };

    function loadFormProject(projectId: string) {
        api.get(`/projects/${projectId}`)
            .then((response) => {
                if (response.status === 200) {
                    const project = response.data;

                    const treatedData = {
                        costumerId: project.costumer.id,
                        costumerName: project.costumer.name,
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

    function loadFormDelivery(projectId: string) {
        api.get(`/deliveries/find/${projectId}`)
            .then((response) => {
                if (response.status === 200) {
                    const delivery = response.data;
                    const treatedData = {
                        ...delivery,
                        deliveryDate: moment(delivery.deliveryDate).format("YYYY-MM-DD HH:mm"),
                        freight: delivery.freight,
                    }
                    setDeliveryData(treatedData);
                    formDelivery.setFieldsValue(treatedData);
                }

                if (response.data.userGroup == undefined) {
                    setIsNewDelivery(true);
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar dados do projeto:", error);
            });
    }

    function loadFormTotalValues() {
        api.get(`/financial/projects/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    const values = response.data;
                    const treatedData = {
                        ...values,
                    }
                    setTotalValuesData(treatedData);
                    formValues.setFieldsValue(treatedData);
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar dados do projeto:", error);
            });
    }

    function loadFormFinancial(projectId: string) {
        api.get(`/financial/projects/${projectId}`)
            .then((response) => {
                if (response.status === 200) {
                    const financial = response.data;
                    const treatedData = {
                        ...financial,
                        firstPayment: moment(financial.firstPayment).format("YYYY-MM-DD"),
                    }
                    setFinancialData(treatedData);
                    formFinancial.setFieldsValue(treatedData);
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar dados do projeto:", error);
            });
    }

    function calculateValues() {
        api.post(`/financial/createFinancialValues/${id}`, {})
            .then((response) => {
                if (response.status === 200) {
                    const values = response.data;
                    const treatedData = {
                        ...values,
                    };
                    setTotalValuesData(treatedData);
                    formValues.setFieldsValue(treatedData);
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

    function loadCategories() {
        api.get("categories/findAll")
            .then((response) => {
                if (response.status === 200) {
                    const categories = response.data.map((item: any) => ({
                        value: item.id,
                        label: item.description,
                    }));
                    setCategoryList(categories);
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar categorias:", err);
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
        api.get(`/productProjects/findByProject/${id}`).then((response) => {
            if (response.status === 200) {
                const dataTable = response.data.map((item: any) => ({
                    key: item.id,
                    categoryDescription: item.product.category.description,
                    productDescription: item.product.description,
                    categoryId: item.product.category.id,
                    productId: item.product.id,
                    productValue: item.productValue,
                }));
                setTableData(dataTable);
                setLoadingTableData(false);
            }
        }).catch((err) => {
            console.error("Erro ao carregar dados");
        });
    }

    function handleSaveProject(data: ValueForm) {
        formProduct.resetFields();
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

    function handleSaveFinancial(data: ValueFormFinancial) {
        const dataToSave = {
            projectId: id,
            installmentsNumber: data.installmentsNumber,
            firstPayment: data.firstPayment,
            paymentType: data.paymentType,
            additionalExpenses: data.additionalExpenses,
        };

        api.put(`/financial/${id}`, dataToSave)
            .then((response) => {
                onSave(response);
            })
            .catch((error) => {
                console.error("Erro ao atualizar o produto:", error);
            });

        setSelectedRowKeys([]);
        setSelectedRows([]);
        setIsModalVisible(false);
    }

    function handleSave(data: ValueFormProduct) {
        const dataToSave = {
            id: isNewProduct ? null : editingProductId,
            projectId: id,
            productId: data.productId,
        };

        if (isNewProduct) {
            api.post("/productProjects", dataToSave)
                .then((response) => {
                    onSave(response);
                    updateTotalCusts();
                })
                .catch((error) => {
                    console.error("Erro ao salvar o produto:", error);
                });
        } else {
            const productId = dataToSave.id;
            api.put(`/productProjects/${productId}`, dataToSave)
                .then((response) => {
                    onSave(response);
                    updateTotalCusts();
                })
                .catch((error) => {
                    console.error("Erro ao atualizar o produto:", error);
                });
        }

        setSelectedRowKeys([]);
        setSelectedRows([]);
        setIsModalVisible(false);
    }

    function updateTotalCusts() {
        const total = tableData.reduce((sum, item) => sum + (item.productValue || 0), 0);
        formFinancial.setFieldsValue({ totalCusts: total });
    }

    function handleSaveDelivery(data: ValueFormDelivery) {
        const dataToSave = {
            id: isNewDelivery ? null : editingDeliveryId,
            projectId: id,
            cep: data.cep,
            address: data.address,
            number: data.number,
            neighborhood: data.neighborhood,
            additional: data.additional,
            deliveryDate: moment(data.deliveryDate),
            freight: data.freight,
        };

        if (isNewDelivery) {
            api.post("/deliveries", dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao salvar a entrega:", error);
                });
        } else {
            api.put(`/deliveries/${id}`, dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao atualizar a entrega:", error);
                });
        }
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

    function handleCloseModal() {
        setSelectedRowKeys([]);
        setSelectedRows([]);
        setIsModalVisible(false);
        formProduct.resetFields();
    }

    function handleOpenModal(isNew: boolean, product?: DataTypeProduct) {
        if (isNew) {
            setIsNewProduct(true);
            setEditingProductId(null);
            formProduct.resetFields();
        } else if (product) {
            setEditingProductId(product.key);
            formProduct.setFieldsValue({
                categoryId: product.categoryId,
                productId: product.productDescription,
                productValue: product.productValue,
            });
            setIsNewProduct(false);
        }
        setIsModalVisible(true);
    }

    function handleDeleteProduct(ids?: string) {
        const idsToDelete = ids || selectedRowKeys.join(',');

        Modal.confirm({
            title: 'Excluir produto',
            content: 'Você tem certeza que deseja excluir a(s) produto(s) do projeto selecionada(s)?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => {
                api.delete(`/productProjects?ids=${idsToDelete}`)
                    .then((response) => {
                        const message = response.data;

                        if (message === "Produto(s) deletada(s) com sucesso.") {
                            onDelete(response);
                        } else {
                            Notification({
                                type: "error",
                                message: message,
                            });
                        }
                    })
                    .catch(() => {
                        Notification({
                            type: "error",
                            message: "Erro ao deletar",
                        });
                    });
            }
        });
    }

    function onDelete(response: any) {
        if (response) {
            Notification({
                type: "success",
                message: "Produto(s) deletada(s) com sucesso",
            });
        }
        loadTableData();
    }

    return (
        <main id="main">
            <div className="edit-project-container">
                <h2>Editar Projeto</h2>
                <Tabs defaultActiveKey="1" onTabClick={onTabClick}>
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
                                handleEdit={(record) => handleOpenModal(false, record)}
                                onDelete={handleDeleteProduct}
                            />
                            <ProductModal
                                isModalVisible={isModalVisible}
                                handleCancel={handleCloseModal}
                                handleSave={handleSave}
                                form={formProduct}
                                categoryList={categoryList}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Financeiro" key="3" disabled={!financialData}>
                        <Form form={formFinancial} onFinish={handleSaveFinancial} layout="vertical">
                            <FormFieldsFinancial
                                form={formFinancial}
                            />
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Atualizar
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Entrega e Orçamento Final" key="4" disabled={!deliveryData}>
                        <Form form={formDelivery} onFinish={handleSaveDelivery} layout="vertical">
                            <FormFieldsDelivery
                                form={formDelivery}
                            />
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Atualizar
                                </Button>
                            </Form.Item>
                        </Form>
                        <Form onFinish={calculateValues} layout="vertical">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Calcular valores
                                </Button>
                            </Form.Item>
                            <FormFieldsTotalValues
                                form={formValues}
                            />
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </main>
    );
};

export default EditProject;