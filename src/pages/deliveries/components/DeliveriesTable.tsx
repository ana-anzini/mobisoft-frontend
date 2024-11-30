import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataType, StatusType } from '../IDeliveries';
import { TableRowSelection } from 'antd/es/table/interface';

interface IDeliveriesTable {
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

const DeliveriesTable = ({
    loading,
    tableData,
    rowSelection,
    onDelete,
    handleEdit
}: IDeliveriesTable) => {
    const columns = [
        {
            title: 'Projeto',
            dataIndex: 'projectDescription',
            key: 'projectDescription',
        },
        {
            title: 'Data de Entrega',
            dataIndex: 'deliveryDateFormat',
            key: 'deliveryDateFormat',
        },
        {
            title: 'Status',
            dataIndex: 'statusType',
            key: 'statusType',
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
                        onClick={() => handleEdit && handleEdit(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(String(record.key))}
                        style={{
                            color: '#FF0000'
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

export default DeliveriesTable;