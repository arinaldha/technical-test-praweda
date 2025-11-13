export interface ListResponse<T> {
    success: boolean;
    data: T[];
}

export interface SingleResponse<T> {
    status: number;
    message: string;
    success: boolean;
    data: T;
    meta: MetaResponse;
}

export interface DeleteResponse {
    deleted_at: Date;
    deleted_by: string;
}

export interface MetaResponse {
    page: number;
    limit: number;
    total_data_page: number;
    total_data: number;
}

export interface UploadFileResponse {
    originalName: string
    url: string
}