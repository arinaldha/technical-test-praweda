export type IProformaRequest = {
    company_id: string;
    branch_id: string;
    billing_type_id: string;
    billing_sub_type_id: string;
    proforma_no: string;
    proforma_date: string;
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
    amortize_period: number;
    acknowledge_period: number;
    transaction_details: IProformaDetailRequest[]
    transaction_documents: IProformaDocumentRequest[]
}

export type IProformaDetailRequest = {

}

export type IProformaDocumentRequest = {

}