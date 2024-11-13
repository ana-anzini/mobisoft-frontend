import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataType } from '../IProject';
import { TableRowSelection } from 'antd/es/table/interface';

interface IProjectTable {
}

const ProjectTable = ({
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

            />
        </div>
    );
};

export default ProjectTable;