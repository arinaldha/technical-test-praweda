export type IBudgetRequest = {
    company_id: string;
    branch_id: string;
    billing_type_id: string;
    billing_sub_type_id: string;
    budget_no: string;
    budget_date: string;
    budget_life: number
    start_yr: number
    start_period: number
    customer_id: string;
    vendor_id: string;
    employee_id: string;
    credit_term: string;
    currency_id: string;
    tax_vat_id: string;
    remarks: string;
    ref_no: string;
    amortize_period: number;
    acknowledge_period: number;
    transaction_details: IBudgetDetailRequest[]
    transaction_documents: IBudgetDocumentRequest[]
}

export type IBudgetDetailRequest = {
    id?: string
    budget_id?: string
    linenum: number
    department_id: string
    project_id: string
    charge_category_id: string
    charge_id: string
    currency_id: string
    exchange_rate: number
    qty: number
    unit_price: number
    total_amount: number
    tax_vat_id: string
    tax_wht_id: string
    remarks: string
    budget_life: number
    start_yr: number
    start_period: number
}

export type IBudgetDocumentRequest = {

}