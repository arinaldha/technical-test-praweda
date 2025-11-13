export interface AutoNumberingResponse {
    id: string
    numbering_name: string
    module_id: string;
    prefix_format: string
    first_sequence: number
    padding_length: number
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string | null;
    deleted_at: Date | null;
    deleted_by: string | null;
    last_sequence: number
    flag_active: string
    prefix_config: string
    prefix_counter: string
    module: NumberingModuleResponse
  }
  
  export interface NumberingModuleResponse {
    alias_name: string
    id: string
    flag_auto_numbering: string
  }
  