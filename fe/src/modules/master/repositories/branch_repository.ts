import { BranchApprovalRequest, BranchBankMappingRequest } from "@/models/request/master/branch_request";
import { SingleResponse } from "@/models/response/basic_response";
import { UseCaseRepositoryRequest } from "@/models/utils/request";
import { apiClient } from "@/shared/helpers/api_client";
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role";
import { AxiosResponse } from "axios";
import * as _ from "lodash";

export class BranchRepository {

    static CreateBankMapping = async<T>(
        props: {
            body: BranchBankMappingRequest
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.BankModule, 'setBankMapping')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/bank/setBankMapping`,
                method: 'post',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

    static FindBranchBankMapping = async<T>(request: {
        params?: Record<string, any>
    } & UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const { params } = request
            let paramQuery = ''
            if (params) {
                Object.entries(params).forEach(([key, value], index) => {
                    if (Object.entries(params).length === 1) {
                        if (!_.isEmpty(value)) {
                            paramQuery += `?${key}=${value}`
                        }
                    } else {
                        if (!_.isEmpty(value)) {
                            if (index === 0) {
                                paramQuery += `?${key}=${value}`
                            } else {
                                paramQuery += `&${key}=${value}`
                            }
                        }
                    }
                })
            }

            try {
                const findRole = await findRoleModule(ModuleEnum.BankModule, 'findBankMapping')
                const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

                const config = { url: `/bank/findBankMapping${paramQuery}`, method: "get",  };
                return await apiClient(config);
            } catch (err: any) {
                throw err
            }
        } catch (err: any) {
            throw err

        }
    }


    static FindBranchBankMappingById = async <T>(
        request: {
            id: string
            branchId: string
        } & UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            id,
            branchId
        } = request

        try {
            if (!id) {
                throw new Error('please provide id data')
            }
            const findRole = await findRoleModule(ModuleEnum.BankModule, 'findBankMapping')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/bank/findBankMapping?item_id=${id}&branch_id=${branchId}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static RemoveBankMapping = async<T>(
        props: {
            id: string,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.BankModule, 'removeBankMapping')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/bank/removeBankMapping/${props.id}`,
                method: 'delete',
                
            })
        } catch (error) {
            throw error
        }
    }
    static FindBranchApproval = async <T>(
        request: {
            params?: Record<string, any>
        } & UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            params
        } = request

        let paramQuery = ''

        if (params) {
            Object.entries(params).forEach(([key, value], index) => {
                if (Object.entries(params).length === 1) {
                    if (!_.isEmpty(value)) {
                        paramQuery += `?${key}=${value}`
                    }
                } else {
                    if (!_.isEmpty(value)) {
                        if (index === 0) {
                            paramQuery += `?${key}=${value}`
                        } else {
                            paramQuery += `&${key}=${value}`
                        }
                    }
                }
            })
        }

        try {
            const findRole = await findRoleModule(ModuleEnum.BranchModule, 'findBranchApproval')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/approval/findBranchApproval${paramQuery}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindBranchApprovalById = async <T>(
        request: {
            id: string
            branchId: string
        } & UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            id,
            branchId
        } = request

        try {
            if (!id) {
                throw new Error('please provide id data')
            }

            const findRole = await findRoleModule(ModuleEnum.BranchModule, 'findBranchApproval')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/approval/findBranchApproval?item_id=${id}&branch_id=${branchId}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static CreateBranchApproval = async<T>(
        props: {
            body: BranchApprovalRequest
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.BranchModule, 'createBranchApproval')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/approval/createBranchApproval`,
                method: 'post',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

    static UpdateBranchApproval = async<T>(
        props: {
            id: string,
            body: BranchApprovalRequest,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.BranchModule, 'updateBranchApproval')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/approval/updateBranchApproval/${props.id}`,
                method: 'patch',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

    static RemoveBranchApproval = async<T>(
        props: {
            id: string,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.BranchModule, 'removeBranchApproval')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/approval/removeBranchApproval/${props.id}`,
                method: 'delete',
                
            })
        } catch (error) {
            throw error
        }
    }
}