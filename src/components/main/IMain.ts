import { CSSProperties, ReactNode } from "react";

export interface IMain {
    mainButtonTitle: string;
    mainButtonIcon?: ReactNode;
    handleEdit: (a: any) => void
    handleDelete: (a: any) => void
}