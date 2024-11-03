import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataType } from '../ISupplier';
import React from 'react';
import { TableRowSelection } from 'antd/es/table/interface';

interface ISupplierTable {
    loading: boolean;
    tableData: DataType[];
    rowSelection: TableRowSelection<DataType>;
    onDelete: (id: string) => void;
    handleEdit?: (record: DataType) => void;
}

const SupplierTable = ({
    loading,
    tableData,
    rowSelection,
    onDelete,
    handleEdit
}: ISupplierTable) => {
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'CPF/CNPJ',
            dataIndex: 'cpfOrCnpj',
            key: 'cpfOrCnpj',
        },
        {
            title: 'Tipo',
            dataIndex: 'categoryId',
            key: 'categoryId',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Ações',
            key: 'actions',
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

export default SupplierTable;