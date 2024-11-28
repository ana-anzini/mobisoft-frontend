import { render } from '@testing-library/react';
import { Notification } from './Notification'; // Caminho do seu componente
import { notification as NotificationAntd } from 'antd';
import { Icon } from '@iconify/react';

jest.mock('antd', () => ({
    notification: {
        success: jest.fn(),
        error: jest.fn(),
        warning: jest.fn(),
        info: jest.fn(),
    },
}));

jest.mock('@iconify/react', () => ({
    Icon: jest.fn(() => <div />),
}));

describe('Notification', () => {
    it('deve chamar notification.success com os parâmetros corretos quando o tipo for "success"', () => {
        const message = 'A operação foi bem-sucedida!';

        // Chama a função Notification com tipo "success"
        Notification({
            type: 'success',
            message,
        });

        // Verifica se a função de notificação success foi chamada corretamente
        expect(NotificationAntd.success).toHaveBeenCalledWith({
            message: 'Sucesso!',
            description: message,
            className: 'notification-success',
            icon: <Icon icon="ant-design:check-circle-filled" />,
        });
    });

    it('deve chamar notification.error com os parâmetros corretos quando o tipo for "error"', () => {
        const message = 'Algo deu errado!';

        // Chama a função Notification com tipo "error"
        Notification({
            type: 'error',
            message,
        });

        // Verifica se a função de notificação error foi chamada corretamente
        expect(NotificationAntd.error).toHaveBeenCalledWith({
            message: 'Oh, não!',
            description: message,
            className: 'notification-error',
            icon: <Icon icon="fluent-mdl2:status-error-full" />,
        });
    });

    it('deve chamar notification.warning com os parâmetros corretos quando o tipo for "warning"', () => {
        const message = 'Atenção!';

        // Chama a função Notification com tipo "warning"
        Notification({
            type: 'warning',
            message,
        });

        // Verifica se a função de notificação warning foi chamada corretamente
        expect(NotificationAntd.warning).toHaveBeenCalledWith({
            message: 'Ops!',
            description: message,
            className: 'notification-warning',
            icon: <Icon icon="ant-design:warning-filled" />,
        });
    });

    it('deve chamar notification.info com os parâmetros corretos quando o tipo for "info"', () => {
        const message = 'Informação importante!';

        // Chama a função Notification com tipo "info"
        Notification({
            type: 'info',
            message,
        });

        // Verifica se a função de notificação info foi chamada corretamente
        expect(NotificationAntd.info).toHaveBeenCalledWith({
            message: 'Aviso!',
            description: message,
            className: 'notification-info',
            icon: <Icon icon="ant-design:info-circle-filled" />,
        });
    });

    it('não deve chamar a função de notificação se o tipo não for válido', () => {
        const message = 'Mensagem desconhecida!';

        // Chama a função Notification com tipo inválido
        Notification({
            type: 'unknown' as any,
            message,
        });

        // Verifica que nenhuma função foi chamada
        expect(NotificationAntd.success).not.toHaveBeenCalled();
        expect(NotificationAntd.error).not.toHaveBeenCalled();
        expect(NotificationAntd.warning).not.toHaveBeenCalled();
        expect(NotificationAntd.info).not.toHaveBeenCalled();
    });
});