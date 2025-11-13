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
import { CurrencyRepository, CurrencyResponse } from "../repositories/currency-repository"
import { setCurrencyDetail, setCurrencyList, setExchangeRateDetail, setExchangeRateList } from "../slices/currency"
import { AnyObject } from "antd/es/_util/type"




export interface CurrencyUpsertRequest {
    id: Nullable<string>;
    company_id: string;
    currency_code: string;
    currency_name: string;
    is_base_currency: 0 | 1
    is_active: 0 | 1
}


export interface ExchangeRateUpsertRequest {
    id?: string
    currency_id: string
    effective_start_date: string
    effective_end_date: string
    commercial_rate: number
    tax_rate: number
}

export class CurrencyUseCase {

    static createCurrency = async (
        request: CurrencyUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<CurrencyUpsertRequest> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<CurrencyUpsertRequest>({ body: request, moduleName: ModuleEnum.CurrencyModule, pathApi: 'createCurrency' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (error : any) {
            showErrorNotification(error.message)
            dispatch(setBtnLoading(false))
            throw error
        }
    }
    static createExchangeRate = async (
        request: ExchangeRateUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<ExchangeRateUpsertRequest> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<ExchangeRateUpsertRequest>({ body: request, moduleName: ModuleEnum.CurrencyModule, pathApi: 'createExchangeRate' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (error : any) {
            showErrorNotification(error.message)
            dispatch(setBtnLoading(false))
            throw error
        }
    }

    static FindCurrency = async (
        search: string,
        p: number, l: number,
        dispatch: Dispatch<any>,
        is_active?: Nullable<1 | 0>,
    ) => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await UnionRepository.UniversalFindData({ search, p, l, moduleName: ModuleEnum.CurrencyModule, pathApi: "findCurrency", is_active });
            dispatch(setCurrencyList(data.data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data
        } catch (error : any) {
            showErrorNotification(error.message)
            dispatch(setContentLoading(false));
            throw error;
        }
    }

    static FindExchangeRate = async (
        search: string,
        p: number, l: number,
        dispatch: Dispatch<any>, currency_id: string
    ): Promise<CurrencyResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await CurrencyRepository.FindExchangeRate({ search, p, l, moduleName: ModuleEnum.CurrencyModule, currency_id });
            dispatch(setExchangeRateList(data.data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data
        } catch (error : any) {
            showErrorNotification(error.message)
            dispatch(setContentLoading(false));
            throw error;
        }
    }

    static FindCurrencyId = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<CurrencyResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await CurrencyRepository.FindCurrencyId({ moduleName: ModuleEnum.CurrencyModule, id: id })
            dispatch(setCurrencyDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (error : any) {
            showErrorNotification(error.message)

            dispatch(setContentLoading(false))
            throw error
        }
    }

    static FindExchangeRateId = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<AnyObject> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await CurrencyRepository.FindExchangeRateId({ moduleName: ModuleEnum.CurrencyModule, id: id })
            dispatch(setExchangeRateDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (error : any) {
            showErrorNotification(error.message)

            dispatch(setContentLoading(false))
            throw error
        }
    }


    static UpdateCurrencyId = async (
        id: string,
        request: CurrencyUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<CurrencyUpsertRequest> => {
        dispatch(setBtnLoading(true))
        try {

            const { data } = await UnionRepository.UniversalUpdate<CurrencyUpsertRequest>({ id: id, moduleName: ModuleEnum.CurrencyModule, body: request, pathApi: 'updateCurrency' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (error : any) {
            showErrorNotification(error.message)
            dispatch(setBtnLoading(false))
            throw error
        }
    }

    static UpdateExchangeRate = async (
        id: string,
        request: ExchangeRateUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<ExchangeRateUpsertRequest> => {
        dispatch(setBtnLoading(true))
        try {

            const { data } = await UnionRepository.UniversalUpdate<ExchangeRateUpsertRequest>({ id: id, moduleName: ModuleEnum.CurrencyModule, body: request, pathApi: 'updateExchangeRate' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (error : any) {
            showErrorNotification(error.message)
            dispatch(setBtnLoading(false))
            throw error
        }
    }

    static DeleteCurrencyId = async (
        id: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: id, moduleName: ModuleEnum.CurrencyModule, pathApi: "removeCurrency" })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (error : any) {
            showErrorNotification(error.message)
            dispatch(setBtnLoading(false))
            throw error
        }
    }

    static DeleteExchangeRate = async (
        id: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: id, moduleName: ModuleEnum.CurrencyModule, pathApi: "removeExchangeRate" })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (error : any) {
            showErrorNotification(error.message)
            dispatch(setBtnLoading(false))
            throw error
        }
    }
}

