import { SingleResponse } from "@/models/response/basic_response"
import { AxiosResponse } from "axios"
import { apiClient } from "@/shared/helpers/api_client"


import { getRolePermission, findRoleModule } from "@/shared/roles/role"
import { UseCaseRepositoryRequest } from "@/models/utils/request"
import getFormData from "@/shared/helpers/format_data"
import { EntityResponse } from "@/models/business/responses/response"

export class BussinessEntryRepository {

    static FindEntity = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<EntityResponse[]>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findBusinessEntry')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)


            let baseUrl = `/${findRole?.parentPath}/findBusinessEntry`
            if (search) {
                baseUrl += '?search=' + search + "&page=" + 1
            }
            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findBusinessEntry?page=${p}&limit=${l}`
            }

            const config = { url: baseUrl, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindEntityById = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<EntityResponse>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findBusinessEntry')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findBusinessEntry/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async CreateEntity<T>(
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
            const findRole = await findRoleModule(moduleName, 'create')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/createBussinessEntry`, method: `post`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async UpdateEntity<T>(
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
            const findRole = await findRoleModule(moduleName, 'updateBussinessEntry')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/updateBussinessEntry/${id}`, method: `patch`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async DeleteEntity<T>(
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
            const findRole = await findRoleModule(moduleName, 'removeBusinessEntry')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/removeBusinessEntry/${id}`, method: `delete`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }






}