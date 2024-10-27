import { CSSProperties, ReactNode } from "react";

export interface ITopButtons {
    pageTittle: string;
    mainButtonIcon?: ReactNode;
    mainButtonTitle: string;
    handleNew?: (arg: any) => void;
    handleEdit?: (arg: any) => void;
    handleDelete?: (arg: any) => void;
    handleSearch?: (arg: any) => void;
    handleFilter?: (arg: any) => void;
    isEditable?: boolean;
    isDeletable?: boolean;
    settingsButton?: boolean;
    searchPlaceholder?: string;
    disabledMainButton?: boolean;
    mainButtonStyles?: CSSProperties
}