import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataType, EmployeesType } from '../IEmployees';
import { TableRowSelection } from 'antd/es/table/interface';

interface IEmployeesTable {
    loading: boolean;
    tableData: DataType[];
    rowSelection: TableRowSelection<DataType>;
    onDelete: (id: string) => void;
    handleEdit?: (record: DataType) => void;
}

export const employeesTypeLabels: { [key in EmployeesType]: string } = {
    [EmployeesType.SALESPERSON]: 'Vendedor',
    [EmployeesType.PROJECT_DESIGNER]: 'Projetista',
    [EmployeesType.ASSEMBLER]: 'Montador',
};

const renderActions = (
    record: DataType,
    onDelete: (id: string) => void,
    handleEdit?: (record: DataType) => void
) => (
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
);

const EmployeesTable = ({
    loading,
    tableData,
    rowSelection,
    onDelete,
    handleEdit
}: IEmployeesTable) => {
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'CPF',
            dataIndex: 'cpfOrCnpj',
            key: 'cpfOrCnpj',
        },
        {
            title: 'Tipo',
            dataIndex: 'employeesType',
            key: 'employeesType',
            render: (type: EmployeesType) => employeesTypeLabels[type] || type,
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 300,
            render: (_: string, record: DataType) => renderActions(record, onDelete, handleEdit),
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

export default EmployeesTable;