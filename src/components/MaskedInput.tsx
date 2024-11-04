import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

interface MaskedInputProps {
    value?: string;
    onChange?: (value: string) => void;
    maskType: 'telefone' | 'cpfCnpj';
    placeholder?: string;
}

const MaskedInput: React.FC<MaskedInputProps> = ({ value = '', onChange, maskType, placeholder }) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const formatValue = (input: string) => {
        const onlyNumbers = input.replace(/\D/g, '');

        if (maskType === 'telefone') {
            // Máscara para telefone (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
            return onlyNumbers.length <= 10
                ? onlyNumbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
                : onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (maskType === 'cpfCnpj') {
            // Máscara para CPF (XXX.XXX.XXX-XX) ou CNPJ (XX.XXX.XXX/XXXX-XX)
            return onlyNumbers.length <= 11
                ? onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
                : onlyNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }

        return input; // Retorno sem formatação, caso o tipo seja inválido
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatValue(e.target.value);
        setInputValue(formattedValue);
        if (onChange) onChange(formattedValue);
    };

    return (
        <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            maxLength={maskType === 'telefone' ? 15 : 18} // Limita o tamanho do input para cada tipo de máscara
        />
    );
};

export default MaskedInput;