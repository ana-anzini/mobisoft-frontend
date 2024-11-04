import React, { useState, useEffect } from 'react';
import { Input, message } from 'antd';
import axios from 'axios';

interface ZipCodeSearchProps {
    onAddressChange: (address: string, neighborhood: string) => void;
    value?: string;
    onChange?: (cep: string) => void;
}

const ZipCodeSearch: React.FC<ZipCodeSearchProps> = ({ onAddressChange, value = '', onChange }) => {
    const [cep, setCep] = useState(value);

    useEffect(() => {
        setCep(value);
    }, [value]);

    const formatCep = (cep: string) => {
        const cleaned = cep.replace(/\D/g, '');
        return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    const fetchAddress = async (cep: string) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const { logradouro, bairro } = response.data;

            if (logradouro && bairro) {
                onAddressChange(logradouro, bairro);
            } else {
                message.error('CEP não encontrado. Verifique e tente novamente.');
                clearCepField();
            }
        } catch (error) {
            message.error('Erro ao buscar o CEP. Tente novamente.');
            clearCepField();
        }
    };

    const handleBlur = () => {
        if (cep) {
            fetchAddress(cep);
        } else {
            message.warning('Por favor, insira um CEP.');
        }
    };

    const clearCepField = () => {
        setCep('');
        if (onChange) onChange('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCep = formatCep(e.target.value);
        setCep(formattedCep);
        if (onChange) onChange(formattedCep);
    };

    return (
        <Input
            placeholder="Digite o CEP"
            value={cep}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={9}
        />
    );
};

export default ZipCodeSearch;