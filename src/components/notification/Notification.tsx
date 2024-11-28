import { Icon } from '@iconify/react';
import { notification as NotificationAntd } from 'antd';
import './style.sass';
import { INotification } from './INotification';

const getNotificationData = (type: string) => {
    const notificationData: { [key: string]: { title: string, icon: JSX.Element } } = {
        success: { title: 'Sucesso!', icon: <Icon icon="ant-design:check-circle-filled" /> },
        error: { title: 'Oh, não!', icon: <Icon icon="fluent-mdl2:status-error-full" /> },
        warning: { title: 'Ops!', icon: <Icon icon="ant-design:warning-filled" /> },
        info: { title: 'Aviso!', icon: <Icon icon="ant-design:info-circle-filled" /> },
    };

    return notificationData[type] || null;
};

export const Notification = ({ type, message, ...args }: INotification) => {
    const notificationData = getNotificationData(type);

    if (!notificationData) {
        console.warn(`Tipo de notificação inválido: ${type}`);
        return;
    }

    const { title, icon } = notificationData;

    NotificationAntd[type]({
        message: title,
        description: message,
        className: `notification-${type}`,
        icon,
        ...args
    });
};