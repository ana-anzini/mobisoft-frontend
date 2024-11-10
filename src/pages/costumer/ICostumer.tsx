export enum NetworkType {
    INSTAGRAM = 'INSTAGRAM',
    STORE = 'STORE',
}

export enum PersonType {
    INDIVIDUAL = 'INDIVIDUAL',
    CORPORATE = 'CORPORATE',
}

export interface DataType {
    key: React.Key;
    id: string;
    name: string;
    cpfOrCnpj: string;
    phone: string;
    email: string;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional: string;
    rg: string;
    birthday: string;
    networkType: string;
    personType: string;
    notes: string;
}

export type ValueForm = {
    name: string;
    cpfOrCnpj: string;
    phone: string;
    email: string;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional: string;
    rg: string;
    birthday: string;
    networkType: string;
    personType: string;
    notes: string;
}