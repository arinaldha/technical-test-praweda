import { SingleResponse } from "@/models/response/basic_response"
import { AxiosResponse } from "axios"
import { apiClient } from "@/shared/helpers/api_client"

import { getRolePermission, findRoleModule } from "@/shared/roles/role"
import { UseCaseRepositoryRequest, UseCaseUniversalRequest } from "@/models/utils/request"
import getFormData from "@/shared/helpers/format_data"
import { AnyObject } from "antd/es/_util/type"



export interface CurrencyResponse {
    id: string
    company_id?: string
    company?: {
        company_name: string
    }
    currency_code: string
    currency_name: string
    is_base_currency: 0 | 1
    is_active: 0 | 1
}


export class CurrencyRepository {

    static FindCurrency = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<CurrencyResponse[]>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findCurrency')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCurrency`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindExchangeRate = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<CurrencyResponse[]>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            currency_id
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findExchangeRate')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findExchangeRate?currency_id=${currency_id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindCurrencyId = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<CurrencyResponse>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findCurrency')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCurrency/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindExchangeRateId = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<AnyObject>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findExchangeRate')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findExchangeRate/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async CreateCurrency<T>(
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
            const findRole = await findRoleModule(moduleName, 'createCurrency')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/createCurrency`, method: `post`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async UpdateCurrency<T>(
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
            const findRole = await findRoleModule(moduleName, 'updateCurrency')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const formBody = getFormData(body)
            const config = { url: `/${findRole?.parentPath}/updateCurrency/${id}`, method: `patch`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }






}