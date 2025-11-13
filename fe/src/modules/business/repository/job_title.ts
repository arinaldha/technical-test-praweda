import { SingleResponse } from "@/models/response/basic_response"
import { AxiosResponse } from "axios"
import { apiClient } from "@/shared/helpers/api_client"

import { getRolePermission, findRoleModule } from "@/shared/roles/role"
import { UseCaseRepositoryRequest, UseCaseUniversalRequest } from "@/models/utils/request"
import { JobTitleResponse, PermitResponse } from "@/models/business/responses/response"

export class JobTitleRepository {

    static FindJobTitle = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<JobTitleResponse[]>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findJobTitle')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findJobTitle`
            if (search) {
                baseUrl += '?search=' + search + "&page=" + 1
            }
            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findJobTitle?page=${p}&limit=${l}`
            }

            const config = { url: baseUrl, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindJobTitleById = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<JobTitleResponse>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findJobTitle')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findJobTitle/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async CreateJobTitle<T>(
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
            const findRole = await findRoleModule(moduleName, 'createJobTitle')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/createJobTitle`, method: `post`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async UpdateJobTitle<T>(
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
            const findRole = await findRoleModule(moduleName, 'updateJobTitle')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/updateJobTitle/${id}`, method: `patch`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async DeleteJobTitle<T>(
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
            const findRole = await findRoleModule(moduleName, 'removeJobTitle')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/removeJobTitle/${id}`, method: `delete`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }




}