import { BranchApprovalRequest, BranchBankMappingRequest } from "@/models/request/master/branch_request";
import { SingleResponse } from "@/models/response/basic_response";
import { UseCaseRepositoryRequest } from "@/models/utils/request";
import { apiClient } from "@/shared/helpers/api_client";
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role";
import { AxiosResponse } from "axios";
import * as _ from "lodash";
import { UpsertTaxRequest } from "../usecases/tax_usecase";
import { getParamSearch } from "@/shared/utils/get-param-search";



export class TaxManagementRepository {

    static CreateTax = async<T>(
        props: {
            body: UpsertTaxRequest,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.TaxModule, 'createTax')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/tax/createTax`,
                method: 'post',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }


    static FindTax = async<T>(request: {
        params?: Record<string, any>
    } & UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const { params, search, p, l } = request
            let paramQuery = await getParamSearch({additionalParam: params, search, page: p, limit: l})

            try {
                const findRole = await findRoleModule(ModuleEnum.TaxModule, 'findTax')
                const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

                const config = { url: `/tax/findTax${paramQuery}`, method: "get",  };
                return await apiClient(config);
            } catch (err: any) {
                throw err
            }
        } catch (err: any) {
            throw err

        }
    }



    static FindTaxById = async <T>(
        request: {
            id: string
        } & UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            id,
        } = request

        try {
            if (!id) {
                throw new Error('please provide id data')
            }
            const findRole = await findRoleModule(ModuleEnum.TaxModule, 'findtax')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/tax/findtax/${id}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }



    static RemoveTax = async<T>(
        props: {
            id: string,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.TaxModule, 'removeTax')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/tax/removeTax/${props.id}`,
                method: 'delete',
                
            })
        } catch (error) {
            throw error
        }
    }



    static UpdateTax = async<T>(
        props: {
            id: string,
            body: UpsertTaxRequest,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.TaxModule, 'updateTax')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/tax/updateTax/${props.id}`,
                method: 'patch',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

}


