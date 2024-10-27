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
    const [form] = Form.useForm();

    useEffect(() => {
        loadTableData();
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
            /*form.setFieldsValue({
                description: selectedRows[0].description,
                type: selectedRows[0].type,
            });*/
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
        const dataToSave = data.map(
            data => {
                return {
                    // ...
                }
            }
        );

        if (isNewRegistration) {
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
