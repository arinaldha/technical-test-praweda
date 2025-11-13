import { BranchApprovalRequest, BranchBankMappingRequest } from "@/models/request/master/branch_request";
import { SingleResponse } from "@/models/response/basic_response";
import { UseCaseRepositoryRequest } from "@/models/utils/request";
import { UnionRepository } from "@/modules/union/repositories/uni_repository";
import { apiClient } from "@/shared/helpers/api_client";
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role";
import { getParamSearch } from "@/shared/utils/get-param-search";
import { Dispatch } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import * as _ from "lodash";

export interface UpsertChargeGroupRequest {
    id?: string;
    company_id: string;
    charge_group_code: string | null;
    charge_group_name: string;
}

export interface UpsertChargeCategoryRequest {
    id?: string;
    charge_group_id: string | null
    charge_category_code: string | null;
    charge_category_name: string | null
    coda_service_code?: string | null;
    product_service_flag: Nullable<"P" | "S">
}

export interface UpsertUnitRequest {
    id?: string;
    unit_code: string
    unit_name: string
    product_service_flag: "P" | "S"
}

export class ChargeManagementRepository {

    static CreateChargeGroup = async<T>(
        props: {
            body: UpsertChargeGroupRequest,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.ChargeGroupModule, 'createChargeGroup')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/charge/createChargeGroup`,
                method: 'post',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

    static CreateChargeCategory = async<T>(
        props: {
            body: UpsertChargeCategoryRequest,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.ChargeGroupModule, 'createChargeCategory')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/charge/createChargeCategory`,
                method: 'post',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

    static FindChargeGroup = async<T>(request: {
        params?: Record<string, any>
    } & UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const { params, search, p, l } = request
            let paramQuery = await getParamSearch({ additionalParam: params, search, page: p, limit: l })

            try {
                const findRole = await findRoleModule(ModuleEnum.ChargeGroupModule, 'findChargeGroup')
                const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

                const config = { url: `/charge/findChargeGroup${paramQuery}`, method: "get",  };
                return await apiClient(config);
            } catch (err: any) {
                throw err
            }
        } catch (err: any) {
            throw err

        }
    }

    static FindChargeCategory = async<T>(request: {
        params?: Record<string, any>
    } & UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const { params, search, p, l } = request
            let paramQuery = await getParamSearch({ additionalParam: params, search, page: p, limit: l })

            try {
                const findRole = await findRoleModule(ModuleEnum.ChargeCategoryModule, 'findChargeCategory')
                const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

                const config = { url: `/charge/findChargeCategory${paramQuery}`, method: "get",  };
                return await apiClient(config);
            } catch (err: any) {
                throw err
            }
        } catch (err: any) {
            throw err

        }
    }

    static FindChargeGroupById = async <T>(
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
            const findRole = await findRoleModule(ModuleEnum.ChargeGroupModule, 'findChargeGroup')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/charge/findChargeGroup/${id}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindChargeCategoryById = async <T>(
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
            const findRole = await findRoleModule(ModuleEnum.ChargeCategoryModule, 'findChargeCategory')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/charge/findChargeCategory/${id}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static RemoveChargeGroup = async<T>(
        props: {
            id: string,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.ChargeGroupModule, 'removeChargeGroup')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/charge/removeChargeGroup/${props.id}`,
                method: 'delete',
                
            })
        } catch (error) {
            throw error
        }
    }

    static RemoveChargeCategory = async<T>(
        props: {
            id: string,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.ChargeCategoryModule, 'removeChargeCategory')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/charge/removeChargeCategory/${props.id}`,
                method: 'delete',
                
            })
        } catch (error) {
            throw error
        }
    }

    static UpdateChargeGroup = async<T>(
        props: {
            id: string,
            body: UpsertChargeGroupRequest,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.ChargeGroupModule, 'updateChargeGroup')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/charge/updateChargeGroup/${props.id}`,
                method: 'patch',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

    static UpdateChargeCategory = async<T>(
        props: {
            id: string,
            body: UpsertChargeCategoryRequest,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.ChargeCategoryModule, 'updateChargeCategory')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/charge/updateChargeCategory/${props.id}`,
                method: 'patch',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

    static CreateUnit = async<T>(
        props: {
            body: UpsertUnitRequest,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.UnitModule, 'createUnit')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/unit/createUnit`,
                method: 'post',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

    static UpdateUnit = async<T>(
        props: {
            id: string,
            body: UpsertChargeGroupRequest,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.UnitModule, 'updateUnit')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/unit/updateUnit/${props.id}`,
                method: 'patch',
                body: props.body
            })
        } catch (error) {
            throw error
        }
    }

    static FindUnitById = async <T>(
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
            const findRole = await findRoleModule(ModuleEnum.UnitModule, 'findUnit')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/unit/findUnit/${id}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static RemoveUnit = async<T>(
        props: {
            id: string,
            moduleName: string
        }
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.UnitModule, 'removeUnit')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            return await apiClient({
                url: `/unit/removeUnit/${props.id}`,
                method: 'delete',
                
            })
        } catch (error) {
            throw error
        }
    }

    static FindUnit = async<T>(request: {
        params?: Record<string, any>
    } & UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const { params, search, p, l } = request
            let paramQuery = await getParamSearch({ additionalParam: params, search, page: p, limit: l })

            try {
                const findRole = await findRoleModule(ModuleEnum.UnitModule, 'findUnit')
                const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

                const config = { url: `/unit/findUnit${paramQuery}`, method: "get",  };
                return await apiClient(config);
            } catch (err: any) {
                throw err
            }
        } catch (err: any) {
            throw err

        }
    }


}