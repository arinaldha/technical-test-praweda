export interface TProformaResponse {
  id: string;
  company_id: string
  company: Company
  branch_id: string
  branch: Branch
  billing_type_id: string
  billing_type: Nullable<BillingType>
  billing_sub_type_id: string
  billing_sub_type: Nullable<BillingSubType>
  proforma_no: string
  proforma_date: string
  yr: number
  period: number
  customer_id: string
  customer: Nullable<Customer>
  vendor_id: string
  vendor: string
  employee_id: string
  employee: string
  credit_term: number
  currency_id: string
  currency: Nullable<Currency>
  tax_vat_id: string
  tax_vat: Nullable<TaxVat>
  remarks: string
  ref_no: string
  status: number
  amortize_period: number
  acknownledge_period: number
  last_approval_sequence: number
  proforma_details: ProformaDetail[]
  proforma_documents: any[]
  proforma_jurnals: any[]
}

export interface ProformaDetail {
  id: string
  proforma_id: string
  lineum: number
  department_id: string
  department: Nullable<Department>
  project_id: string
  project: Nullable<Project>
  charge_category_id: string
  charge_category: Nullable<ChargeCategory>
  charge_id: string
  charge: Record<string, any>
  currency_id: string
  currency: Nullable<Currency>
  exchange_rate: number
  qty: number
  unit_price: number
  total_amount: number
  tax_vat_id: string
  tax_vat: Nullable<TaxVat>
  tax_wht_id: string
  tax_wht: Record<string, any>
  remarks: string
}

export interface Company {
  company_code: string
  company_name: string
}

export interface Branch {
  branch_code: string
  branch_name: string
}

export interface BillingType {
  billing_type_code: string
  billing_type_name: string
  partner_flag: string
  proforma_required: number
  activity_flag: string
  vat_io: string
  wht_io: string
  analysis_dk: string
  summary_dk: string
  vat_list_flag: number
  wht_list_flag: number
}

export interface BillingSubType {
  billing_type_id: string
  billing_sub_type_code: string
  billing_sub_type_name: string
  charge_group_id: string
  unearn_flag: number
  unearn_period: number
  unearn_coa: string
  budget_required: number
  prepaid_flag: number
  prepaid_period: number
  prepaid_coa: any
}

export interface Customer {
  customer_code: string
  customer_name: string
  customer_address: string
  tax_registration_no: string
  credit_term: number
}

export interface Currency {
  currency_code: string
  currency_name: string
}

export interface TaxVat {
  tax_code: string
  tax_name: string
}

export interface Department {
  departement_code: string
  departement_name: string
}

export interface Project {
  project_code: string
  project_name: string
}

export interface ChargeCategory {
  charge_category_code: string
  charge_category_name: string
}

export interface Currency2 {
  currency_code: string
  currency_name: string
}

export interface TaxVat2 {
  tax_code: string
  tax_name: string
}
