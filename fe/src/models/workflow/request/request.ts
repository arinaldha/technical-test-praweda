export type ApproveOrRejectDto = {
    module: string
    action: string
    isApprovalUamc?: boolean
    remark: string
    record: string
}

export type ApproveOrRejectDtoUAMC = {
    module: string
    action: string
    remark: string
    record: string
    isApprovalUamc: Partial<boolean>

}

export type FindWorkflowApprovalDto = {
    branchId: string
    module: string
    approvalAction: string
    idData: string
    isApprovalUamc?: Nullable<"Y" | "N">
}

export type ReminderWorkflowDto = {
    id: string;
    module: string;
    action: string;
    isApprovalUamc?: boolean
}