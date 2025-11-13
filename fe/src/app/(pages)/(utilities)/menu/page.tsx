"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Tag,
  Button,
  Flex,
  Table,
  Space,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { GroupUseCase } from "@/modules/utilities/usecases/group_usecase";
import CustomTable from "@/app/components/table/CustomTable";
import CustomModal from "@/app/components/modal/CustomModal";
import SetGroupMenuAccess from "./components/menu_access";
import { useDispatch, useSelector } from "react-redux";
import CreateMenu from "./components/create_menu";
import EditMenu from "./components/edit_menu";
import { MenuUseCase } from "@/modules/utilities/usecases/menu_usecase";
import ModalDelete from "@/app/components/modal/ModalDelete";
import Image from "next/image";

import { ModuleEnum, accessPage } from "@/shared/roles/role";
import NotFound from "@/app/not-found";
import { useIsMobile } from "@/shared/hooks/use_responsive";
import color from "@/assets/sass/modules/colors.module.scss";
import { MenuResponse } from "@/models/response/utilities/utility_response";
import { ColumnsType } from "antd/es/table";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

export interface TransformedMenuItem {
  key: string;
  id: string;
  menu_name: string;
  icon?: string;
  order_no: number;
  is_active: string;
  children?: TransformedMenuItem[];
}

