
export interface DataType {
    key: React.Key;
    name: string;
    cnpj: number;
    type: string;
}

export type ValueForm = {
    supplierType: string;
    name: string;
    cpfOrCnpj: string;
    phone: string;
    email: string;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional?: string;
}