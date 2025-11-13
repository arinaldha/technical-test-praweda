"use client";

import CustomTable from "@/app/components/table/CustomTable";
import {
  MenuResponse,
  UpsertMenuResponse,
} from "@/models/response/utilities/utility_response";
import { GroupUseCase } from "@/modules/utilities/usecases/group_usecase";

import { MenuUseCase } from "@/modules/utilities/usecases/menu_usecase";
import { useIsMobile } from "@/shared/hooks/use_responsive";

import {
  Table,
  Checkbox,
  Flex,
  Button,
  Form,
  Typography,
  TableColumnsType,
  TableProps,
  FormProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

export interface DataType {
  key?: string;
  children: DataType[];
  created_at: string;
  created_by: string;
  deleted_at: any;
  deleted_by: any;
  icon: string;
  id: string;
  is_active: string;
  menu_code: string;
  menu_description: string;
  menu_group_access: any[];
  menu_name: string;
  order_no: number;
  parent_menu: any;
  path: string;
  updated_at: string;
  updated_by: any;
}

export interface SubMenu {
  key?: string;
  id: string;
  menu_code: string;
  menu_name: string;
  menu_description: string;
  path: string;
}

interface Permission {
  menu_id: string;
  menu_access_id: string;
  permission_status: boolean;
}

interface MenuGroupAccess {
  group_id: string;
  permission: Permission[];
}

interface MenuGroupAccessRequest {
  list_menu_group_access: MenuGroupAccess[];
  type: string;
}

export interface MenuAccess {
  id: string;
  menu_id: string;
  group_id: string;
  permissions: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: any;
  deleted_at: any;
  deleted_by: any;
  group: Group;
  menu: Menu;
}

export interface Group {
  id: string;
  group_code: string;
  group_name: string;
  group_description: string;
  is_superadmin: string;
  role_permissions: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at: any;
  deleted_by: any;
}

export interface Menu {
  id: string;
  menu_code: string;
  menu_name: string;
  menu_description: string;
  path: string;
  parent_menu: string;
  order_no: number;
  icon: string;
  is_active: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: any;
  deleted_at: any;
  deleted_by: any;
}

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AccessProps {
  params: { id: string };
}

export default function SetGroupMenuAccess({ params }: AccessProps) {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { menus, listAccess, group } = useSelector(
    (state: any) => state.utilitySlice
  );
  const { id } = params;
  const [form] = useForm();
  const [groupName, setGroupName] = useState<string>("");
  const [menuPermissions, setMenuPermissions] = useState<
    Record<string, boolean>
  >({});

  const findMenu = useCallback(() => {
    MenuUseCase.findMenu("", 1, 100, dispatch);
  }, [dispatch]);

  const dataSource: MenuResponse[] = menus?.map((el: MenuResponse) => ({
    ...el,
    key: el.id,
    children: el.children?.map((i: DataType) => ({ ...i, key: i.id })),
  }));

  const findAccessMenu = useCallback(() => {
    MenuUseCase.findGroupMenu(id, dispatch);
  }, [id, dispatch]);

  const columns: TableColumnsType<MenuResponse> = [
    {
      title: "Menu Name",
      dataIndex: "menu_name",
      key: "menu_name",
      width: "85%",

      render: (value, record) => (
        <>
          <Flex gap={10}>
            {record?.icon ? (
              record.icon.startsWith("<svg") ? (
                <div dangerouslySetInnerHTML={{ __html: record.icon }} />
              ) : (
                <Image
                  src={record.icon}
                  alt="icon"
            
                  width={13}
                  height={13}
                />
              )
            ) : (
              <></>
            )}

            <Typography.Text>{record.menu_name}</Typography.Text>
          </Flex>
        </>
      ),
      children: [],
    },

    {
      title: () => <>{groupName}</>,
      width: "15%",
      key: "action",
      render: (_, record) => (
        <Checkbox
          checked={menuPermissions[record.id] || false}
          onChange={(e) => handlePermissionChange(record, e.target.checked)}
        />
      ),
    },
  ];

  const findGroupDetail = useCallback(() => {
    GroupUseCase.GetGroupDetail(id, dispatch);
  }, [id, dispatch]);

  const handlePermissionChange = (record: DataType, checked: boolean) => {
    setMenuPermissions((prev) => {
      const newState = { ...prev };

      const updatePermission = (
        id: string,
        isChecked: boolean,
        updateChildren: boolean = true
      ) => {
        newState[id] = isChecked;
        const item = findItemById(dataSource, id);
        if (item?.children && updateChildren) {
          item.children.forEach((child) => {
            newState[child.id] = isChecked;
          });
        }
      };

      const findItemById = (
        items: DataType[],
        id: string
      ): DataType | undefined => {
        for (const item of items) {
          if (item.id === id) return item;
          if (item.children) {
            const found = findItemById(item.children, id);
            if (found) return found;
          }
        }
        return undefined;
      };

      updatePermission(record.id, checked);

      const updateParentPermissions = (parentId: string | undefined) => {
        if (!parentId) return;
        const parentItem = findItemById(dataSource, parentId);
        if (!parentItem) return;

        const allChildrenChecked =
          parentItem.children?.every((child) => newState[child.id]) ?? false;
        const anyChildChecked =
          parentItem.children?.some((child) => newState[child.id]) ?? false;

        if (allChildrenChecked) {
          updatePermission(parentId, true, false);
        } else if (!anyChildChecked) {
          updatePermission(parentId, false, false);
        } else {
          updatePermission(parentId, true, false);
        }

        updateParentPermissions(parentItem.parent_menu);
      };

      if (record.parent_menu) {
        updateParentPermissions(record.parent_menu);
      }
      return newState;
    });
  };

  useEffect(() => {
    findMenu();
    findAccessMenu();
    findGroupDetail();
  }, [findMenu, findAccessMenu, findGroupDetail]);

  useEffect(() => {
    setGroupName(group?.group_name);
    if (listAccess && dataSource) {
      const permissions = listAccess.reduce(
        (acc: Record<string, boolean>, access: any) => {
          if (access && access.menu_id) {
            acc[access.menu_id] = true;
            const parentMenu = dataSource.find(
              (item) => item.id === access.menu_id
            )?.parent_menu;
            if (parentMenu) {
              acc[parentMenu] = true;
            }
          }
          return acc;
        },
        {} as Record<string, boolean>
      );
      setMenuPermissions(permissions);
    }
  }, [listAccess, dataSource, group?.group_name]);

  const handleSubmit: FormProps<MenuGroupAccessRequest>["onFinish"] = () => {
    const updatedRequest: MenuGroupAccessRequest = {
      list_menu_group_access: [
        {
          group_id: id as string,
          permission: Object.entries(menuPermissions)
            .filter(([_, value]) => value)
            .map(([menu_id]) => ({
              menu_id,
              menu_access_id: menu_id,
              permission_status: true,
            })),
        },
      ],
      type: listAccess.length > 0 ? "update" : "new",
    };
    MenuUseCase.createOrUpdateMenuGroupAccess(updatedRequest, dispatch).then(
      () => {
        navigate.push("/menu");
        form.resetFields();
      }
    );
  };

  const handleCancel = () => {
    navigate.back();
  };

  return (
    <>
      <Form form={form} onFinish={handleSubmit}>
        <CustomTable
          tableHeader={
            <>
              <Flex vertical>
                <Typography.Title level={4}>
                  Menu Access Information
                </Typography.Title>

                <Typography.Text type="secondary">
                  Please click the checkbox to give access
                </Typography.Text>
              </Flex>
            </>
          }
          tableBody={
            <Table<MenuResponse>
              scroll={{ x: 550 }}
              columns={columns}
              dataSource={dataSource}
              size={isMobile ? "small" : "large"}
              expandable={{
                defaultExpandAllRows: true,
              }}
              indentSize={20}
              pagination={false}
              className="table"
            />
          }
        />

        <Flex
          style={{
            padding: "12px 12px",
          }}
          justify="center"
          gap={8}
        >
          <Button
            onClick={handleCancel}
            style={{ width: "240px", height: "40px", padding: "12 16 12" }}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            style={{
              width: "240px",
              height: "40px",
              padding: "12px 16px 12px",
              backgroundColor: "#1B99D5",
            }}
          >
            Save
          </Button>
        </Flex>
      </Form>
    </>
  );
}
