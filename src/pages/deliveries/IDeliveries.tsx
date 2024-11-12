export enum StatusType {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export interface DataType {
    key: React.Key;
    id: string;
    projectId: number;
    projectDescription: string;
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
    projectDescription: string;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional: string;
    deliveryDate: string;
    statusType: string;
}