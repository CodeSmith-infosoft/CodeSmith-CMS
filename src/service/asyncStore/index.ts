import axios, {
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from 'axios';

// Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT
});

// Request Interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access, logout or redirect
            console.warn('Unauthorized - redirecting to login...');
        }
        if (error.response) {

        }
        return Promise.reject(error);
    }
);

export default api;
