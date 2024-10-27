import { Table } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataType } from '../ISupplier';

interface ISupplierTable {
    loading: boolean;
    tableData: DataType[];
    rowSelection: TableRowSelection<DataType>;
}

const SupplierTable = ({ loading, tableData, rowSelection }: ISupplierTable) => {

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'CNPJ',
            dataIndex: 'cpfOrCnpj',
            key: 'cpfOrCnpj',
        },
        {
            title: 'Tipo',
            dataIndex: 'supplierType',
            key: 'supplierType',
        },
    ];

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
