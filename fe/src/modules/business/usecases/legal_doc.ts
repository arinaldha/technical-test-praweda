import { Dispatch } from "@reduxjs/toolkit"
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role"
import { EntitiyUpsertRequest, PermitUpsertRequest } from "@/models/business/request/request"
import { LegalDocumentResponse, LegalDocumentUpsertResponse } from "@/models/business/responses/response"
import { UnionRepository } from "@/modules/union/repositories/uni_repository"
import { SetLegalDocDetail, setBussinessDetail, setBussinessList, setLegalDocumentList } from "../slices/bussiness_slice"
import { LegalDocumentRepository } from "../repository/legal_doc"

export class LegalDocumentUseCase {

    static FindDocument = async (
        dispatch: Dispatch<any>,
        search?: string,
        p?: number, l?: number,
    ): Promise<LegalDocumentResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await LegalDocumentRepository.FindLegalDocument({ search, p, l, moduleName: ModuleEnum.LegalDocumentModule });
            dispatch(setLegalDocumentList(data.data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            dispatch(setContentLoading(false));
            throw err;
        }
    }

    static FindDocumentById = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<LegalDocumentResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await LegalDocumentRepository.FindLegalDocumentById({ moduleName: ModuleEnum.LegalDocumentModule, id })
            dispatch(SetLegalDocDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            dispatch(setContentLoading(false))
            throw err
        }
    }

    static CreateLegalDocument = async (
        request: EntitiyUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<LegalDocumentUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<LegalDocumentUpsertResponse>({ body: request, moduleName: ModuleEnum.LegalDocumentModule, pathApi: 'createLegalDocument' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }
    static UpdateLegalDocument = async (
        id: string,
        request: EntitiyUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<LegalDocumentUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<LegalDocumentUpsertResponse>({ id, moduleName: ModuleEnum.LegalDocumentModule, body: request, pathApi: 'updateLegalDocument' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static DeleteLegalDocument = async (
        id: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await LegalDocumentRepository.DeleteLegalDocument({ id: id, moduleName: ModuleEnum.LegalDocumentModule })
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