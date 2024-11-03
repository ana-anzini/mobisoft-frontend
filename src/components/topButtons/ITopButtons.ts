export interface ITopButtons {
    pageTitle: string;
    mainButtonTitle: string;
    handleNew?: (arg: any) => void;
    handleEdit?: (arg: any) => void;
    handleDelete: () => void;
    hasSelection?: boolean;
}