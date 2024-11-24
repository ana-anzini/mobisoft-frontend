export enum StatusType {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export enum PaymentType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
    INSTALLMENT_BOOK = 'INSTALLMENT_BOOK',
    CHECK = 'CHECK',
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
    financialStatus: string;
    deliveryStatus: string;
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
    financialStatus: string;
    deliveryStatus: string;
}

export interface DataTypeProduct {
    key: React.Key;
    id: string;
    categoryId: number;
    projectId: number;
    productId: number;
    productValue: number;
    categoryDescription: string;
    projectDescription: string;
    productDescription: string;
}

export type ValueFormProduct = {
    categoryId: number;
    projectId: number;
    productId: number;
    productValue: number;
    categoryDescription: string;
    projectDescription: string;
    productDescription: string;
}