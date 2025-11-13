"use client";
import CustomTable from "@/app/components/table/CustomTable";
import {
  GroupsPermission,
  Role,
  UpsertRoleRequest,
  UpsertSetGroupAccessRequest,
} from "@/models/request/utilities/utility_request";
import {
  ModulePermissionResponse,
  ModuleResponse,
} from "@/models/response/general/module_response";

import { GeneralUseCase } from "@/modules/general/usecases/general_usecase";
import { useAppSelector } from "@/redux/store";

import {
  Table,
  Checkbox,
  Flex,
  Button,
  Collapse,
  Typography,
  Form,
  message,
} from "antd";
import { FormProps } from "antd/es/form/Form";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  params: { id: string };
}

export interface RolePermission {
  module_id: string;
  module_name: string;
  role_id: string;
  role_name: string;
}

const ModuleAccessPage = ({ params }: Props) => {
  const dispatch = useDispatch();
  const { id } = params;
  const [form] = Form.useForm();
  const navigate = useRouter();
  const { listModules, groupModule } = useSelector(
    (state: any) => state.generalSlice
  );
  const { list } = useAppSelector((state) => state.unionSlice);
  const [roles, setRoles] = useState<UpsertRoleRequest[]>([]);
  const [request, setRequest] = useState<UpsertSetGroupAccessRequest>({
    groups_permission: [
      {
        group_id: id as string,
        roles: [],
      },
    ],
  });

  const [moduleCheckStates, setModuleCheckStates] = useState<{
    [moduleId: string]: boolean;
  }>({});

  const setItems = (modules: any) => {
    if (!modules || !roles) {
      return null;
    }

    return modules.map((module: any) => ({
      key: module.id,
      label: (
        <Flex justify="space-between" align="center">
          <span>{module.alias_name}</span>

          <Checkbox
            checked={moduleCheckStates[module.id] || false}
            onChange={(e: any) =>
              handleModuleCheckboxChange(e, module.id, module.permission)
            }
          />
        </Flex>
      ),
      children: (
        <div style={{ paddingLeft: "2rem" }}>
          <Flex vertical>
            {module.permission.map((p: any, subIndex: any) => (
              <Flex
                key={`${module.id}-${subIndex}`}
                justify="space-between"
                align="center"
              >
                <span>{p.permission_name}</span>
                <Checkbox
                  checked={roles.some(
                    (role) =>
                      role.module_id === module.id &&
                      role.permission_id === p.id
                  )}
                  onChange={(e: any) =>
                    handlePermissionCheckboxChange(
                      e,
                      module.id,
                      p.id,
                      p.permission_name
                    )
                  }
                />
              </Flex>
            ))}
          </Flex>
        </div>
      ),
    }));
  };

  const handleModuleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    moduleId: string,
    modulePermissions: any[]
  ) => {
    const checked = e.target.checked;
    let updatedRoles = [...roles];

    if (checked) {
      modulePermissions.forEach((p: any) => {
        const existingRole = updatedRoles.find(
          (role) => role.module_id === moduleId && role.permission_id === p.id
        );
        if (!existingRole) {
          updatedRoles.push({ module_id: moduleId, permission_id: p.id });
        }
      });
    } else {
      updatedRoles = updatedRoles.filter(
        (role) => !(role.module_id === moduleId && role.permission_id !== "")
      );
    }

    setRoles(updatedRoles);
    updateRequest(updatedRoles);
    setModuleCheckStates({
      ...moduleCheckStates,
      [moduleId]: checked,
    });
  };

  const handlePermissionCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    moduleId: string,
    permissionId: string,
    permissionName: string
  ) => {
    const checked = e.target.checked;
    let updatedRoles = [...roles];

    if (checked) {
      const existingRole = updatedRoles.find(
        (role) =>
          role.module_id === moduleId && role.permission_id === permissionId
      );
      if (!existingRole) {
        updatedRoles.push({ module_id: moduleId, permission_id: permissionId });
      }

      if (permissionName === "index" || permissionName === "view") {
        const otherPermissionName =
          permissionName === "index" ? "view" : "index";
        const otherPermission = listModules
          .find((module: ModuleResponse) => module.id === moduleId)
          ?.permission.find(
            (p: ModulePermissionResponse) =>
              p.permission_name === otherPermissionName
          );

        if (otherPermission) {
          const otherPermissionRole = updatedRoles.find(
            (role) =>
              role.module_id === moduleId &&
              role.permission_id === otherPermission.id
          );
          if (!otherPermissionRole) {
            updatedRoles.push({
              module_id: moduleId,
              permission_id: otherPermission.id,
            });
          }
        }
      }
    } else {
      updatedRoles = updatedRoles.filter(
        (role) =>
          !(role.module_id === moduleId && role.permission_id === permissionId)
      );

      if (permissionName === "index" || permissionName === "view") {
        const otherPermissionName =
          permissionName === "index" ? "view" : "index";
        const otherPermission = listModules
          .find((module: ModuleResponse) => module.id === moduleId)
          ?.permission.find(
            (p: ModulePermissionResponse) =>
              p.permission_name === otherPermissionName
          );

        if (otherPermission) {
          updatedRoles = updatedRoles.filter(
            (role) =>
              !(
                role.module_id === moduleId &&
                role.permission_id === otherPermission.id
              )
          );
        }
      }
    }

    setRoles(updatedRoles);
    updateRequest(updatedRoles);
  };

  const updateRequest = (updatedRoles: UpsertRoleRequest[]) => {
    setRequest({
      groups_permission: [
        {
          group_id: id as string,
          roles: updatedRoles as Role[],
        },
      ],
    });
  };

  const collapseItem = setItems(listModules);

  const findModule = useCallback(() => {
    GeneralUseCase.FindModules("", 1, 10000, dispatch);
  }, [dispatch]);

  const findGroupRole = useCallback(() => {
    GeneralUseCase.FindGroupPermission(id, dispatch);
  }, [id, dispatch]);

  const parsedRoles = useMemo(() => {
    if (!groupModule?.role_permissions) return [];
    try {
      return JSON.parse(groupModule.role_permissions).map(
        (i: RolePermission) => ({
          module_id: i.module_id,
          permission_id: i.role_id,
        })
      );
    } catch (error) {
      console.error("Error parsing permissions:", error);
      return [];
    }
  }, [groupModule]);

  useEffect(() => {
    setRoles((prevRoles) => [...parsedRoles]);
  }, [parsedRoles]);

  useEffect(() => {
    if (list) {
      const newModuleCheckStates: any = {};
      list.forEach((module: ModuleResponse | Record<string, any>) => {
        if (module.id) {
          newModuleCheckStates[module.id] = roles.some(
            (role) => role.module_id === module.id
          );
        }
      });
      setModuleCheckStates(newModuleCheckStates);
    }
  }, [roles, list]);

  const handleSubmit: FormProps<UpsertSetGroupAccessRequest>["onFinish"] =
    () => {
      GeneralUseCase.setGroupPermission(request, dispatch)
        .then(() => {
          findModule();
        })
        .then(() => navigate.push("/modules"))
        .catch((err) => {
          throw err;
        });
    };

  useEffect(() => {
    findModule();
    findGroupRole();
  }, [findModule, findGroupRole]);

  const handleCancel = () => {
    navigate.push("/modules");
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <h2>Module Access Information</h2>
      <Typography.Text type="secondary">
        Please click the checkbox to give access
      </Typography.Text>

      <CustomTable
        tableHeader={
          <div style={{ textAlign: "end" }}>
            <h3>{groupModule?.group_name ?? "Group"}</h3>
          </div>
        }
        tableBody={<Collapse accordion items={collapseItem} />}
      />
      <div style={{ padding: "12px 12px" }}>
        <Flex
          justify="center"
          gap="1rem"
          style={{
            paddingTop: "0.5rem",
          }}
        >
          <Button
            onClick={handleCancel}
            style={{
              width: "240px",
              height: "40px",
              gap: "8px",
              backgroundColor: "#2929291A",
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "240px",
              height: "40px",
              gap: "8px",
              backgroundColor: "#1B99D5",
            }}
          >
            Save
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default ModuleAccessPage;
