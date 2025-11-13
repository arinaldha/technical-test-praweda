import { FindDataRequest } from "@/models/request/basic_request"
import { setBtnLoading, setContentLoading, setPagePagination } from "@/redux/basic_slice"
import { Dispatch } from "react"
import { BranchRepository } from "../repositories/branch_repository"
import { ModuleEnum } from "@/shared/roles/role"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { BankMappingResponse, BranchApprovalResponse } from "@/models/response/master/branch_response"
import { setBankMappingList, setBranchApproval, setBranchApprovalList } from "../slices/branch_slice"
import { SingleResponse } from "@/models/response/basic_response"
import { BranchApprovalRequest, BranchBankMappingRequest } from "@/models/request/master/branch_request"

export class BranchUseCase {

    static CreateBankMapping = async (
        params: {
            body: any
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await BranchRepository.CreateBankMapping({ body: params.body, moduleName: ModuleEnum.BankModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static GetBranchBankMapping = async (request: {
        params?: Record<string, any>
    } & FindDataRequest, dispatch: Dispatch<any>): Promise<BankMappingResponse[]> => {
        dispatch(setContentLoading(true))
        try {
            const {
                search,
                page,
                limit,
                params
            } = request
            const { data } = await BranchRepository.FindBranchBankMapping<BankMappingResponse[]>({ params: params, search, p: page, l: limit, moduleName: ModuleEnum.BankModule })
            setPagePagination(data.meta)
            setBankMappingList(data.data)
            return data.data
        } catch (error: any) {
            showErrorNotification(error.message)
            throw error
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static GetBranchBankMappingById = async (
        params: {
            id: string,
            branchId: string
        },
        dispatch: Dispatch<any>
    ): Promise<BranchApprovalResponse> => {
        try {
            const {
                id,
                branchId
            } = params

            const { data } = await BranchRepository.FindBranchBankMappingById<BranchApprovalResponse[]>({ id, branchId, moduleName: ModuleEnum.BranchModule })

            // dispatch(setBranchApproval(data.data[0]))
            dispatch(setContentLoading(false))
            return data.data[0]
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static RemoveBankMappingId = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await BranchRepository.RemoveBankMapping({ id: params.id, moduleName: ModuleEnum.BankModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static GetBranchApproval = async (
        request: {
            params?: Record<string, any>
        } & FindDataRequest,
        dispatch: Dispatch<any>
    ): Promise<BranchApprovalResponse[]> => {
        dispatch(setContentLoading(true))
        const {
            search,
            page,
            limit,
            params
        } = request
        try {
            const { data } = await BranchRepository.FindBranchApproval<BranchApprovalResponse[]>({ params: params, search, p: page, l: limit, moduleName: ModuleEnum.BranchModule })

            // dispatch(setBranchApprovalList(data.data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static GetBranchApprovalById = async (
        params: {
            id: string,
            branchId: string
        },
        dispatch: Dispatch<any>
    ): Promise<BranchApprovalResponse> => {
        try {
            const {
                id,
                branchId
            } = params

            const { data } = await BranchRepository.FindBranchApprovalById<BranchApprovalResponse[]>({ id, branchId, moduleName: ModuleEnum.BranchModule })

            // dispatch(setBranchApproval(data.data[0]))
            dispatch(setContentLoading(false))
            return data.data[0]
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static CreateBranchApproval = async (
        params: {
            body: BranchApprovalRequest
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await BranchRepository.CreateBranchApproval({ body: params.body, moduleName: ModuleEnum.BranchModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static UpdateBranchApproval = async (
        params: {
            id: string,
            body: BranchApprovalRequest
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await BranchRepository.UpdateBranchApproval({ id: params.id, body: params.body, moduleName: ModuleEnum.BranchModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static RemoveBranchApproval = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await BranchRepository.RemoveBranchApproval({ id: params.id, moduleName: ModuleEnum.BranchModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }


}