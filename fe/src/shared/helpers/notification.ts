import { notification } from 'antd';

const configureNotification = () => {
    notification.config({
        // placement: 'bottomLeft',
        placement: 'top',
        duration: 2,
    });
};

export const showSuccessNotification = (message?: string) => {
    notification.success({
        message,
    });
};

export const showErrorNotification = (message?: string) => {
    notification.error({
        message,
    });
};
