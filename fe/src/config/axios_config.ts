import { aesEncrypter } from '@/shared/helpers/aes_enc';
import decodeToken from '@/shared/helpers/jwt_decode';
import axios, { AxiosError, AxiosResponse } from 'axios'
import cookies from 'js-cookie'

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || '' });
axiosInstance.interceptors.request.use(
    config => {
        const access_token = cookies.get("access_token")
        if (config.headers !== undefined) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        try {
            return Promise.reject(
                error.response && (error.response.data as any)
                    ? error.response.data
                    : 'Something went wrong'
            );
        } catch (err) {
            return Promise.reject('Something went wrong');
        }
    });


export default axiosInstance