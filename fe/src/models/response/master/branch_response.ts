import { ModuleResponse } from "../general/module_response"
import { BranchResponse, CompanyPositionResponse, CompanyResponse, DepartmentResponse } from "./company_response"

export type BranchApprovalResponse = {
    id: string
    branch_id: string
    branch?: BranchResponse
    module_id: string
    modules?: ModuleResponse
    department_id: string
    department?: DepartmentResponse
    sequence_no: number
    company_id: string
    company?: CompanyResponse
    company_posititon_id: string
    company_position?: CompanyPositionResponse
    minimum_amount: number
    maximum_amount: number
    approval_type: number
    approval_action: 'approval' | 'blacklist' | 'unblacklist'
}

export interface BankMappingResponse {
    id: string
    bank_id: string
    company_id: string
    branch_id: string
    currency_id: string
    bank_account_type: "O" | "C"
    bank_office_name: string
    bank_account_no: string
    bank_swift_code: string
    coa: string
    bank: Bank
    company: Company
    branch: Branch
    currency: Currency
    is_deleted? : boolean
}

export interface Bank {
    bank_code: string
    bank_name: string
}

export interface Company {
    company_code: string
    company_name: string
}

export interface Branch {
    branch_code: string
    branch_name: string
}

export interface Currency {
    currency_code: string
    currency_name: string
}

