
export interface DataType {
    key: React.Key;
    id: string;
    projectId: number;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional: string;
    deliveryDate: string;
    statusType: string;
}

export type ValueForm = {
    projectId: number;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional: string;
    deliveryDate: string;
    statusType: string;
}