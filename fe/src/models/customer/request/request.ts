interface CustomerUpsertRequest {
    company_id: string
    branch_id: string
    business_entity_id: string
    business_permit_id: string
    customer_code: Nullable<string>
    customer_name: string
    customer_address: string
    customer_phone:Nullable<object>
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
    setup_coa_id: Nullable<string>
    coda_customer_code: string
    customer_id: Nullable<string>
    currency_conversion_flag: number
}
