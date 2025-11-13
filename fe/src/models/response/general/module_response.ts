export interface ModuleResponse {
  id?: string
  alias_name: string
  flag_auto_numbering: string
  field_name_code: string
  table_name: string
  permission: ModulePermissionResponse[]
}

export interface ModulePermissionResponse {
  module_id: string
  id: string
  permission_name: string
}
