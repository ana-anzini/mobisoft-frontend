import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataTypeProduct } from '../IProject';
import { TableRowSelection } from 'antd/es/table/interface';

interface IProjectTable {
    loading: boolean;
    tableData: DataTypeProduct[];
    rowSelection: TableRowSelection<DataTypeProduct>;
    handleEdit?: (record: DataTypeProduct) => void;
    onDelete: (id: string) => void;
}

const ProjectTable = ({
    loading,
    tableData,
    rowSelection,
    handleEdit,
    onDelete
}: IProjectTable) => {
    const columns = [
        {
            title: 'Categoria',
            dataIndex: 'categoryDescription',
            key: 'categoryDescription',
        },
        {
            title: 'Produto/Ambiente',
            dataIndex: 'productDescription',
            key: 'productDescription',
        },
        {
            title: 'Custo (R$)',
            dataIndex: 'productValue',
            key: 'productValue',
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 300,
            render: (_: string, record: DataTypeProduct) => (
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
            />
        </div>
    );
};

export default ProjectTable;