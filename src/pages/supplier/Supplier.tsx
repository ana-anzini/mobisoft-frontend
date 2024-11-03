import React, { useEffect, useState } from 'react';
import SupplierModal from './components/SupplierModal';
import SupplierTable from './components/SupplierTable';
import axios from 'axios';
import { DataType, ValueForm } from './ISupplier';
import TopButtons from '../../components/topButtons/TopButtons';
import { TableRowSelection } from 'antd/es/table/interface';
import { Form, Modal, message } from 'antd';
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
    const [form] = Form.useForm();

    useEffect(() => {
        loadTableData();
        loadCategories();
    }, []);

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
                email: supplier.email,
                cep: supplier.cep,
                address: supplier.address,
                number: supplier.number,
                neighborhood: supplier.neighborhood,
                additional: supplier.additional
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
                    name: item.name,
                    cpfOrCnpj: item.cpfOrCnpj,
                    phone: item.phone,
                    email: item.email,
                    cep: item.cep,
                    address: item.address,
                    number: item.number,
                    neighborhood: item.neighborhood,
                    additional: item.additional
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
        };

        console.log(dataToSave);

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
            content: 'Você tem certeza que deseja excluir o fornecedor selecionado?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => {
                api.delete(`/suppliers?ids=${idsToDelete}`)
                    .then((response) => {
                        onDelete(response);
                    })
                    .catch((error) => {
                        console.error('Erro ao deletar fornecedores:', error);
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
                    pageTittle='Fornecedores'
                    mainButtonTitle="Novo Fornecedor"
                    handleNew={() => handleOpenModal(true)}
                    handleEdit={() => handleOpenModal(false)}
                    handleDelete={() => handleDelete()}
                    isEditable={selectedRows.length === 1}
                    isDeletable={selectedRows.length > 0}
                />
                <SupplierModal
                    isModalVisible={isModalVisible}
                    isNewRegistration={isNewRegistration}
                    handleSave={handleSave}
                    handleCancel={handleCloseModal}
                    form={form}
                    categoryList={categoryList}
                />
                <SupplierTable
                    loading={loadingTableData}
                    tableData={tableData}
                    rowSelection={rowSelection}
                    onDelete={handleDelete}
                    handleEdit={(record) => handleOpenModal(false, record)}
                />
            </div>
        </main>
    );
};

export default Supplier;
