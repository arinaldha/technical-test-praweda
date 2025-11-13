import { SingleResponse } from "@/models/response/basic_response";
import { apiClient } from "@/shared/helpers/api_client";
import getFormData from "@/shared/helpers/format_data";
import { AxiosResponse } from "axios";

export default async function uploadFileRepository<T>(file : object): Promise<AxiosResponse<SingleResponse<T>>> {
    try {
        // const form = getFormData(file)
        const config = { url: "general/uploadFile", method: "post", rule: null, body : file  }
        return await apiClient(config)
    } catch (error) {
        throw error
    }
}

