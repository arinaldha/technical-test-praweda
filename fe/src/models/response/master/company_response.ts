import { GroupResponse } from "../utilities/utility_response";
import { CityResponse } from "./location_response";

// COMPANY RESPONSE
export interface CompanyResponse {
    id: string;
    code: string;
    name: string;
}

export interface UpsertCompanyResponse {
    company_id: string;
}

// COMPANY GROUP RESPONSE
export interface CompanyGroupResponse {
    id: string;
    company_group_code: string;
    company_group_name: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string | null;
    deleted_at: Date | null;
    deleted_by: string | null;
}

export interface UpsertCompanyGroupResponse {
    company_group_id: string;
}

// BRANCHES RESPONSE
export interface BranchResponse {
    id: string;
    branch_code: string;
    branch_name: string;
    branch_address: string;
    fax_no: string;
    city_id: string;
    phone_no: string;
    tax_no: string;
    tax_reg_no: string;
    company_id: string;
    office_flag: string;
    branch_id: string;
    invoice_bank_list: string;
    coda_location_code: string;
    coda_sinv_code: string;
    coda_cinv_code: string;
    coda_pinv_code: string;
    coda_cr_code: string;
    coda_br_code: string;
    coda_bp_code: string;
    coda_cp_code: string;
    coda_adv_code: string;
    coda_stadv_code: string;
    coda_jgen_code: string;
    coda_jaccr_code: string;
    coda_jcor_code: string;
    coda_jdef_code: string;
    suspend_acct_code: string;
    reimburse_acct_code: string;
    customer_adv_acct_code: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string | null;
    deleted_at: Date | null;
    deleted_by: string | null;
    company: CompanyResponse;
    city: CityResponse
    customer_assigned_id: Nullable<string>

}

export interface UpsertBranchResponse {
    branch_id: string;
}

// DEPARTMENTS RESPONSE
export interface DepartmentResponse {
    id: string;
    departement_code: string;
    departement_name: string;
    m_company_id: string;
    coda_el2_code: string | null;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string | null;
    deleted_at: Date | null;
    deleted_by: string | null;
    company: CompanyResponse;
}

export interface UpsertDepartmentResponse {
    department_id: string;
}

// COMPANY POSITION RESPONSE
export interface CompanyPositionResponse {
    id: string;
    company_position_code: string;
    company_position_name: string;
    m_company_id: string;
    m_departemen_id: string;
    office_flag: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string | null;
    deleted_at: Date | null;
    deleted_by: string | null;
    company: CompanyResponse,
    department: DepartmentResponse
}

export interface UpsertCompanyPositionResponse {
    company_position_id: string;
}

// EMPLOYEE RESPONSE
export interface EmployeeResponse {
    id: string
    code: string
    name: string
}

export interface City {
    id: string
    city_code: string
    city_name: string
    country_id: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
}

export interface Branch {
    id: string
    branch_code: string
    branch_name: string
    branch_address: string
    city_id: string
    phone_no: string
    tax_reg_no: string
    company_id: string
    office_flag: string
    branch_id: string
    invoice_bank_list: string
    coda_location_code: string
    coda_sinv_code: string
    coda_cinv_code: string
    coda_pinv_code: string
    coda_cr_code: string
    coda_br_code: string
    coda_bp_code: string
    coda_cp_code: string
    coda_adv_code: string
    coda_stadv_code: string
    coda_jgen_code: string
    coda_jaccr_code: string
    coda_jcor_code: string
    coda_jdef_code: string
    suspend_acct_code: string
    reimburse_acct_code: string
    customer_adv_acct_code: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string
    deleted_at: any
    deleted_by: any
    fax_no: string
    reject_approval_action: string
    customer_assigned_id: any
}

export interface Company {
    id: string
    company_code: string
    company_name: string
    company_group_id: string
    coda_cmpcode: any
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string
    deleted_at: any
    deleted_by: any
    is_default: number
}

export interface CompanyPosition {
    id: string
    company_position_code: string
    company_position_name: string
    m_company_id: string
    m_departemen_id: string
    office_flag: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string
    deleted_at: any
    deleted_by: any
    approval_server_request_flag: boolean
    fup_server_request_flag: boolean
}

export interface Departement {
    id: string
    departement_code: string
    departement_name: string
    departement_description: any
    m_company_id: string
    coda_el2_code: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string
    deleted_at: any
    deleted_by: any
}


export interface UpsertEmployeeResponse {
    employee_id: string;
}
