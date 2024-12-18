import React, { useEffect, useState } from 'react';
import DeliveriesModal from './components/DeliveriesModal';
import DeliveriesTable from './components/DeliveriesTable';
import { DataType, ValueForm } from './IDeliveries';
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
    const [editingDeliveries, setDeliveriesId] = useState<React.Key | null>(null);
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
            item.address.toLowerCase().includes(searchValue)
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

    function handleOpenModal(isNew: boolean, delivery?: DataType) {
        if (isNew) {
            setIsNewRegistration(true);
            setDeliveriesId(null);
            form.resetFields();
        } else if (delivery) {
            setDeliveriesId(delivery.key);
            console.log(delivery.deliveryDate);
            form.setFieldsValue({
                projectDescription: delivery.projectDescription,
                cep: delivery.cep,
                address: delivery.address,
                number: delivery.number,
                neighborhood: delivery.neighborhood,
                additional: delivery.additional,
                deliveryDate: moment(delivery.deliveryDate).format("YYYY-MM-DD"),
                statusType: delivery.statusType,
            });
            setIsNewRegistration(false);
        }
        setIsModalVisible(true);
    }

    function loadTableData() {
        api.get("/deliveries").then((response) => {
            if (response.status === 200) {
                const dataTable = response.data.map((item: any) => ({
                    key: item.id,
                    projectId: item.project.id,
                    projectDescription: item.project.description,
                    deliveryDateFormat: moment(item.deliveryDate).format('DD/MM/YYYY'),
                    ...item,
                    statusType: item.project.deliveryStatus,
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
            id: isNewRegistration ? null : editingDeliveries,
            cep: data.cep,
            address: data.address,
            number: data.number,
            neighborhood: data.neighborhood,
            additional: data.additional,
            deliveryDate: data.deliveryDate,
            statusType: data.statusType,
        };

        if (isNewRegistration) {
            api.post("/deliveries", dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao salvar a entrega:", error);
                });
        } else {
            const categoryId = dataToSave.id;
            api.put(`/deliveries/${categoryId}`, dataToSave)
                .then((response) => {
                    onSave(response);
                })
                .catch((error) => {
                    console.error("Erro ao atualizar a entrega:", error);
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
            title: 'Excluir entrega',
            content: 'Você tem certeza que deseja excluir a(s) entrega(s) selecionada(s)?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => {
                api.delete(`/deliveries?ids=${idsToDelete}`)
                    .then((response) => {
                        const message = response.data;
                        onDelete(response);
                        loadTableData();
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
                message: "Entrega(s) deletada(s) com sucesso",
            });
        }
        loadTableData();
    }

    return (
        <main id="main">
            <div className='main-container'>
                <TopButtons
                    pageTitle='Entregas Agendadas'
                    mainButtonTitle=""
                    handleNew={() => handleOpenModal(true)}
                    handleEdit={() => handleOpenModal(false)}
                    hasSelection={selectedRowKeys.length > 0}
                    handleDelete={handleDelete}
                    onSearch={handleSearch}
                    showButton={false}
                />
                <DeliveriesModal
                    isModalVisible={isModalVisible}
                    handleSave={handleSave}
                    handleCancel={handleCloseModal}
                    form={form}
                    projectList={null}
                />
                <DeliveriesTable
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
