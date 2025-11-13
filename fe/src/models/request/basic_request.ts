export interface AdvancedSearchItemRequest {
    dependency_id: string;
    dependency_value?: string;
    operator: "equal" | "notEqual" | "greaterThan" | "lessThan" | "like";
}

export interface PaginationRequest {
    page?: number;
    limit?: number;
}

export interface OrderRequest {
    depedency_id?: string;
    type?: string;
}

export interface FindDataRequest {
    search?: string;
    page?: number;
    limit?: number;
    companyId?: string;
    branchId?: string;
    countryId?: string;
    department?: string;
    base_company?: number
}


