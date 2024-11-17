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
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Fornecedor',
            dataIndex: 'supplierName',
            key: 'supplierName',
        },
        {
            title: 'Categoria',
            dataIndex: 'categoryDescription',
            key: 'categoryDescription',
        },
        {
            title: 'Quantidade disponível',
            dataIndex: 'quantity',
            key: 'quantity',
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