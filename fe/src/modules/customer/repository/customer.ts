import { SingleResponse } from "@/models/response/basic_response"
import { AxiosResponse } from "axios"
import { apiClient } from "@/shared/helpers/api_client"


import { getRolePermission, findRoleModule, ModuleEnum } from "@/shared/roles/role"
import { UseCaseRepositoryRequest } from "@/models/utils/request"
import getFormData from "@/shared/helpers/format_data"
import { CustomerResponse } from "@/models/customer/response/respose"
import { method } from "lodash"

export class CustomerRepository {

    static FindEntity = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<CustomerResponse[]>>> => {
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
            const findRole = await findRoleModule(moduleName, 'findCustomer')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findCustomer?show_all=Y`
            if (p && l) {
                baseUrl += `&page=${p}&limit=${l}`
            }

            if (list_status) {
                baseUrl = `/${findRole?.parentPath}/findCustomer?page=${p}&limit=${l}&show_all=N&list_status=${list_status}&approval_action=${approval_action}`
            }

            if (search) {
                baseUrl += `&search=${search}&page=${1}`
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
    ): Promise<AxiosResponse<CustomerResponse>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findCustomer')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCustomer/${id}`, method: `get`,  }
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

    static SetContactCustomer = async <T>(request: object): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const config = { url: `/customer/setCustomerContact`, method: 'post', body: request, rule: null }
            return await apiClient(config)
        } catch (error) {
            throw error
        }
    }

    static SetLegalDocumentCustomer = async <T>(request: object): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const config = { url: `/customer/setCustomerLegalDocument`, method: 'post', body: request, rule: null }
            return await apiClient(config)
        } catch (error) {
            throw error
        }
    }

    static FindCustomerDetail = async <T>(
        params: {
            id: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.CustomerModule, 'findCustomer')
            const generateRolePermission = await getRolePermission(ModuleEnum.CustomerModule, findRole!.role)

            return await apiClient({
                url: `/customer/findCustomer/${params.id}`,
                method: 'get',
                
            })
        } catch (error) {
            throw error
        }
    }






}