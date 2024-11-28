import axios from "axios";
import { Notification } from "../components/notification/Notification";

const api = axios.create({
    baseURL: 'https://mobisoft.site/api',
    headers: {
        "Content-type": "application/json",
    },
});

api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

//Sessão expirada
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            sessionStorage.removeItem('token');
            Notification({ type: "error", message: "Sessão expirada. Por favor, faça login novamente." });
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);

export default api;