const MenuPage = () => {
  const ruleAccess = accessPage(ModuleEnum.MenuModule);
  const allowShowPage = React.useMemo(() => {
    // const showPage = ruleAccess.access.filter((value) => value === "index");

    // if (showPage.length) {
    //   return true;
    // }

    return true;
  }, [ruleAccess]);

  const dispatch = useDispatch();
  const { groupOption, menus, menu } = useSelector(
    (state: any) => state.utilitySlice
  );
  const isMobile = useIsMobile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalId, setGlobalId] = useState<string>("");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState("");

  const columns: TableColumnsType<MenuResponse> = [
    {
      title: "Menu Name",
      dataIndex: "menu_name",
      key: "menu_name",

      width: "50%",
      render: (value, record) => (
        <Flex gap={10}>
          {record.icon && record.icon.startsWith("<svg") ? (
            <span dangerouslySetInnerHTML={{ __html: record.icon }} />
          ) : record.icon ? (
            <Image src={record.icon} height={20} width={20} alt="Icon" />
          ) : null}
          <span>{record.menu_name}</span>
        </Flex>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",

      width: "12%",
      render: (_, record) => (
        <>
          {record?.is_active === "N" ? (
            <Tag color="red">Inactive</Tag>
          ) : (
            <Tag color="green">Active</Tag>
          )}
        </>
      ),
    },
    {
      title: "Order No.",
      dataIndex: "order_no",
      key: "order_no",

      width: "12%",
    },
    {
      title: "",
      key: "action",
      width: "10%",
      render: (_: any, record) => (
        <Space className="action" size="middle">
          {/* {ruleAccess.access.find((value) => value === "update") && ( */}
            <div>
              <Button
                style={{
                  border: "0",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
                icon={<EditOutlined />}
                onClick={() => {
                  setGlobalId(record.id);
                  fetchMenuId(record.id);
                }}
              ></Button>
            </div>
          {/* )}
          {ruleAccess.access.find((value) => value === "delete") && ( */}
            <div>
              <Button
                style={{
                  border: "0",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
                icon={<DeleteOutlined />}
                onClick={() => handleShowDeleteModal(record?.id)}
              ></Button>
            </div>
          {/* )} */}
        </Space>
      ),
    },
  ];

  const handleShowModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleShowDeleteModal = (id: string) => {
    setIsModalDeleteOpen(true);
    setGlobalId(id);
  };

  const fetchMenuId = (id: string) => {
    handleShowModal("EditModal");
    MenuUseCase.findMenuDetail(id, dispatch);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const getGroups = useCallback(() => {
    if (!allowShowPage) {
      return {
        message: "You don't have permission to access this page",
      };
    }
    GroupUseCase.GroupOption(dispatch);
  }, [allowShowPage, dispatch]);

  const findMenu = useCallback(() => {
    if (!allowShowPage) {
      return {
        message: "You don't have permission to access this page",
      };
    }
    MenuUseCase.findMenu(search, page, limit, dispatch, "Y");
  }, [allowShowPage, search, page, limit, dispatch]);

  const handleCancelDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const handleDeleteMenu = (id: string) => {
    MenuUseCase.deleteMenu(id, dispatch).then(() => {
      findMenu();
      handleCancelDeleteModal();
    });
  };

  const transformMenu = (menu: MenuResponse): TransformedMenuItem => ({
    key: menu.id,
    id: menu.id,
    menu_name: menu.menu_name,
    icon: menu.icon,
    order_no: menu.order_no,
    is_active: menu.is_active,
    children:
      menu.children && menu.children.length > 0
        ? menu.children.map(transformMenu)
        : undefined,
  });

  const dataSource = menus ? menus.map(transformMenu) : [];

  useEffect(() => {
    findMenu();
    getGroups();
  }, [findMenu, getGroups]);

  if (!allowShowPage) {
    return <NotFound />;
  }

  return (
    <>
      <CustomModal
        title={
          modalType === "createModal" ? (
            <>Add Menu</>
          ) : modalType === "SetGroupAccess" ? (
            <>Set Menu Access</>
          ) : modalType === "EditModal" ? (
            <>Edit Menu</>
          ) : (
            <></>
          )
        }
        isModalOpen={isModalOpen}
        modalCancel={handleCancelModal}
      >
        <>
          {modalType === "SetGroupAccess" ? (
            <SetGroupMenuAccess
              groups={groupOption}
              onCancel={handleCancelModal}
            />
          ) : modalType === "createModal" ? (
            <CreateMenu
              onCancel={handleCancelModal}
              onCreateSuccess={findMenu}
            />
          ) : modalType === "EditModal" ? (
            <EditMenu
              onCancel={handleCancelModal}
              onCreateSuccess={findMenu}
              menu={menu}
              id={globalId}
            />
          ) : (
            <></>
          )}
        </>
      </CustomModal>

      {isModalDeleteOpen ? (
        <ModalDelete
          isModalOpen={isModalDeleteOpen}
          onCancel={handleCancelDeleteModal}
          deleteAction={() => handleDeleteMenu(globalId)}
        />
      ) : (
        <></>
      )}
      <CustomTable
        tableHeader={
          <>
            <div
              style={{
                display: isMobile ? "inline" : "flex",
                gap: "12px",
                justifyContent: isMobile ? "center" : "space-between",
                alignItems: "center",
              }}
            >
              <h2>Menu Management</h2>

              <div
                style={{
                  display: isMobile ? "inline" : "flex",
                  gap: isMobile ? "12px" : "0px",
                }}
              >
                {/* {ruleAccess.access.find(
                  (value) => value === "view-menu-group"
                ) && ( */}
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      width: isMobile ? "100%" : "140px",
                      height: "40px",
                      borderColor: "#1B99D5",
                      color: "#1B99D5",
                      fontSize: isMobile ? 13 : 14,
                    }}
                    icon={<SettingOutlined />}
                    onClick={() => handleShowModal("SetGroupAccess")}
                    ghost
                  >
                    Menu Access
                  </Button>
                {/* )} */}
                <div
                  style={{
                    padding: "0.25rem",
                  }}
                />

                {/* {ruleAccess.access.find((value) => value === "create") && ( */}
                  <Button
                    className={`submit-btn ${color["bg-primary"]}`}
                    style={{
                      width: isMobile ? "100%" : "140px",
                      height: "40px",
                    }}
                    onClick={() => handleShowModal("createModal")}
                    size="large"
                    icon={<PlusOutlined />}
                    ghost
                  >
                    Menu
                  </Button>
                {/* )} */}
              </div>
            </div>
          </>
        }
        tableBody={
          <>
            <Table
              style={{
                maxHeight: 800,
                overflow: "hidden",
              }}
              columns={columns}
              dataSource={dataSource}
              expandable={{ defaultExpandAllRows: true }}
              size={isMobile ? "small" : "large"}
              indentSize={20}
              scroll={{ x: 800, y: 550 }}
              pagination={false}
              className="table"
            />
          </>
        }
      />
    </>
  );
};

export default MenuPage;
