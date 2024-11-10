import React, { useEffect, useState } from 'react';
import EmployeesModal from './components/EmployeesModal';
import EmployeesTable from './components/EmployeesTable';
import { DataType, ValueForm } from './IEmployees';
import TopButtons from '../../components/topButtons/TopButtons';
import { TableRowSelection } from 'antd/es/table/interface';
import { Form, Modal } from 'antd';
import api from '../../service/api';
import { Notification } from '../../components/notification/Notification';
import moment from 'moment';

const Supplier = () => {
    const [loadingTableData, setLoadingTableData] = useState(true);
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [isNewRegistration, setIsNewRegistration] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editingEmployeesId, setEditingEmployeesId] = useState<React.Key | null>(null);
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
            setEditingEmployeesId(null);
            form.resetFields();
        } else if (employees) {
            setEditingEmployeesId(employees.key);
            form.setFieldsValue({
                name: employees.name,
                cpfOrCnpj: employees.cpfOrCnpj,
                phone: employees.phone,
                email: employees.email,
                cep: employees.cep,
                employeesType: employees.employeesType,
                address: employees.address,
                number: employees.number,
                neighborhood: employees.neighborhood,
                additional: employees.additional,
                rg: employees.rg,
                pis: employees.pis,
                ctps: employees.ctps,
                salary: employees.salary,
                admission: moment(employees.admission),
                dismissional: moment(employees.dismissional),
            });
            setIsNewRegistration(false);
        }
        setIsModalVisible(true);
    }

    function loadTableData() {
        api.get("/employees/findAll").then((response) => {
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
            id: isNewRegistration ? null : editingEmployeesId,
            name: data.name,
            cpfOrCnpj: data.cpfOrCnpj,
            phone: data.phone,
            email: data.email,
            employeesType: data.employeesType,
            cep: data.cep,
            address: data.address,
            number: data.number,
            neighborhood: data.neighborhood,
            additional: data.additional,
            rg: data.rg,
            pis: data.pis,
            ctps: data.ctps,
            salary: data.salary,
            admission: moment(data.admission).format("YYYY-MM-DD"),
            dismissional: data.dismissional ? moment(data.dismissional).format("YYYY-MM-DD") : null,
        };

        if (isNewRegistration) {
            api.post("/employees", dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao salvar o categoria:", error);
                });
        } else {
            const employeesId = dataToSave.id;
            api.put(`/employees/${employeesId}`, dataToSave)
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
            title: 'Excluir funcionário',
            content: 'Você tem certeza que deseja excluir o(s) funcionário(s) selecionado(s)?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => {
                api.delete(`/employees?ids=${idsToDelete}`)
                    .then((response) => {
                        const message = response.data;

                        if (message === "Funcionário(s) deletada(s) com sucesso.") {
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

    return (
        <main id="main">
            <div className='main-container'>
                <TopButtons
                    pageTitle='Colaboradores'
                    mainButtonTitle="Novo Colaborador"
                    handleNew={() => handleOpenModal(true)}
                    handleEdit={() => handleOpenModal(false)}
                    hasSelection={selectedRowKeys.length > 0}
                    handleDelete={handleDelete}
                    onSearch={handleSearch}
                />
                <EmployeesModal
                    isModalVisible={isModalVisible}
                    handleSave={handleSave}
                    handleCancel={handleCloseModal}
                    form={form}
                />
                <EmployeesTable
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
