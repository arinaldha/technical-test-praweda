import { CompanyResponse } from "@/models/response/master/company_response"

export interface VendorUpsertResponse {
    Vendor_id: string
}

export interface VendorResponse {
    id: string
    company_id: string
    branch_id: string
    business_entity_id: string
    business_permit_id: string
    vendor_code: string
    vendor_name: string
    vendor_address: string
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
    coda_vendor_code: string
    vendor_id: any
    status: number
    last_approval_sequence: number
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
    company: Company
    city: City
    country: Country
    billing_city: BillingCity
    billing_country: BillingCountry
    business_permit: BusinessPermit
    business_entity: BusinessEntity
    branch: Branch
    setup_coa: SetupCoa
    vendor_banks: any[]
    vendor_contacts: any[]
    vendor_faxes: VendorFax[]
    vendor_legal_documents: any[]
    vendor_phones: VendorPhone[]
    vendor_product_lists: VendorProductList[]
  }

  export interface Company {
    company_name: string
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
  
  export interface SetupCoa {
    description: string
    coa: string
    coa_reimburse: any
  }
  
  export interface VendorFax {
    id: string
    vendor_id: string
    country_id: string
    fax_no: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
  }
  
  export interface VendorPhone {
    id: string
    vendor_id: string
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
  
  export interface VendorProductList {
    id: string
    vendor_id: string
    vendor_product_id: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
    vendor_product: VendorProduct
  }
  
  export interface VendorProduct {
    vendor_product_name: string
  }
  