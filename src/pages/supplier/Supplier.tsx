import React, { useEffect, useState } from 'react'
import SupplierModal from './components/SupplierModal'
import SupplierTable from './components/SupplierTable'
import axios from 'axios';
import { DataType } from './ISupplier';

const Supplier = () => {

    const [loadingTableData, setLoadingTableData] = useState(true);
    const [tableData, setTableData] = useState<DataType[]>([]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
            .then(response => {
                setTableData([
                    {
                        key: '1',
                        name: 'Paulo',
                        cnpj: 3274382,
                        type: 'Vidro',
                    },
                    {
                        key: '2',
                        name: 'Julia',
                        cnpj: 3274381,
                        type: 'MDF',
                    }]);
                setLoadingTableData(false);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            <SupplierModal />
            <SupplierTable
                loading={loadingTableData}
                tableData={tableData}
            />
        </div>
    )
}

export default Supplier
