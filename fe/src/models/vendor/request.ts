export interface VendorUpsertRequest {
    company_id: string
    branch_id: string
    business_entity_id: string
    business_permit_id: string
    vendor_code: Nullable<string>
    vendor_name: string
    vendor_address: string
    vendor_phone: Nullable<object>
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
    coda_vendor_code: string
    vendor_id: Nullable<string>
}

export interface VendorProductUpsertRequest {
    vendor_product_code?: string;
    vendor_product_name?: string;
    description?: string
}
