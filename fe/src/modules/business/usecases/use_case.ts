import { Dispatch } from "@reduxjs/toolkit"
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role"
import { EntitiyUpsertRequest, PermitUpsertRequest } from "@/models/business/request/request"
import { EntitiyUpsertResponse, EntityResponse } from "@/models/business/responses/response"
import { UnionRepository } from "@/modules/union/repositories/uni_repository"
import { PermitUpsertResponse } from "@/models/business/responses/response"
import { BussinessEntryRepository } from "../repository/repository"
import { setBussinessDetail, setBussinessList } from "../slices/bussiness_slice"

export class BussinessUseCase {
    static FindEntity = async (
        dispatch: Dispatch<any>,
        search?: string,
        p?: number, l?: number,
    ): Promise<EntityResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await BussinessEntryRepository.FindEntity({ search, p, l, moduleName: ModuleEnum.BusinessEntityModule });
            dispatch(setBussinessList(data.data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            dispatch(setContentLoading(false));
            throw err;
        }
    }

    static FindEntityById = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<EntityResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await BussinessEntryRepository.FindEntityById({ moduleName: ModuleEnum.BusinessEntityModule, id })
            dispatch(setBussinessDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            dispatch(setContentLoading(false))
            throw err
        }
    }

    static CreateEntity = async (
        request: EntitiyUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<EntitiyUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<EntitiyUpsertResponse>({ body: request, moduleName: ModuleEnum.BusinessEntityModule, pathApi: 'createBusinessEntry' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }


    static UpdateEntity = async (
        id: string,
        request: EntitiyUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<EntitiyUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<EntitiyUpsertResponse>({ id, moduleName: ModuleEnum.BusinessEntityModule, body: request, pathApi: 'updateBusinessEntry' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static DeleteEntity = async (
        id: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await BussinessEntryRepository.DeleteEntity({ id: id, moduleName: ModuleEnum.BusinessEntityModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }
}