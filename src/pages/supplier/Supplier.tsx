import React, { useEffect, useState } from 'react';
import SupplierModal from './components/SupplierModal';
import SupplierTable from './components/SupplierTable';
import { DataType, ValueForm } from './ISupplier';
import TopButtons from '../../components/topButtons/TopButtons';
import { TableRowSelection } from 'antd/es/table/interface';
import { Form, Modal } from 'antd';
import api from '../../service/api';
import { Notification } from '../../components/notification/Notification';

const Supplier = () => {
    const [loadingTableData, setLoadingTableData] = useState(true);
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState([]);
    const [editingSupplierId, setEditingSupplierId] = useState<React.Key | null>(null);
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        loadTableData();
        loadCategories();
    }, []);

    useEffect(() => {
        setFilteredData(tableData);
    }, [tableData]);

    const handleSearch = (value: string) => {
        const searchValue = value.toLowerCase();
        const filtered = tableData.filter(item =>
            item.name.toLowerCase().includes(searchValue) ||
            item.email.toLowerCase().includes(searchValue)
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

    function handleOpenModal(isNew: boolean, supplier?: DataType) {
        if (isNew) {
            setIsNewRegistration(true);
            setEditingSupplierId(null);
            form.resetFields();
        } else if (supplier) {
            setEditingSupplierId(supplier.key);
            form.setFieldsValue({
                cpfOrCnpj: supplier.cpfOrCnpj,
                name: supplier.name,
                phone: supplier.phone,
                categoryId: supplier.categoryId,
                categoryDescription: supplier.categoryDescription,
                email: supplier.email,
                cep: supplier.cep,
                address: supplier.address,
                number: supplier.number,
                neighborhood: supplier.neighborhood,
                additional: supplier.additional,
                code: supplier.code
            });
            setIsNewRegistration(false);
        }
        setIsModalVisible(true);
    }

    function loadTableData() {
        api.get("/suppliers").then((response) => {
            if (response.status === 200) {
                const dataTable = response.data.map((item: any) => ({
                    key: item.id,
                    categoryId: item.category.id,
                    categoryDescription: item.category.description,
                    name: item.name,
                    cpfOrCnpj: item.cpfOrCnpj,
                    phone: item.phone,
                    email: item.email,
                    cep: item.cep,
                    address: item.address,
                    number: item.number,
                    neighborhood: item.neighborhood,
                    additional: item.additional,
                    code: item.code
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
            id: isNewRegistration ? null : editingSupplierId,
            cpfOrCnpj: data.cpfOrCnpj,
            name: data.name,
            phone: data.phone,
            categoryId: data.categoryId,
            email: data.email,
            cep: data.cep,
            address: data.address,
            number: data.number,
            neighborhood: data.neighborhood,
            additional: data.additional,
            code: data.code,
        };

        if (isNewRegistration) {
            api.post("/suppliers", dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao salvar o fornecedor:", error);
                });
        } else {
            const supplierId = dataToSave.id;
            api.put(`/suppliers/${supplierId}`, dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao atualizar o fornecedor:", error);
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
            title: 'Excluir fornecedor',
            content: 'Você tem certeza que deseja excluir o(s) fornecedor(es) selecionado(s)?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => {
                api.delete(`/suppliers?ids=${idsToDelete}`)
                    .then((response) => {
                        const message = response.data;

                        if (message === "Fornecedor(es) deletado(s) com sucesso.") {
                            Notification({
                                type: "success",
                                message: message,
                            });
                            loadTableData();
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
                message: "Fornecedor(es) deletado(s) com sucesso",
            });
        }
        loadTableData();
    }

    function loadCategories() {
        api.get("/categories/findAll")
            .then((response) => {
                if (response.status === 200) {
                    const categorias = response.data.map((item: any) => ({
                        key: item.id,
                        value: item.id,
                        label: item.description
                    }));
                    setCategoryList(categorias);
                }
            }).catch((err) => {
                console.error("Erro ao carregar categorias");
            });
    }

    return (
        <main id="main">
            <div className='main-container'>
                <TopButtons
                    pageTitle='Fornecedores'
                    mainButtonTitle="Novo Fornecedor"
                    handleNew={() => handleOpenModal(true)}
                    handleEdit={() => handleOpenModal(false)}
                    hasSelection={selectedRowKeys.length > 0}
                    handleDelete={handleDelete}
                    onSearch={handleSearch}
                    showButton={true}
                />
                <SupplierModal
                    isModalVisible={isModalVisible}
                    handleSave={handleSave}
                    handleCancel={handleCloseModal}
                    form={form}
                    categoryList={categoryList}
                />
                <SupplierTable
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
