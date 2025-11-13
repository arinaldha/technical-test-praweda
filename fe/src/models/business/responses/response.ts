
export interface EntitiyUpsertResponse {
    business_entry_id: string
}


export interface EntityResponse {
    id: string
    business_entity_code: string
    business_entity_name: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
}



export interface PermitResponse {
    id: string
    business_permit_code: string
    business_permit_name: string
    position_flag: number
    printed_flag: number
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any

}

export interface LegalDocumentResponse {
    id: string
    legal_document_code: string
    legal_document_name: string
    mandatory_for_customer: number
    mandatory_for_vendor: number
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string
    deleted_at: any
    deleted_by: string
}

export interface JobTitleResponse {
    id: string
    job_title_code: string
    job_title_name: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: any
    deleted_at: any
    deleted_by: any
}

export interface PermitUpsertResponse {
    bussiness_permit_id: string
}

export interface LegalDocumentUpsertResponse {
    legal_document_id: string
}

export interface JobTitleUpsertResponse {
    job_title_id: string
}

