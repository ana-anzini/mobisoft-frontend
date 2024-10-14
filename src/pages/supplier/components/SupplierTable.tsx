import { Table } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataType } from '../ISupplier';

interface ISupplierTable {
    loading: boolean;
    tableData: DataType[];
}

const SupplierTable = ({ loading, tableData }: ISupplierTable) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'CNPJ',
            dataIndex: 'cnpj',
            key: 'cnpj',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div>
            <Table
                dataSource={tableData}
                rowSelection={rowSelection}
                columns={columns}
                loading={loading}
            />
        </div>
    )
}

export default SupplierTable
