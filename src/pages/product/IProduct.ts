
export interface DataType {
    key: React.Key;
    id: string;
    description: string;
    quantity: number;
    categoryId: number;
    supplierId: number;
    categoryDescription: string;
    supplierDescription: string;
}

export type ValueForm = {
    categoryId: number;
    supplierId: number;
    description: string;
    quantity: number;
}