export type IBillingRequest = {
    company_id: string;
    branch_id: string;
    proforma_id: string;
    budget_id: string;
    billing_type_id: string;
    billing_sub_type_id: string;
    billing_no: string;
    billing_date: string;
    yr: number;
    period: number;
    customer_id: string;
    vendor_id: string;
    employee_id: string;
    credit_term: string;
    currency_id: string;
    tax_vat_id: string;
    remarks: string;
    ref_no: string;
    due_date: string;
    move_status: number;
    move_at: string;
    move_by: string;
    amortize_period: number;
    acknowledge_period: number;
    transaction_details: IBillingDetailRequest[]
    transaction_documents: IBillingDocumentRequest[]
}

export type IBillingDetailRequest = {

}

export type IBillingDocumentRequest = {

}

export interface IBillingDatatableIndex {
    key: string
    id: string
    billing_no: string
    billing_date: string
    company_name: string
    branch_name: string
    customer_name: string
    billing_id: string
    billing_name: string
    billing_sub_type_name: string
    partner_flag: 'C' | 'V' | 'E'
    status: string
    total_amount: number
    has_detail: boolean
    print_stamp: boolean
    disable_invoice: boolean
}