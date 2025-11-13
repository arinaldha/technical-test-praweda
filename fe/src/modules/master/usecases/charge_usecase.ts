import { FindDataRequest } from "@/models/request/basic_request"
import { setBtnLoading, setContentLoading, setPagePagination } from "@/redux/basic_slice"
import { Dispatch } from "react"
import { BranchRepository } from "../repositories/branch_repository"
import { ModuleEnum } from "@/shared/roles/role"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"

import { setBranchApproval, setBranchApprovalList } from "../slices/branch_slice"
import { SingleResponse } from "@/models/response/basic_response"
import { BranchApprovalRequest, BranchBankMappingRequest } from "@/models/request/master/branch_request"
import { ChargeManagementRepository, UpsertChargeCategoryRequest, UpsertChargeGroupRequest, UpsertUnitRequest } from "../repositories/charge_repository"
import { ChargeCategoryResponse, ChargeGroupResponse, UnitResponse, setChargeCategoryDetail, setChargeCategoryList, setChargeGroupDetail, setChargeGroupList, setUnitDetail, setUnitList } from "../slices/charge_slice"
import { UnionRepository } from "@/modules/union/repositories/uni_repository"

export class ChargeUseCase {

    static CreateChargeGroup = async (
        params: {
            body: any
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await ChargeManagementRepository.CreateChargeGroup({ body: params.body, moduleName: ModuleEnum.ChargeGroupModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static CreateChargeCategories = async (
        params: {
            body: any
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await ChargeManagementRepository.CreateChargeCategory({ body: params.body, moduleName: ModuleEnum.ChargeCategoryModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static GetChargeGroup = async (request: {
        params?: Record<string, any>
    } & FindDataRequest, dispatch: Dispatch<any>): Promise<ChargeGroupResponse[]> => {
        dispatch(setContentLoading(true))
        try {
            const {
                search,
                page,
                limit,
                params
            } = request
            const { data } = await ChargeManagementRepository.FindChargeGroup<ChargeGroupResponse[]>({ params: params, search, p: page, l: limit, moduleName: ModuleEnum.ChargeGroupModule })
            dispatch(setChargeGroupList(data.data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (error: any) {
            showErrorNotification(error.message)
            throw error
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static GetChargeCategory = async (request: {
        params?: Record<string, any>
    } & FindDataRequest, dispatch: Dispatch<any>): Promise<ChargeCategoryResponse[]> => {
        dispatch(setContentLoading(true))
        try {
            const {
                search,
                page,
                limit,
                params
            } = request
            const { data } = await UnionRepository.UniversalFindData<ChargeCategoryResponse[]>({ search, p: page, l: limit, moduleName: ModuleEnum.ChargeCategoryModule, pathApi: "findChargeCategory" })
            dispatch(setChargeCategoryList(data.data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (error: any) {
            showErrorNotification(error.message)
            throw error
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static GetChargeGroupById = async (
        params: {
            id: string,
        },
        dispatch: Dispatch<any>
    ): Promise<ChargeGroupResponse> => {
        try {
            const {
                id,
            } = params

            const { data } = await ChargeManagementRepository.FindChargeGroupById<ChargeGroupResponse>({ id, moduleName: ModuleEnum.ChargeGroupModule })
            dispatch(setContentLoading(false))
            dispatch(setChargeGroupDetail(data.data))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static UpdateChargeGroup = async (
        id: string,
        request: UpsertChargeGroupRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertChargeGroupRequest> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertChargeGroupRequest>({ id, moduleName: ModuleEnum.ChargeGroupModule, body: request, pathApi: 'updateChargeGroup' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message ?? err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static UpdateChargeCategory = async (
        id: string,
        request: UpsertChargeCategoryRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertChargeCategoryRequest> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertChargeCategoryRequest>({ id, moduleName: ModuleEnum.ChargeCategoryModule, body: request, pathApi: 'updateChargeCategory' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message ?? err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static GetChargeCategoryById = async (
        params: {
            id: string,
        },
        dispatch: Dispatch<any>
    ): Promise<ChargeCategoryResponse> => {
        try {
            const {
                id,

            } = params

            const { data } = await ChargeManagementRepository.FindChargeCategoryById<ChargeCategoryResponse>({ id, moduleName: ModuleEnum.ChargeCategoryModule })

            // dispatch(setBranchApproval(data.data[0]))
            dispatch(setContentLoading(false))
            dispatch(setChargeCategoryDetail(data.data))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static RemoveChargeGroupId = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await ChargeManagementRepository.RemoveChargeGroup({ id: params.id, moduleName: ModuleEnum.ChargeGroupModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static RemoveChargeCategoriesId = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await ChargeManagementRepository.RemoveChargeCategory({ id: params.id, moduleName: ModuleEnum.ChargeCategoryModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static CreateUnit = async (
        params: {
            body: any
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await ChargeManagementRepository.CreateUnit({ body: params.body, moduleName: ModuleEnum.ChargeGroupModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static UpdateUnit = async (
        id: string,
        request: UpsertUnitRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertUnitRequest> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertUnitRequest>({ id, moduleName: ModuleEnum.UnitModule, body: request, pathApi: 'updateUnit' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static GetUnit = async (request: {
        params?: Record<string, any>
    } & FindDataRequest, dispatch: Dispatch<any>): Promise<UnitResponse[]> => {
        dispatch(setContentLoading(true))
        try {
            const {
                search,
                page,
                limit,
                params
            } = request
            const { data } = await ChargeManagementRepository.FindUnit<UnitResponse[]>({ params: params, search, p: page, l: limit, moduleName: ModuleEnum.ChargeGroupModule })
            dispatch(setUnitList(data.data))
            return data.data
        } catch (error: any) {
            showErrorNotification(error.message)
            throw error
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static GetUnitById = async (
        params: {
            id: string,
        },
        dispatch: Dispatch<any>
    ): Promise<UnitResponse> => {
        try {
            const {
                id,
            } = params

            const { data } = await ChargeManagementRepository.FindUnitById<UnitResponse>({ id, moduleName: ModuleEnum.UnitModule })
            dispatch(setContentLoading(false))
            dispatch(setUnitDetail(data.data))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static RemoveUnitId = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await ChargeManagementRepository.RemoveUnit({ id: params.id, moduleName: ModuleEnum.UnitModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }




}