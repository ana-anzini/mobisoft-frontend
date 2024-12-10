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
            return onlyNumbers.length <= 10
                ? onlyNumbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
                : onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (maskType === 'cpfCnpj') {
            return onlyNumbers.length <= 11
                ? onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
                : onlyNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }

        return input;
    };

    const validateCPF = (cpf: string): boolean => {
        const onlyNumbers = cpf.replace(/\D/g, '');
        if (onlyNumbers.length !== 11 || /^(\d)\1+$/.test(onlyNumbers)) {
            return false;
        }

        const calculateDigit = (cpf: string, factor: number) => {
            let sum = 0;
            for (let i = 0; i < factor - 1; i++) {
                sum += parseInt(cpf[i]) * (factor - i);
            }
            const remainder = sum % 11;
            return remainder < 2 ? 0 : 11 - remainder;
        };

        const firstDigit = calculateDigit(onlyNumbers, 10);
        const secondDigit = calculateDigit(onlyNumbers, 11);

        return (
            firstDigit === parseInt(onlyNumbers[9]) &&
            secondDigit === parseInt(onlyNumbers[10])
        );
    };

    const validateCNPJ = (cnpj: string): boolean => {
        const onlyNumbers = cnpj.replace(/\D/g, '');
        if (onlyNumbers.length !== 14 || /^(\d)\1+$/.test(onlyNumbers)) {
            return false;
        }

        const calculateDigit = (cnpj: string, factor: number[]) => {
            let sum = 0;
            for (let i = 0; i < factor.length; i++) {
                sum += parseInt(cnpj[i]) * factor[i];
            }
            const remainder = sum % 11;
            return remainder < 2 ? 0 : 11 - remainder;
        };

        const firstFactor = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const secondFactor = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        const firstDigit = calculateDigit(onlyNumbers, firstFactor);
        const secondDigit = calculateDigit(onlyNumbers, secondFactor);

        return (
            firstDigit === parseInt(onlyNumbers[12]) &&
            secondDigit === parseInt(onlyNumbers[13])
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatValue(e.target.value);
        setInputValue(formattedValue);
        if (onChange) onChange(formattedValue);

        if (maskType === 'cpfCnpj') {
            const onlyNumbers = formattedValue.replace(/\D/g, '');
            if (onlyNumbers.length === 11) {
                const isValidCPF = validateCPF(onlyNumbers);
                console.log(isValidCPF ? 'CPF válido' : 'CPF inválido');
            } else if (onlyNumbers.length === 14) {
                const isValidCNPJ = validateCNPJ(onlyNumbers);
                console.log(isValidCNPJ ? 'CNPJ válido' : 'CNPJ inválido');
            }
        }
    };

    return (
        <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            maxLength={maskType === 'telefone' ? 15 : 18}
        />
    );
};

export default MaskedInput;