export type BranchApprovalRequest = {
    branch_id: string
    module_id: string
    approval_action: string
    department_id: string
    sequence_no: number
    company_id: string
    company_posititon_id: string
    minimum_amount: number
    maximum_amount: number
    approval_type: number
}

export interface BranchBankMappingRequest {
    id? : string;
    bank_id: string
    company_id: string
    branch_id: string
    bank_mappings: BankMapping[]
}

export interface BankMapping {
    id? : string;
    bank_id: string
    currency_id: string
    bank_account_type: string
    bank_account_number: string
    bank_account_name: string
    bank_swift_code: string
    coa: string
    bank_account_no: string
    bank_office_name: string
}
