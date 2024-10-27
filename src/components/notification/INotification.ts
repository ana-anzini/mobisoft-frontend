import { ConfigProviderProps } from "antd";
import { CSSProperties, ReactNode } from "react";

export interface INotification {
    type: NotifType;
    message: string;
    icon?: ReactNode;
    style?: CSSProperties;
}

export type NotifType = 'success' | 'info' | 'warning' | 'error';
