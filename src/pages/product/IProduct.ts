
export interface DataType {
    key: React.Key;
    id: string;
    description: string;
    productValue: number;
    categoryId: number;
    supplierId: number;
    categoryDescription: string;
    supplierDescription: string;
}

export type ValueForm = {
    categoryId: number;
    supplierId: number;
    description: string;
    productValue: number;
}