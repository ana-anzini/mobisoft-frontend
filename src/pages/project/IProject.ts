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
    description: string;
    costumerId: number;
    projectDesignerId: number;
    sellerId: number;
    referenceDate: string;
    conclusionPending: boolean;
    notes: string;
}

export type ValueForm = {
    categoryId: number;
    supplierId: number;
    description: string;
    costumerId: number;
    projectDesignerId: number;
    sellerId: number;
    referenceDate: string;
    conclusionPending: boolean;
    notes: string;
}


export interface DataTypeProduct {
    key: React.Key;
    id: string;
    description: string;
    productValue: number;
    categoryId: number;
    supplierId: number;
    categoryDescription: string;
    supplierDescription: string;
}

export type ValueFormProduct = {
    categoryId: number;
    supplierId: number;
    description: string;
    productValue: number;
}