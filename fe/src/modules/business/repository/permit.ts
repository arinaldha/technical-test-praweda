import { SingleResponse } from "@/models/response/basic_response"
import { AxiosResponse } from "axios"
import { apiClient } from "@/shared/helpers/api_client"

import { getRolePermission, findRoleModule } from "@/shared/roles/role"
import { UseCaseRepositoryRequest, UseCaseUniversalRequest } from "@/models/utils/request"
import getFormData from "@/shared/helpers/format_data"
import { PermitResponse } from "@/models/business/responses/response"
import { getParamSearch } from "@/shared/utils/get-param-search"

export class BussinessPermitRepository {

    static FindPermit = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<PermitResponse[]>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            let paramQuery = await getParamSearch({ search, page: p, limit: l})
            const findRole = await findRoleModule(moduleName, 'findBusinessPermit')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findBusinessPermit${paramQuery}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindPermitById = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<PermitResponse>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findBusinessPermit')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findBusinessPermit/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async CreatePermit<T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'createBusinessPermit')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/createBusinessPermit`, method: `post`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async UpdatePermit<T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'updateBusinessPermit')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const formBody = getFormData(body)
            const config = { url: `/${findRole?.parentPath}/updateBusinessPermit/${id}`, method: `patch`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }






}