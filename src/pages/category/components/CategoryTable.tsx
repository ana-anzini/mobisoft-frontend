import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataType } from '../ICategory';
import { TableRowSelection } from 'antd/es/table/interface';

interface ICategoryTable {
    loading: boolean;
    tableData: DataType[];
    rowSelection: TableRowSelection<DataType>;
    onDelete: (id: string) => void;
    handleEdit?: (record: DataType) => void;
}

const CategoryTable = ({
    loading,
    tableData,
    rowSelection,
    onDelete,
    handleEdit
}: ICategoryTable) => {
    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
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

export default CategoryTable;