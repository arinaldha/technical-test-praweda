import { SingleResponse } from "@/models/response/basic_response"
import { AxiosResponse } from "axios"
import { apiClient } from "@/shared/helpers/api_client"

import { getRolePermission, findRoleModule } from "@/shared/roles/role"
import { UseCaseRepositoryRequest, UseCaseUniversalRequest } from "@/models/utils/request"
import getFormData from "@/shared/helpers/format_data"
import { LegalDocumentResponse, PermitResponse } from "@/models/business/responses/response"

export class LegalDocumentRepository {

    static FindLegalDocument = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<LegalDocumentResponse[]>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findLegalDocument')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findLegalDocument`
            if (search) {
                baseUrl += '?search=' + search + "&page=" + 1
            }
            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findLegalDocument?page=${p}&limit=${l}`
            }

            const config = { url: baseUrl, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindLegalDocumentById = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<LegalDocumentResponse>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findLegalDocument')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findLegalDocument/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async CreateLegal<T>(
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
            const config = { url: `/${findRole?.parentPath}/createLegalDocument`, method: `post`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async UpdateLegalDocument<T>(
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
            const findRole = await findRoleModule(moduleName, 'updateLegalDocument')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/updateLegalDocument/${id}`, method: `patch`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }


    static async DeleteLegalDocument<T>(
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
            const findRole = await findRoleModule(moduleName, 'removeLegalDocument')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/removeLegalDocument/${id}`, method: `delete`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }







}