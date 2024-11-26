import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import { DataType } from '../IProject';
import { TableRowSelection } from 'antd/es/table/interface';
import { StatusType } from '../../deliveries/IDeliveries';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import api from '../../../service/api';

interface IProjectTable {
    loading: boolean;
    tableData: DataType[];
    rowSelection: TableRowSelection<DataType>;
    onDelete: (id: string) => void;
    handleEdit?: (record: DataType) => void;
}

export const statusTypeLabels: { [key in StatusType]: string } = {
    [StatusType.PENDING]: 'Pendente',
    [StatusType.PROCESSING]: 'Em processamento',
    [StatusType.SHIPPED]: 'Enviado',
    [StatusType.DELIVERED]: 'Entregue',
    [StatusType.CANCELLED]: 'Cancelado',
};

const ProjectTable = ({
    loading,
    tableData,
    rowSelection,
    onDelete,
    handleEdit
}: IProjectTable) => {
    const navigate = useNavigate();

    const onEdit = (record: DataType) => {
        if (handleEdit) {
            handleEdit(record);
        }
        navigate(`/edit-project/${record.key}`);
    };

    const generatePDF = (record: DataType) => {
        const doc = new jsPDF();

        doc.addImage('img/Mozini.png', 'PNG', 10, 10, 50, 20);
        doc.setFontSize(10);
        doc.text('MOZINI MOVEIS SOB MEDIDA E SERVIÇOS', 90, 20);
        doc.text('Mozini Móveis Sob Medida LTDA', 90, 26);
        doc.text('Rua Monsenhor Gercino 1021', 90, 32);
        doc.text('(47) 9241-83503 | contato@facilitmoveis.com.br', 90, 38);
        doc.text('Joinville - SC', 90, 44);

        doc.text(`Cliente: ${record.costumerName}`, 14, 64);
        doc.text(`Projeto: ${record.description}`, 14, 68);

        api.get(`/productProjects/findTotal/${record.key}`)
            .then((response) => {
                const { products: productArray, totalValue } = response.data;

                const productRows = productArray.map((product: any) => [
                    product.product.description,
                ]);

                autoTable(doc, {
                    startY: 80,
                    head: [['Produtos/Ambientes']],
                    body: productRows,
                });

                const finalY = (doc as any).lastAutoTable.finalY;
                doc.text(`Total:${totalValue}`, 14, finalY + 10);

                doc.save(`Projeto_${record.key}.pdf`);
            }).catch((err) => {
                console.error('Erro ao buscar produtos:', err);
                doc.text('Erro ao carregar os produtos.', 14, 80);

                doc.save(`Projeto_${record.key}.pdf`);
            });
    };

    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Cliente',
            dataIndex: 'costumerName',
            key: 'costumerName',
        },
        {
            title: 'Data de Competência',
            dataIndex: 'referenceDateFormat',
            key: 'referenceDateFormat',
        },
        {
            title: 'Status Financeiro',
            dataIndex: 'financialStatus',
            key: 'financialStatus',
            render: (type: StatusType) => statusTypeLabels[type] || type,
        },
        {
            title: 'Status Entrega',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (type: StatusType) => statusTypeLabels[type] || type,
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 300,
            render: (_: string, record: DataType) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(String(record.key))}
                        style={{
                            color: '#FF0000'
                        }}
                    />
                    <Button
                        icon={<FilePdfOutlined />}
                        onClick={() => generatePDF(record)}
                        style={{
                            color: '#FFA700'
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

export default ProjectTable;