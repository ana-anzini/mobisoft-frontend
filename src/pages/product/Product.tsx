import React, { useEffect, useState } from 'react';
import ProductModal from './components/ProductModal';
import ProductTable from './components/ProductTable';
import { DataType, ValueForm } from './IProduct';
import TopButtons from '../../components/topButtons/TopButtons';
import { TableRowSelection } from 'antd/es/table/interface';
import { Form, Modal } from 'antd';
import api from '../../service/api';
import { Notification } from '../../components/notification/Notification';
import { saveAs } from "file-saver";
import ImportCSVModal from '../../components/topButtons/ImportCSVModal';

const Supplier = () => {
    const [loadingTableData, setLoadingTableData] = useState(true);
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editingProductId, setEditingProductId] = useState<React.Key | null>(null);
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [categoryList, setCategoryList] = useState([]);
    const [supplierList, setSupplierList] = useState([]);
    const [isImportModalVisible, setIsImportModalVisible] = useState<boolean>(false);
    const handleOpenImportModal = () => setIsImportModalVisible(true);
    const handleCloseImportModal = () => setIsImportModalVisible(false);
    const [form] = Form.useForm();

    useEffect(() => {
        loadTableData();
        loadCategories();
        loadSuppliers();
    }, []);

    useEffect(() => {
        setFilteredData(tableData);
    }, [tableData]);

    const handleDownloadExample = () => {
        const exampleCSV = "Código Categoria,Código Fornecedor,Descrição,Valor\n";
        const blob = new Blob([exampleCSV], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "exemplo.csv");
    };

    const handleImportCSV = (file: File) => {
        if (!file) {
            Notification({
                type: "error",
                message: "Nenhum arquivo foi selecionado.",
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        api.post("products/import", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {
                Notification({
                    type: "success",
                    message: "Arquivo enviado com sucesso!",
                });
                loadTableData();
            })
            .catch((err) => {
                const errorMessage = err.response?.data || "Erro ao enviar o arquivo.";
                Notification({
                    type: "error",
                    message: errorMessage,
                });
            });
    };

    const handleSearch = (value: string) => {
        const searchValue = value.toLowerCase();
        const filtered = tableData.filter(item =>
            item.description.toLowerCase().includes(searchValue)
        );
        setFilteredData(filtered);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: DataType[]) => {
        setSelectedRows(newSelectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function handleOpenModal(isNew: boolean, product?: DataType) {
        if (isNew) {
            setIsNewRegistration(true);
            setEditingProductId(null);
            form.resetFields();
        } else if (product) {
            setEditingProductId(product.key);
            form.setFieldsValue({
                description: product.description,
                categoryId: product.categoryId,
                categoryDescription: product.categoryDescription,
                supplierId: product.supplierId,
                supplierName: product.supplierDescription,
                productValue: product.productValue,
            });
            setIsNewRegistration(false);
        }
        setIsModalVisible(true);
    }

    function loadTableData() {
        api.get("/products").then((response) => {
            if (response.status === 200) {
                const dataTable = response.data.map((item: any) => ({
                    key: item.id,
                    description: item.description,
                    supplierId: item.supplier.id,
                    supplierName: item.supplier.name,
                    categoryId: item.category.id,
                    categoryDescription: item.category.description,
                    productValue: item.productValue,
                }));
                setTableData(dataTable);
                setLoadingTableData(false);
            }
        }).catch((err) => {
            console.error("Erro ao carregar dados");
        });
    }

    function loadCategories() {
        api.get("/categories/findAll")
            .then((response) => {
                if (response.status === 200) {
                    const categorias = response.data.map((item: any) => ({
                        key: item.id,
                        value: item.id,
                        label: item.code + " - " + item.description
                    }));
                    setCategoryList(categorias);
                }
            }).catch((err) => {
                console.error("Erro ao carregar categorias");
            });
    }

    function loadSuppliers() {
        api.get("/suppliers")
            .then((response) => {
                if (response.status === 200) {
                    const suppliers = response.data.map((item: any) => ({
                        key: item.id,
                        value: item.id,
                        label: item.code + " - " + item.name
                    }));
                    setSupplierList(suppliers);
                }
            }).catch((err) => {
                console.error("Erro ao carregar fornecedores");
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
            id: isNewRegistration ? null : editingProductId,
            description: data.description,
            categoryId: data.categoryId,
            supplierId: data.supplierId,
            productValue: data.productValue,
        };

        if (isNewRegistration) {
            api.post("/products", dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao salvar o produto:", error);
                });
        } else {
            const productId = dataToSave.id;
            api.put(`/products/${productId}`, dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao atualizar o produto:", error);
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

    function handleDelete(ids?: string) {
        const idsToDelete = ids || selectedRowKeys.join(',');

        Modal.confirm({
            title: 'Excluir produto',
            content: 'Você tem certeza que deseja excluir a(s) produto(s) selecionada(s)?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => {
                api.delete(`/products?ids=${idsToDelete}`)
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
            <div className='main-container'>
                <TopButtons
                    pageTitle="Produtos"
                    mainButtonTitle="Novo Produto"
                    handleNew={() => handleOpenModal(true)}
                    handleEdit={() => handleOpenModal(false)}
                    hasSelection={selectedRowKeys.length > 0}
                    handleDelete={handleDelete}
                    onSearch={handleSearch}
                    showButton={true}
                    onDownloadExample={handleDownloadExample}
                    onUploadCSV={handleOpenImportModal}
                />
                <ImportCSVModal
                    isVisible={isImportModalVisible}
                    onClose={handleCloseImportModal}
                    onImport={handleImportCSV}
                />
                <ProductModal
                    isModalVisible={isModalVisible}
                    handleSave={handleSave}
                    handleCancel={handleCloseModal}
                    form={form}
                    categoryList={categoryList}
                    supplierList={supplierList}
                />
                <ProductTable
                    loading={loadingTableData}
                    tableData={filteredData}
                    rowSelection={rowSelection}
                    onDelete={handleDelete}
                    handleEdit={(record) => handleOpenModal(false, record)}
                />
            </div>
        </main>
    );
};

export default Supplier;
