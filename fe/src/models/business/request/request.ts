

export interface EntitiyUpsertRequest {
    business_entity_code: string;
    business_entity_name: string;
    position_flag: number;
    printed_flag: number;
}

export interface PermitUpsertRequest {
    business_permit_code: string;
    business_permit_name: string;
}

export interface JobTitleUpsertRequest {
    job_title_code: string;
    job_title_name: string;
}

export interface LegalDocumentUpsertRequest {
    legal_document_code: string;
    legal_document_name: string;
    mandatory_for_customer: string;
    mandatory_for_vendor: string;
}