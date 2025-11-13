import { setBtnLoading, setContentLoading } from "@/redux/basic_slice"
import { showErrorNotification } from "@/shared/helpers/notification"
import { Dispatch } from "@reduxjs/toolkit"
import { WorkflowRepository } from "../repositories/workflow.repositry"
import { WorkflowApprovalResponse } from "@/models/workflow/response/response"
import { ApproveOrRejectDto, ApproveOrRejectDtoUAMC, FindWorkflowApprovalDto, ReminderWorkflowDto } from "@/models/workflow/request/request"

export class WorkflowUseCases {
    static findWorkflowApproval = async (
        params: FindWorkflowApprovalDto,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await WorkflowRepository.findWorkflow<WorkflowApprovalResponse>({ ...params })
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }

    }

    static approveOrReject = async (
        params: ApproveOrRejectDto,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await WorkflowRepository.approveOrReject({ ...params })
            dispatch(setBtnLoading(true))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static approveOrRejectUAMC = async (
        params: ApproveOrRejectDtoUAMC,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await WorkflowRepository.approveOrReject({ ...params })
            dispatch(setBtnLoading(true))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static handleReminder = async (
        params: ReminderWorkflowDto,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await WorkflowRepository.remindUser({ ...params })
            dispatch(setBtnLoading(true))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err

        } finally {
            dispatch(setBtnLoading(false))
        }
    }

}