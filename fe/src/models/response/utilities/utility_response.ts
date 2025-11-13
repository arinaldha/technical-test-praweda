import { EmployeeResponse } from "../master/company_response"

// GROUP RESPONSE
export interface GroupResponse {
  id: string
  group_code: string
  group_name: string
  group_description: string
  is_superadmin: string
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
  deleted_at: any
  deleted_by: string
}

export interface UpsertGroupResponse {
  group_id: string
}

export interface SetMenuResponse {
  group_id: string
}


// USER RESPONSE
export interface UserResponse {
  id: string;
  username: string;
  password: string;
  group: GroupResponse
  employee_id: string;
  group_id: string;
  is_active: number;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string | null;
  deleted_at: Date | null;
  deleted_by: string | null;
  employee: EmployeeResponse;
  user_type: string;
  url_profile: Nullable<FileList> | Nullable<string>
  sso_flag: string
  is_default: number
}

export interface MetaResponse {
  page: number;
  limit: number;
  total_data: number;
}

export interface UpsertUserResponse {
  user_id: string;
}

export interface UpsertMenuResponse {
  menu_id: string
}


export interface MenuResponse {
  id: string
  menu_code: string
  menu_name: string
  menu_description: string
  path: string
  parent_menu: string
  order_no: number
  icon: Nullable<FileList> | any
  is_active: string
  created_at: string
  created_by: string
  updated_at: string
  updated_by: any
  deleted_at: any
  deleted_by: any
  menu_group_access: MenuGroupAccess[]
  children: MenuResponse[]
}

export interface MenuGroupAccess {
  id: string
  menu_id: string
  group_id: string
  permissions: string
  created_at: string
  created_by: string
  updated_at: string
  updated_by: any
  deleted_at?: string
  deleted_by?: string
}



export interface UpsertModuleResponse {
  module_id: string
}

export interface UpsertPermissionResponse {
  module_id: string;
  permission_name: string;
}


export interface UpsertSetGroupAccessResponse {
  groups_permission: GroupsPermissionResponse[]
}

export interface GroupsPermissionResponse {
  group_id: string;
  roles: RoleResponse[];
}

export interface RoleResponse {
  module_id: string;
  permission_id: string;
}