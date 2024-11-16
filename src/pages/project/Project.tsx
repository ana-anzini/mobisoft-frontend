import React, { useEffect, useState } from 'react';
import ProjectTable from './components/ProjectTable';
import { DataType, ValueForm } from './IProject';
import TopButtons from '../../components/topButtons/TopButtons';
import { TableRowSelection } from 'antd/es/table/interface';
import { Form, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api';
import { Notification } from '../../components/notification/Notification';
import moment from 'moment';

const Project = () => {
    const [loadingTableData, setLoadingTableData] = useState(true);
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [costumerList, setCostumerList] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        loadTableData();
    }, []);

    useEffect(() => {
        setFilteredData(tableData);
    }, [tableData]);

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

    function loadTableData() {
        api.get("/projects").then((response) => {
            if (response.status === 200) {
                const dataTable = response.data.map((item: any) => ({
                    key: item.id,
                    costumerName: item.costumer.name,
                    referenceDateFormat: moment(item.referenceDate).format("DD/MM/YYYY"),
                    financialStatus: item.financialStatus,
                    deliveryStatus: item.deliveryStatus,
                    ...item,
                }));
                setTableData(dataTable);
                setLoadingTableData(false);
            }
        }).catch((err) => {
            console.error("Erro ao carregar dados");
        });
    }

    function handleDelete(ids?: string) {
        const idsToDelete = ids || selectedRowKeys.join(',');

        Modal.confirm({
            title: 'Excluir produto',
            content: 'Você tem certeza que deseja excluir a(s) produto(s) selecionada(s)?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => {
                api.delete(`/projects?ids=${idsToDelete}`)
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
                    pageTitle='Projetos'
                    mainButtonTitle="Novo Projeto"
                    handleNew={() => navigate('/new-project')}
                    handleEdit={() => navigate('/edit-project')}
                    hasSelection={selectedRowKeys.length > 0}
                    handleDelete={handleDelete}
                    onSearch={handleSearch}
                    showButton={true}
                />
                <ProjectTable
                    loading={loadingTableData}
                    tableData={filteredData}
                    rowSelection={rowSelection}
                    onDelete={handleDelete}
                />
            </div>
        </main>
    );
};

export default Project;