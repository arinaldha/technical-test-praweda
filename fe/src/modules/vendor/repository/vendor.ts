import { SingleResponse } from "@/models/response/basic_response"
import { AxiosResponse } from "axios"
import { apiClient } from "@/shared/helpers/api_client"


import { getRolePermission, findRoleModule, ModuleEnum } from "@/shared/roles/role"
import { UseCaseRepositoryRequest } from "@/models/utils/request"
import getFormData from "@/shared/helpers/format_data"
import { VendorResponse } from "@/models/vendor/response"
import { method } from "lodash"

export class VendorRepository {

    static FindEntity = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<VendorResponse[]>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            list_status,
            approval_action,
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findVendor')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findVendor?show_all=Y`
            if (p && l) {
                baseUrl += `&page=${p}&limit=${l}`
            }

            if (list_status) {
                baseUrl = `/${findRole?.parentPath}/findVendor?page=${p}&limit=${l}&show_all=N&list_status=${list_status}&approval_action=${approval_action}`
            }

            if (search) {
                baseUrl += `&search=${search}`
            }


            const config = {
                url: baseUrl,
                method: 'get',
                
            }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindEntityById = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<VendorResponse>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findVendor')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findVendor/${id}`, method: `get`,  }
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
            const config = { url: `/${findRole?.parentPath}/createVendor`, method: `post`, body: body!,  }
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
            const findRole = await findRoleModule(moduleName, 'updateVendor')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/updateVendor/${id}`, method: `patch`, body: body!,  }
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
            const findRole = await findRoleModule(moduleName, 'removeVendor')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/removeVendor/${id}`, method: `delete`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static SetContactVendor = async <T>(request: object): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const config = { url: `/vendor/setVendorContact`, method: 'post', body: request, rule: null }
            return await apiClient(config)
        } catch (error) {
            throw error
        }
    }

    static SetLegalDocumentVendor = async <T>(request: object): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const config = { url: `/vendor/setVendorLegalDocument`, method: 'post', body: request, rule: null }
            return await apiClient(config)
        } catch (error) {
            throw error
        }
    }

    static SetVendorBankAccount = async <T>(request: object): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const config = { url: `/vendor/setVendorBank`, method: 'post', body: request, rule: null }
            return await apiClient(config)
        } catch (error) {
            throw error
        }
    }

    static FindVendorDetail = async <T>(
        params: {
            id: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.VendorProductModule, 'findVendorProduct')
            const generateRolePermission = await getRolePermission(ModuleEnum.VendorProductModule, findRole!.role)

            return await apiClient({
                url: `/vendor/findVendorProduct/${params.id}`,
                method: 'get',
                
            })
        } catch (error) {
            throw error
        }
    }






}