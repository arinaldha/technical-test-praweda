import { FindDataRequest } from "@/models/request/basic_request"
import { setBtnLoading, setContentLoading, setPagePagination } from "@/redux/basic_slice"
import { Dispatch } from "react"
import { BranchRepository } from "../repositories/branch_repository"
import { ModuleEnum } from "@/shared/roles/role"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { BankMappingResponse, BranchApprovalResponse } from "@/models/response/master/branch_response"
import { TaxManagementRepository } from "../repositories/tax_repository"
import { setTaxDetail, setTaxList } from "../slices/tax_slice"
import { UnionRepository } from "@/modules/union/repositories/uni_repository"
import { UseCaseUniversalRequest } from "@/models/utils/request"
import { setPeriodDetail, setPeriodDetailId, setPeriodDetailList, setPeriodList } from "../slices/period_maintenance_slice"
import { AnyObject } from "antd/es/_util/type"




export interface UpsertPeriodMaintenance {
    id?: string;
    company_id: string
    yr_code: number
    yr_description: Nullable<string>
    yr_start_date: string
    yr_end_date: string
}


export class PeriodMaintenanceUseCase {
    static CreatePeriodDetail = async (
        params: {
            body: AnyObject
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate({ body: params.body, moduleName: ModuleEnum.PeriodMaintenanceModule, pathApi: "createPeriodMaintenanceDetail" })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static UpdatePeriodDetail = async (
        params: {
            id: string;
            body: AnyObject
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate({ id: params.id, body: params.body, moduleName: ModuleEnum.PeriodMaintenanceModule, pathApi: "updatePeriodMaintenanceDetail" })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }


    static FindPeriodDetailList = async (request: UseCaseUniversalRequest & FindDataRequest, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {

            const { data } = await UnionRepository.UniversalFindData<AnyObject[]>(request)
            dispatch(setPeriodDetailList(data.data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (error: any) {
            showErrorNotification(error.message)
            throw error
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static FindPeriodDetailId = async (request: UseCaseUniversalRequest & FindDataRequest, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {

            const { data } = await UnionRepository.UniversalFindDataId<AnyObject>(request)
            dispatch(setPeriodDetailId(data.data))
            return data.data
        } catch (error: any) {
            showErrorNotification(error.message)
            throw error
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static RemovePeriodDetailId = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: params.id, moduleName: ModuleEnum.PeriodMaintenanceModule, pathApi: "removePeriodMaintenanceDetail" })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static CreatePeriodMaintenance = async (
        params: {
            body: UpsertPeriodMaintenance
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate({ body: params.body, moduleName: ModuleEnum.PeriodMaintenanceModule, pathApi: "createPeriodMaintenance" })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static UpdateMaintenance = async (
        params: {
            id: string;
            body: UpsertPeriodMaintenance
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate({ id: params.id, body: params.body, moduleName: ModuleEnum.PeriodMaintenanceModule, pathApi: "updatePeriodMaintenance" })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static FindPeriodMaintenance = async (request: UseCaseUniversalRequest & FindDataRequest, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {

            const { data } = await UnionRepository.UniversalFindData<AnyObject[]>(request)
            dispatch(setPeriodList(data.data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (error: any) {
            showErrorNotification(error.message)
            throw error
        } finally {
            dispatch(setContentLoading(false))
        }
    }


    static FindPeriodMaintenanceId = async (
        params: {
            id: string,
        },
        dispatch: Dispatch<any>
    ): Promise<AnyObject> => {
        try {
            const {
                id,
            } = params

            const { data } = await UnionRepository.UniversalFindDataId<AnyObject>({ id, moduleName: ModuleEnum.PeriodMaintenanceModule, pathApi: "findPeriodMaintenance" })
            dispatch(setPeriodDetail(data.data))
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static RemovePeriodMaintenance = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: params.id, moduleName: ModuleEnum.PeriodMaintenanceModule, pathApi: "removePeriodMaintenance" })
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