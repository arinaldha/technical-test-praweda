import { CompanyResponse } from "@/models/response/master/company_response"

export interface CustomerUpsertResponse {
    customer_id: string
}



export interface CustomerResponse {
    id: string
    company_id: string
    branch_id: string
    business_entity_id: string
    business_permit_id: string
    customer_code: string
    customer_name: string
    customer_address: string
    country_id: string
    city_id: string
    billing_name: string
    billing_address: string
    billing_country_id: string
    billing_city_id: string
    email: string
    website: string
    tax_registration_no: string
    credit_term: number
    credit_limit: number
    setup_coa_id: string
    coa: string
    coa_reimburse: string
    coda_customer_code: string
    customer_id: any
    currency_conversion_flag: number
    status: number
    last_approval_sequence: number
    city: City
    company: {
        company_name: Nullable<string>
    } | CompanyResponse
    country: Country
    billing_city: BillingCity
    billing_country: BillingCountry
    business_permit: BusinessPermit
    business_entity: BusinessEntity
    branch: Branch
    customer_contacts: CustomerContact[]
    customer_legal_documents: CustomerLegalDocument[]
    customer_faxes: CustomerFax[]
    customer_phones: CustomerPhone[]
    created_by?: string;
}

export interface City {
    city_name: string
}

export interface Country {
    country_name: string
}

export interface BillingCity {
    city_name: string
}

export interface BillingCountry {
    country_name: string
}

export interface BusinessPermit {
    business_permit_name: string
}

export interface BusinessEntity {
    business_entity_name: string
}

export interface Branch {
    branch_name: string
}

export interface CustomerContact {
    id: string
    customer_id: string
    salutation: string
    customer_contact_name: string
    flag_email_invoice?: boolean;
    job_title_id: string
    contact_id_no: string
    contact_id_url: string
    email: string
    phone_no: string
    mobile_no: string
    is_primary: number
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
}

export interface CustomerLegalDocument {
    id: string
    customer_id: string
    legal_document_id: string
    document_no: string
    validity_start_date: string
    validity_end_date: string
    document_url: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
}

export interface CustomerFax {
    id: string
    customer_id: string
    country_id: string
    fax_no: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
}

export interface CustomerPhone {
    id: string
    customer_id: string
    country_id: string
    phone_no: string
    extension_no: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
}


export interface CoaResponse {
    id: string
    description: string
    coa: number
    coa_reimburse: number
    created_at: string
    created_by: string
    deleted_at: any
    deleted_by: any
}

