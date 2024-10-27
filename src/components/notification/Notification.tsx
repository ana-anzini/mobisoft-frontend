import { Icon } from '@iconify/react';
import { notification as NotificationAntd } from 'antd';
import "./style.sass";
import { INotification } from './INotification';

export const Notification = ({
    type,
    message,
    ...args
}: INotification) => {
    const notificationTitle =
        type === 'success' ? 'Sucesso!'
            : type === 'error' ? 'Oh, não!'
                : type === 'warning' ? 'Ops!'
                    : 'Aviso!'

    const icon =
        type === 'success' ? <Icon icon="ant-design:check-circle-filled" />
            : type === 'error' ? <Icon icon="fluent-mdl2:status-error-full" />
                : type === 'warning' ? <Icon icon="ant-design:warning-filled" />
                    : <Icon icon="ant-design:info-circle-filled" />

    NotificationAntd[type]({
        // top: 5,
        message: notificationTitle,
        description: message,
        className: `notification-${type}`,
        icon,
        ...args
    })

}

