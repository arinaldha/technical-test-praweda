import { EmployeeResponse } from "../master/company_response";

export interface LoginResponse {
    id: string;
    access_token: string;
    refresh_token: string;
    key_token: string;
    roles?: string | null;
    list_menu?: string | null;
    tes_role?: string | null;
}

export interface LoginErrorResponse {
    message: string;
    statusCode?: string;
    error?: string
}

export interface SessionData {
    id: string;
    access_token: string;
}

export interface ProfileResponse {
    id: string;
    username: string;
    employee_id: string;
    group_id: string;
    is_active: number;
    employee?: EmployeeResponse | null;
}