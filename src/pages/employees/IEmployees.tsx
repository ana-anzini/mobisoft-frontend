export enum EmployeesType {
    SALESPERSON = 'SALESPERSON',
    PROJECT_DESIGNER = 'PROJECT_DESIGNER',
    ASSEMBLER = 'ASSEMBLER',
}

export interface DataType {
    key: React.Key;
    id: string;
    name: string;
    cpfOrCnpj: string;
    phone: string;
    email: string;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional: string;
    rg: string;
    pis: string;
    ctps: string;
    salary: string;
    admission: string;
    dismissional: string;
    employeesType: string;
}

export type ValueForm = {
    name: string;
    cpfOrCnpj: string;
    phone: string;
    email: string;
    cep: string;
    address: string;
    number: number;
    neighborhood: string;
    additional: string;
    rg: string;
    pis: string;
    ctps: string;
    salary: string;
    admission: string;
    dismissional: string;
    employeesType: string;
}