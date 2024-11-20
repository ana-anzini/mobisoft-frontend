
export interface DataType {
    key: React.Key;
    id: string;
    tax: number;
    additionalFinancial: number;
    additionalSeller: number;
    additionalProjectDesigner: number;
    additionalAssembler: number;
}

export type ValueForm = {
    tax: number;
    additionalFinancial: number;
    additionalSeller: number;
    additionalProjectDesigner: number;
    additionalAssembler: number;
}