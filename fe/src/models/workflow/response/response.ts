import { ModuleResponse } from "@/models/response/general/module_response";
import { BranchResponse, CompanyPositionResponse, CompanyResponse, DepartmentResponse } from "@/models/response/master/company_response";

export type WorkflowType = {
    id: string;
    branch_id: string;
    branch? : Partial<BranchResponse>
    module_id: string;
    approval_action: string;
    department_id: string;
    department?: Partial<DepartmentResponse>
    sequence_no: number;
    company_id: string;
    company?: Partial<CompanyResponse>
    company_position_id: string;
    company_position?: Partial<CompanyPositionResponse>
    approval_type: string
    current_active: boolean
}

export type WorkflowHistoryType = {
    id: string;
    branch_id: string;
    branch: Partial<BranchResponse>
    module_id: string;
    module: Partial<ModuleResponse>
    approval_action: string;
    item_id: string;
    sequence_no: number;
    company_position_id: string;
    company_position: Partial<CompanyPositionResponse>
    status: string;
    remarks: string;
    created_at: string;
    url_profile : string;
    approver_name : string;
}

export type WorkflowApprovalResponse = {
    workflowApproval: WorkflowType[]
    workflowApprovalHistories: WorkflowHistoryType[]
}