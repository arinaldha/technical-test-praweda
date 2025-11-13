import { Dispatch } from "@reduxjs/toolkit"
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role"
import { EntitiyUpsertRequest, PermitUpsertRequest } from "@/models/business/request/request"
import { EntitiyUpsertResponse, PermitResponse } from "@/models/business/responses/response"
import { UnionRepository } from "@/modules/union/repositories/uni_repository"
import { PermitUpsertResponse } from "@/models/business/responses/response"
import { BankRepository, BankResponse } from "../repositories/bank-repository"
import { setBankDetail, setBankList } from "../slices/bank"
import { AnyObject } from "antd/es/_util/type"



export class BankUseCase {

    static createBank = async (
        request: AnyObject,
        dispatch: Dispatch<any>
    ): Promise<AnyObject> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<AnyObject>({ body: request, moduleName: ModuleEnum.BankModule, pathApi: 'createBank' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message ?? err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static FindBank = async (
        search: string,
        p: number, l: number,
        dispatch: Dispatch<any>
    ): Promise<BankResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await BankRepository.FindBank({ search, p, l, moduleName: ModuleEnum.BankModule });
            dispatch(setBankList(data.data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message ?? err.message)
            dispatch(setContentLoading(false));
            throw err;
        }
    }

    static FindBankId = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<BankResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await BankRepository.FindBankById({ moduleName: ModuleEnum.BankModule, id: id })
            dispatch(setBankDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)

            dispatch(setContentLoading(false))
            throw err
        }
    }


    static UpdateBankById = async (
        id: string,
        request: AnyObject,
        dispatch: Dispatch<any>
    ): Promise<AnyObject> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<AnyObject>({ id, moduleName: ModuleEnum.BankModule, body: request, pathApi: 'updateBank' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static DeleteBankId = async (
        id: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: id, moduleName: ModuleEnum.BankModule, pathApi: "removeBank" })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message ?? err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }
}

