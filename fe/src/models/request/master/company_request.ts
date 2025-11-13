// COMPANY REQUEST
export interface UpsertCompanyRequest {
    code: string;
    name: string;
    company_group_id: string;
    coda_cmpcode: string;
    is_default: Nullable<0 | 1>
}


// COMPANY GROUP REQUEST
export interface UpsertCompanyGroupRequest {
    code: string;
    name: string;
}

// BRANCHES REQUEST
export interface UpsertBranchRequest {
    code: string;
    name: string;
    address: string;
    city_id: string;
    phone_no: string;
    fax_no: string;
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
    customer_assigned_id: Nullable<string>;
}

// DEPARTMENT REQUEST
export interface UpsertDepartmentRequest {
    code: string;
    name: string;
    company_id: string;
    coda_el2_code: string | null
}

// COMPANY POSITION REQUEST
export interface UpsertCompanyPositionRequest {
    code: string;
    name: string;
    company_id: string;
    departement_id: string;
    office_flag: string;
    approval_server_request_flag: boolean;
    fup_server_request_flag: boolean;
}

// EMPLOYEE REQUEST
export interface UpsertEmployeeRequest {
    name: string
    employee_code: string
    email: string
    address: string
    city_id: string
    company_id: string
    branch_id: string
    company_position_id: string
    departement_id: string
    mobile_no: string
    adv_coda: string
    cdv_coa: string;

}
