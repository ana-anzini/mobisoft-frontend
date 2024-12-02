import React, { useEffect, useState } from 'react';
import CostumerModal from './components/CostumerModal';
import CostumerTable from './components/CostumerTable';
import { DataType, ValueForm } from './ICostumer';
import TopButtons from '../../components/topButtons/TopButtons';
import { TableRowSelection } from 'antd/es/table/interface';
import { Form, Modal } from 'antd';
import api from '../../service/api';
import { Notification } from '../../components/notification/Notification';
import moment from 'moment';

const Costumer = () => {
    const [loadingTableData, setLoadingTableData] = useState(true);
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editingCostumerId, setEditingCostumerId] = useState<React.Key | null>(null);
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        loadTableData();
    }, []);

    useEffect(() => {
        setFilteredData(tableData);
    }, [tableData]);

    const handleSearch = (value: string) => {
        const searchValue = value.toLowerCase();
        const filtered = tableData.filter(item =>
            item.name.toLowerCase().includes(searchValue)
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

    function handleOpenModal(isNew: boolean, employees?: DataType) {
        if (isNew) {
            setIsNewRegistration(true);
            setEditingCostumerId(null);
            form.resetFields();
        } else if (employees) {
            setEditingCostumerId(employees.key);
            form.setFieldsValue({
                name: employees.name,
                cpfOrCnpj: employees.cpfOrCnpj,
                phone: employees.phone,
                email: employees.email,
                cep: employees.cep,
                personType: employees.personType,
                networkType: employees.networkType,
                address: employees.address,
                number: employees.number,
                neighborhood: employees.neighborhood,
                additional: employees.additional,
                rg: employees.rg,
                birthday: moment(employees.birthday).format("YYYY-MM-DD"),
                notes: employees.notes,
            });
            setIsNewRegistration(false);
        }
        setIsModalVisible(true);
    }

    function loadTableData() {
        api.get("/costumers").then((response) => {
            if (response.status === 200) {
                const dataTable = response.data.map((item: any) => ({
                    key: item.id,
                    ...item,
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
            id: isNewRegistration ? null : editingCostumerId,
            name: data.name,
            cpfOrCnpj: data.cpfOrCnpj,
            phone: data.phone,
            email: data.email,
            personType: data.personType,
            networkType: data.networkType,
            cep: data.cep,
            address: data.address,
            number: data.number,
            neighborhood: data.neighborhood,
            additional: data.additional,
            rg: data.rg,
            birthday: moment(data.birthday),
            notes: data.notes,
        };

        if (isNewRegistration) {
            api.post("/costumers", dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao salvar o categoria:", error);
                });
        } else {
            const employeesId = dataToSave.id;
            api.put(`/costumers/${employeesId}`, dataToSave)
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

    function handleDelete(ids?: string) {
        const idsToDelete = ids || selectedRowKeys.join(',');

        Modal.confirm({
            title: 'Excluir cliente',
            content: 'Você tem certeza que deseja excluir o(s) cliente(es) selecionado(s)?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => {
                api.delete(`/costumers?ids=${idsToDelete}`)
                    .then((response) => {
                        const message = response.data;

                        if (message === "Cliente(s) deletada(s) com sucesso.") {
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
                message: "Cliente(es) deletado(s) com sucesso",
            });
        }
        loadTableData();
    }

    return (
        <main id="main">
            <div className='main-container'>
                <TopButtons
                    pageTitle='Clientes'
                    mainButtonTitle="Novo Cliente"
                    handleNew={() => handleOpenModal(true)}
                    handleEdit={() => handleOpenModal(false)}
                    hasSelection={selectedRowKeys.length > 0}
                    handleDelete={handleDelete}
                    onSearch={handleSearch}
                    showButton={true}
                />
                <CostumerModal
                    isModalVisible={isModalVisible}
                    handleSave={handleSave}
                    handleCancel={handleCloseModal}
                    form={form}
                />
                <CostumerTable
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

export default Costumer;
