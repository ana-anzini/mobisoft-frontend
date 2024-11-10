import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataType, NetworkType, PersonType } from '../ICostumer';
import { TableRowSelection } from 'antd/es/table/interface';

interface ICostumerTable {
    loading: boolean;
    tableData: DataType[];
    rowSelection: TableRowSelection<DataType>;
    onDelete: (id: string) => void;
    handleEdit?: (record: DataType) => void;
}

export const personTypeLabels: { [key in PersonType]: string } = {
    [PersonType.INDIVIDUAL]: 'Física',
    [PersonType.CORPORATE]: 'Jurídica',
};

export const networkTypeLabels: { [key in NetworkType]: string } = {
    [NetworkType.INSTAGRAM]: 'Instagram',
    [NetworkType.STORE]: 'Loja',
};

const CostumerTable = ({
    loading,
    tableData,
    rowSelection,
    onDelete,
    handleEdit
}: ICostumerTable) => {
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
            dataIndex: 'personType',
            key: 'personType',
            render: (type: PersonType) => personTypeLabels[type] || type,
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

export default CostumerTable;