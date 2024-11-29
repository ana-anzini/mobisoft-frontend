
export interface DataType {
    key: React.Key;
    id: string;
    tax: number;
    additionalFinancial: number;
    additionalSeller: number;
    additionalProjectDesigner: number;
    additionalAssembler: number;
    companyName: string;
    socialReason: string;
    address: string;
    phone: string;
    email: string;
}

export type ValueForm = {
    tax: number;
    additionalFinancial: number;
    additionalSeller: number;
    additionalProjectDesigner: number;
    additionalAssembler: number;
    companyName: string;
    socialReason: string;
    address: string;
    phone: string;
    email: string;
}