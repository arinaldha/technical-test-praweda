export interface UseCaseRepositoryRequest {
    id?: Nullable<string>
    moduleName: string
    rule?: string
    search?: string
    p?: number
    page?: number
    l?: number
    limit?: number
    body?: Nullable<Record<string, any>>
    list_status?: Nullable<string>
    phone_code?: Nullable<string>
    approval_action?: Nullable<string>
    country_id?: Nullable<string>
    company_id?: Nullable<string>,
    is_active?: Nullable<1 | 0>
    is_base_currency?: Nullable<1 | 0>
    currency_id?: Nullable<string>
    departement_id?: Nullable<string>
    moduleId?: string

}

export interface UseCaseUniversalRequest {
    mode?: "option"
    moduleName: string
    pathApi: string,
    id?: Nullable<string>;
    rule?: string
    search?: string
    p?: number
    l?: number
    body?: Nullable<Record<string, any> | Record<string, unknown>>
    list_status?: Nullable<string>
    phone_code?: Nullable<string>
    approval_action?: Nullable<string>
    country_id?: Nullable<string>
    company_id?: Nullable<string>;
    is_active?: Nullable<1 | 0>
    is_base_currency?: Nullable<1 | 0>
    currency_id?: Nullable<string>;
    period_id?: Nullable<string>
    moduleEnum?: Nullable<string>;
    modulePathApi?: Nullable<string>;
    package_type_id?: Nullable<string>;
    group_type_id?: Nullable<string>
    department_id?: Nullable<string>
    account_email?: Nullable<string>
    include_detail?: Nullable<"Y" | "N">
    account_type_id?: Nullable<string>
    transaction_group_id?: Nullable<string>
    show_all?: Nullable<"Y" | "N">
    flag_request?: Nullable<string>
    order_by?: "asc" | "desc";
    order_by_key?: Nullable<string>
    base_company?: number
    search_active_tariff?: boolean
    date?: string,
    product_service_flag?: Nullable<"P" | "S">
    billing_type_id?: string
    period_maintenance_id?: Nullable<string>
    proforma_flag?: number
    budget_flag?: number
    tax_flag?: string
    charge_group_id?: Nullable<string> | Partial<string>
    project_id?: Nullable<string>;
    charge_category_id?: string
    billing_type_code?: string
    from_mapping?: boolean
    branch_id?: string
    approval_flag?: boolean
    activity_flag?: string,
    billing_sub_type_id?: string;
    customer_id?: string
    vendor_id?: string
    employee_id?: string
    tariff_account_id?: string;
    tariff_server_id?: string;
    tariff_license_id?: string;
    type?: string
    year?: number
    month?: number
    service?: string
    not_has_billing_actual?: boolean
}

