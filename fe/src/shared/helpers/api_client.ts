import AxiosInstance from "@/config/axios_config";
import { AxiosRequestConfig } from "axios";

type ApiClientProp = {
    url: string; 
    method: string; 
    rule?: Nullable<string>
    body?: Record<string, any> 
}

export const apiClient = async (params: ApiClientProp) => {
   
    const config: AxiosRequestConfig = {
        url : params.url,
        method: params.method,
        data: params.body,
        headers: {},
 
    }

    try {
        return await AxiosInstance.request(config);
    } catch (error: any) {
        throw error
    }
};