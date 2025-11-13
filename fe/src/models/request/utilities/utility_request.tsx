// GROUP REQUEST
export interface UpsertGroupRequest {
  code: Nullable<string>;
  name: Nullable<string>;
  description?: Nullable<string>;
}

// USER REQUEST
export interface UpsertUserRequest {
  group_id: string;
  employee_id: string;
  username: string;
  password?: string;
  user_type?: string;
  url_profile: Nullable<FileList> | string;
  is_active: number;
  sso_flag?: string;
  id?: string;
}

export interface UpsertUserPhotoRequest {
  url_profile: string;
}

export interface UpsertMenuRequest {
  id?: string;
  name: string;
  description: string;
  path: string;
  parent_menu_id: null | string;
  order_no: number;
  icon: string;
  OptionFlag?: string;
  is_active: string;
}

export interface UpsertModuleRequest {
  moduleId?: string;
  alias_name: string;
  table_name: string;
  field_name_code: string;
}

export interface UpsertPermissionRequest {
  module_id: string;
  permission_name: string;
}

export interface UpsertSetModuleGroupRequest {
  group_id: string;
  roles: UpsertRoleRequest[];
}

export interface UpsertRoleRequest {
  module_id: Nullable<string>;
  permission_id: Nullable<string>;
}

export interface UpsertSetGroupAccessRequest {
  groups_permission: GroupsPermission[];
}

export interface GroupsPermission {
  group_id: string;
  roles: Role[];
}

export interface Role {
  module_id: string | undefined;
  permission_id: string | undefined;
}
