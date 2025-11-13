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
import { AnyObject } from "antd/es/_util/type"


export interface UpsertTaxRequest {
    id?: string
    company_id: string
    tax_flag: string
    tax_code: string
    tax_name: string
    rate: number
    ie_flag: string
    tax_factor: number
    coa_tax_input: string
    coa_tax_output: string
    tax_base_factor: number
}


export class TaxUseCase {

    static CreateTax = async (
        params: {
            body: UpsertTaxRequest
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await TaxManagementRepository.CreateTax({ body: params.body, moduleName: ModuleEnum.TaxModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static UpdateTax = async (
        params: {
            id: string;
            body: UpsertTaxRequest
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await TaxManagementRepository.UpdateTax({ id: params.id, body: params.body, moduleName: ModuleEnum.TaxModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static FindTax = async (request: UseCaseUniversalRequest & FindDataRequest, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {

            const { data } = await UnionRepository.UniversalFindData(request)
            dispatch(setTaxList(data.data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (error: any) {
            showErrorNotification(error.message)
            throw error
        } finally {
            dispatch(setContentLoading(false))
        }
    }


    static FinTaxById = async (
        params: {
            id: string,
        },
        dispatch: Dispatch<any>
    ): Promise<AnyObject> => {
        try {
            const {
                id,
            } = params

            const { data } = await TaxManagementRepository.FindTaxById<AnyObject>({ id, moduleName: ModuleEnum.TaxModule })

            // dispatch(setBranchApproval(data.data[0]))
            dispatch(setTaxDetail(data.data))
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err && typeof err === "object" ? err.message : err)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }



    static RemoveTaxId = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await TaxManagementRepository.RemoveTax({ id: params.id, moduleName: ModuleEnum.TaxModule })
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