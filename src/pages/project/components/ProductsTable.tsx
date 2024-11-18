import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataTypeProduct } from '../IProject';
import { TableRowSelection } from 'antd/es/table/interface';

interface IProjectTable {
    loading: boolean;
    tableData: DataTypeProduct[];
    rowSelection: TableRowSelection<DataTypeProduct>;
}

const ProjectTable = ({
    loading,
    tableData,
    rowSelection,
}: IProjectTable) => {
    const columns = [
        {
            title: 'Categoria',
            dataIndex: 'categoryId',
            key: 'categoryId',
        },
        {
            title: 'Produto/Ambiente',
            dataIndex: 'productId',
            key: 'productId',
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