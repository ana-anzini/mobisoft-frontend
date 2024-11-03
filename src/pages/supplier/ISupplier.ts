
export interface DataType {
    key: React.Key;
    id: string;
    name: string;
    cpfOrCnpj: number;
    type: string;
    phone: string;
    categoryId: number;
    email: string;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional?: string;
}

export type ValueForm = {
    categoryId: number;
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