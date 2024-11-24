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

export interface DataTypeFinancial {
    key: React.Key;
    id: string;
    installmentsNumber: number;
    firstPayment: string;
    paymentType: string;
    additionalExpenses: number;
}

export type ValueFormFinancial = {
    installmentsNumber: number;
    firstPayment: string;
    paymentType: string;
    additionalExpenses: number;
}

export interface DataTypeDelivery {
    key: React.Key;
    id: string;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional: string;
    deliveryDate: string;
    freight: number;
}

export type ValueFormDelivery = {
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional: string;
    deliveryDate: string;
    freight: number;
}