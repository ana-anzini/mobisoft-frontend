import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import { DataType } from '../IProject';
import { TableRowSelection } from 'antd/es/table/interface';
import { StatusType } from '../../deliveries/IDeliveries';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface IProjectTable {
    loading: boolean;
    tableData: DataType[];
    rowSelection: TableRowSelection<DataType>;
    onDelete: (id: string) => void;
    handleEdit?: (record: DataType) => void;
}

export const statusTypeLabels: { [key in StatusType]: string } = {
    [StatusType.PENDING]: 'Pendente',
    [StatusType.PROCESSING]: 'Em processamento',
    [StatusType.SHIPPED]: 'Enviado',
    [StatusType.DELIVERED]: 'Entregue',
    [StatusType.CANCELLED]: 'Cancelado',
};

const ProjectTable = ({
    loading,
    tableData,
    rowSelection,
    onDelete,
    handleEdit
}: IProjectTable) => {
    const navigate = useNavigate();

    const onEdit = (record: DataType) => {
        if (handleEdit) {
            handleEdit(record);
        }
        navigate(`/edit-project/${record.key}`);
    };

    const generatePDF = (record: DataType) => {
        const doc = new jsPDF();

        doc.text('Detalhes do Projeto', 14, 16);

        autoTable(doc, {
            startY: 20,
            head: [['Campo', 'Valor']],
            body: [
                ['Descrição', record.description],
            ],
        });

        doc.save(`Projeto_${record.key}.pdf`);
    };

    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Cliente',
            dataIndex: 'costumerName',
            key: 'costumerName',
        },
        {
            title: 'Data de Competência',
            dataIndex: 'referenceDateFormat',
            key: 'referenceDateFormat',
        },
        {
            title: 'Status Financeiro',
            dataIndex: 'financialStatus',
            key: 'financialStatus',
            render: (type: StatusType) => statusTypeLabels[type] || type,
        },
        {
            title: 'Status Entrega',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (type: StatusType) => statusTypeLabels[type] || type,
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 300,
            render: (_: string, record: DataType) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(String(record.key))}
                        style={{
                            color: '#FF0000'
                        }}
                    />
                    <Button
                        icon={<FilePdfOutlined />}
                        onClick={() => generatePDF(record)}
                        style={{
                            color: '#FFA700'
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={tableData}
                rowSelection={rowSelection}
                columns={columns}
                loading={loading}
                rowKey="key"
            />
        </div>
    );
};

export default ProjectTable;