import React, { useEffect, useState } from 'react'
import SupplierModal from './components/SupplierModal'
import SupplierTable from './components/SupplierTable'
import axios from 'axios';
import { DataType, ValueForm } from './ISupplier';
import TopButtons from '../../components/topButtons/TopButtons';
import { TableRowSelection } from 'antd/es/table/interface';
import { Form } from 'antd';
import api from '../../service/api';
import { Notification } from '../../components/notification/Notification';

const Supplier = () => {

    const [loadingTableData, setLoadingTableData] = useState(true);
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [newRegistrationList, setNewRegistrationList] = useState<ValueForm[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState([]);
    const [form] = Form.useForm();

    console.log(newRegistrationList);

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

    function handleOpenModal(isNew: boolean) {
        if (isNew) {
            setIsNewRegistration(true);
            setSelectedRowKeys([]);
            setSelectedRows([]);
            setNewRegistrationList([]);
            form.resetFields();
        } else {
            console.log(selectedRows[0].categoryId);
            form.setFieldsValue({
                cpfOrCnpj: selectedRows[0].cpfOrCnpj,
                name: selectedRows[0].name,
                phone: selectedRows[0].phone,
                categoryId: selectedRows[0].categoryId,
                email: selectedRows[0].email,
                cep: selectedRows[0].cep,
                address: selectedRows[0].address,
                number: selectedRows[0].number,
                neighborhood: selectedRows[0].neighborhood,
                additional: selectedRows[0].additional
            });
            setIsNewRegistration(false);
        }
        setIsModalVisible(true);
    }

    function loadTableData() {
        api.get("/suppliers").then((response) => {
            if (response.status = 200) {
                const dataTable = response.data.map((item: any) => {
                    return {
                        key: item.id,
                        supplierType: item.supplierType,
                        name: item.name,
                        cpfOrCnpj: item.cpfOrCnpj,
                        phone: item.phone,
                        email: item.email,
                        cep: item.cep,
                        address: item.address,
                        number: item.number,
                        neighborhood: item.neighborhood,
                        additional: item.additional
                    }
                })

                setTableData(dataTable);
                setLoadingTableData(false);
            }
        }).catch((err) => {
            console.log("Erro")
        })
    }

    function onSave(data: any) {

    }

    function handleSave(data: ValueForm[]) {
        console.log(data);
        const dataToSave = data.map(
            supplier => {
                return {
                    id: isNewRegistration ? null : selectedRows[0].key,
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
                }
            }
        );

        if (isNewRegistration) {
            console.log(dataToSave);
            api.post("/suppliers", dataToSave)
                .then((response) => {
                    setLoadingTableData(true);
                    loadTableData();
                    onSave(response);
                });
        } else {
            api.put("/suppliers", dataToSave[0]).then((response) => {
                setLoadingTableData(true);
                loadTableData();
                onSave(response);
            })
        }

        setSelectedRowKeys([]);
        setSelectedRows([]);

        setIsModalVisible(false);
        setLoadingTableData(true);
    }

    function handleCloseModal() {
        setSelectedRowKeys([]);
        setSelectedRows([]);
        form.resetFields();
        setIsModalVisible(false);
    };

    function handleIncludeModal(data: ValueForm) {
        console.log(data);
        if (isNewRegistration) {
            setNewRegistrationList([...newRegistrationList, data]);
        } else {
            handleSave([data]);
        }
        form.resetFields();
    }

    function handleDelete() {
        api.delete(`/suppliers?ids=${selectedRowKeys}`)
            .then((response) => {
                setLoadingTableData(true);
                onDelete(response);
            })
    }

    function onDelete(response: any) {
        if (response) {
            Notification({
                type: "success",
                message: "Deletado com sucesso",
            });
        }

        setLoadingTableData(true);
        loadTableData();
    };

    function loadCategories() {
        api.get("/categories/findAll")
            .then((response) => {
                if (response.status = 200) {
                    const categorias = response.data.map((item: any) => {
                        return {
                            key: item.id,
                            value: item.id,
                            label: item.description
                        }
                    })

                    setCategoryList(categorias);
                }
            }).catch((err) => {
                console.log("Erro")
            })
    }

    return (
        <div>
            <TopButtons
                pageTittle='Fornecedores'
                mainButtonTitle="Novo Fornecedor"
                handleNew={() => handleOpenModal(true)}
                handleEdit={() => handleOpenModal(false)}
                handleDelete={handleDelete}
                // handleSearch={onChangeSearch}
                isEditable={selectedRows.length === 1}
                isDeletable={selectedRows.length > 0}
            />
            <SupplierModal
                isModalVisible={isModalVisible}
                isNewRegistration={isNewRegistration}
                newRegistrationList={newRegistrationList}
                handleSave={handleSave}
                handleCancel={handleCloseModal}
                form={form}
                handleSubmit={handleIncludeModal}
                setNewRegistrationList={setNewRegistrationList}
                categoryList={categoryList}
            />
            <SupplierTable
                loading={loadingTableData}
                tableData={tableData}
                rowSelection={rowSelection}
            />
        </div>
    )
}

export default Supplier
