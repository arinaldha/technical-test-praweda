import { Dispatch } from "@reduxjs/toolkit"
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role"
import { EntitiyUpsertRequest, PermitUpsertRequest } from "@/models/business/request/request"
import { EntitiyUpsertResponse, JobTitleResponse } from "@/models/business/responses/response"
import { UnionRepository } from "@/modules/union/repositories/uni_repository"
import { SetJobTitleList, setBussinessDetail, setBussinessList, setJobTitleDetail } from "../slices/bussiness_slice"
import { JobTitleRepository } from "../repository/job_title"

export class JobTitleUseCase {

    static FindJobTitle = async (
        dispatch: Dispatch<any>,
        search?: string,
        p?: number, l?: number,
    ): Promise<JobTitleResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await JobTitleRepository.FindJobTitle({ search, p, l, moduleName: ModuleEnum.JobTitleModule });
            dispatch(SetJobTitleList(data.data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {
            dispatch(setContentLoading(false));
            throw err;
        } finally{
            dispatch(setContentLoading(false));

        }
    }

    static FindJobTitleById = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<JobTitleResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await JobTitleRepository.FindJobTitleById({ moduleName: ModuleEnum.JobTitleModule, id })
            dispatch(setJobTitleDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            dispatch(setContentLoading(false))
            throw err
        }
    }

    static CreateJobTitle = async (
        request: EntitiyUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<EntitiyUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<EntitiyUpsertResponse>({ body: request, moduleName: ModuleEnum.JobTitleModule, pathApi: 'createJobTitle' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message ?? err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }


    static UpdateJobTitle = async (
        id: string,
        request: EntitiyUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<JobTitleResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await JobTitleRepository.UpdateJobTitle<JobTitleResponse>({ id : id, moduleName: ModuleEnum.JobTitleModule, body: request })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message ?? err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static DeleteJobTitle = async (
        id: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await JobTitleRepository.DeleteJobTitle({ id: id, moduleName: ModuleEnum.JobTitleModule })
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