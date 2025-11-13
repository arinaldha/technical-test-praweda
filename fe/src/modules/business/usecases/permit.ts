import { Dispatch } from "@reduxjs/toolkit"
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role"
import { EntitiyUpsertRequest, PermitUpsertRequest } from "@/models/business/request/request"
import { EntitiyUpsertResponse, PermitResponse } from "@/models/business/responses/response"
import { UnionRepository } from "@/modules/union/repositories/uni_repository"
import { PermitUpsertResponse } from "@/models/business/responses/response"
import { BussinessPermitRepository } from "../repository/permit"
import { setPermitDetail, setPermitList } from "../slices/bussiness_slice"


export class PermitUseCase {

    static CreatePermit = async (
        request: PermitUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<PermitUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<PermitUpsertResponse>({ body: request, moduleName: ModuleEnum.BusinessPermitModule, pathApi: 'createBusinessPermit' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static FindPermit = async (
        search: string,
        p: number, l: number,
        dispatch: Dispatch<any>
    ): Promise<PermitResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await BussinessPermitRepository.FindPermit({ search, p, l, moduleName: ModuleEnum.BusinessPermitModule });
            dispatch(setPermitList(data.data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setContentLoading(false));
            throw err;
        }
    }

    static FindPermitById = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<PermitResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await BussinessPermitRepository.FindPermitById({ moduleName: ModuleEnum.BusinessPermitModule, id: id })
            dispatch(setPermitDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)

            dispatch(setContentLoading(false))
            throw err
        }
    }


    static UpdatePermit = async (
        id: string,
        request: EntitiyUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<EntitiyUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<EntitiyUpsertResponse>({ id, moduleName: ModuleEnum.BusinessPermitModule, body: request, pathApi: 'updateBusinessPermit' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static DeletePermit = async (
        id: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: id, moduleName: ModuleEnum.BusinessPermitModule, pathApi: "removeBusinessPermit" })
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

