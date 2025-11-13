import { SingleResponse } from "@/models/response/basic_response"
import { ApproveOrRejectDto, FindWorkflowApprovalDto, ReminderWorkflowDto } from "@/models/workflow/request/request"
import { apiClient } from "@/shared/helpers/api_client"
import { AxiosResponse } from "axios"

export class WorkflowRepository {
    static findWorkflow = async<T>(
        params: FindWorkflowApprovalDto
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            let baseUrl = `/approval/findWorkflowApproval?branchId=${params.branchId}&module=${params.module}&approvalAction=${params.approvalAction}&idData=${params.idData}`
            if (params.isApprovalUamc) {
                baseUrl += `&isApprovalUamc=${params.isApprovalUamc}`
            }
            return await apiClient({
                url: baseUrl,
                method: 'get',
                rule: null
            })
        } catch (error) {
            throw error
        }
    }

    static approveOrReject = async<T>(
        params: ApproveOrRejectDto
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            return await apiClient({
                url: `/approval/approveOrReject`,
                method: 'post',
                rule: null,
                body: params
            })
        } catch (error) {
            throw error
        }
    }

    static remindUser = async<T>(
        params: ReminderWorkflowDto
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            return await apiClient({
                url: `/approval/reminderApproval?module=${params.module}&action=${params.action}&isApprovalUamc=${params.isApprovalUamc}&id=${params.id}`,
                method: 'get',
                rule: null,
                body: params
            })
        } catch (error) {
            throw error
        }
    }

}