"use client";

import CustomTable from "@/app/components/table/CustomTable";
import { Avatar, Button, Input, Space, Table } from "antd/es";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import CustomModal from "@/app/components/modal/CustomModal";
import { UserResponse } from "@/models/response/utilities/utility_response";
import EditUser from "./components/edit_user";
import CreateUser from "./components/create_user";
import ModalDelete from "@/app/components/modal/ModalDelete";
import CustomPagination from "@/app/components/pagination/CustomPagination";
import { GroupUseCase } from "@/modules/utilities/usecases/group_usecase";
import { CompanyUseCase } from "@/modules/master/usecases/company_usecase";
import { UserUseCase } from "@/modules/utilities/usecases/user_usecase";
import { truncateText } from "@/shared/utils/string";
import NotFound from "@/app/not-found";
import { ModuleEnum, accessPage } from "@/shared/roles/role";
import { useIsMobile } from "@/shared/hooks/use_responsive";
import Image from "next/image";

export default function UserList() {
  const ruleAccess = accessPage(ModuleEnum.UserModule);
  const isMobile = useIsMobile();
  const allowShowPage = React.useMemo(() => {
    // const showPage = ruleAccess.access.filter((value) => value === "index");

    // if (showPage.length) {
    //   return true;
    // }

    return true;
  }, [ruleAccess]);

  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const { employees } = useAppSelector((state: any) => state.companySlice);
  const { users, groups, user } = useAppSelector(
    (state: any) => state.utilitySlice
  );

  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState<string>("");
  const handleShowModal = (type: "createModal" | "editModal") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDeleteModal = (userId: string) => {
    setIsModalDeleteOpen(true);
    setUserId(userId);
  };

  const handleCancelDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const getAllUsers = useCallback(() => {
    if (!allowShowPage) {
      return {
        message: "You don't have permission to access this page",
      };
    }
    UserUseCase.FindAllUser(search, page, limit, dispatch);
  }, [allowShowPage, search, page, limit, dispatch]);

  // const getAllGroups = useCallback(() => {
  //   if (!allowShowPage) {
  //     return {
  //       message: "You don't have permission to access this page",
  //     };
  //   }
  //   GroupUseCase.GetAllGroups(search, 1, 50, dispatch);
  // }, [allowShowPage, search, dispatch]);

  // const getAllEmployees = useCallback(() => {
  //   if (!allowShowPage) {
  //     return {
  //       message: "You don't have permission to access this page",
  //     };
  //   }
  //   CompanyUseCase.FindEmployee(search, 1, 50, dispatch);
  // }, [allowShowPage, search, dispatch]);

  const findUser = (id: string) => {
    handleShowModal("editModal");
    UserUseCase.GetUserDetail(id, dispatch);
  };

  const deleteUser = (id: string) => {
    UserUseCase.DeleteUser(id, dispatch).then(() => {
      handleCancelDeleteModal();
      getAllUsers();
    });
  };
  const handlePageChange = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  useEffect(() => {
    getAllUsers();
    // getAllGroups();
    // getAllEmployees();
  }, [getAllUsers]);

  const dataSource: UserResponse[] = users?.map((user: UserResponse) => ({
    key: user.id,
    id: user.id,
    username: user.username,
    url_profile: user?.url_profile,
  }));

  const columns: ColumnsType<UserResponse> = [
    {
      title: "",
      dataIndex: "url_profile",
      key: "url_profile",
      width: "7%",
      // fixed: "left",
      render: (text, record) =>
        text ? (
          <Avatar src={text} />
        ) : (
          <Avatar
            icon={<UserOutlined />}
            style={{
              backgroundColor: "#C9E3EF",
              color: "#0076AE",
            }}
          />
        ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Employee Email",
      dataIndex: "employee_email",
      key: "employee_email",
    },
    {
      title: "Employee Address",
      dataIndex: "employee_address",
      key: "employee_address",
      ellipsis: true,
    },
    {
      title: "",
      key: "action",
      width: "10%",
      fixed: "right",
      render: (text, record) => (
        <>
          <Space className="action">
            {/* {ruleAccess.access.find((value) => value === "update") && ( */}
              <Button
                onClick={() => {
                  findUser(record.id);
                }}
              >
                <EditOutlined />
              </Button>
            {/* )}
            {ruleAccess.access.find((value) => value === "delete") && ( */}
              <Button onClick={() => handleShowDeleteModal(record.id)}>
                <DeleteOutlined />
              </Button>
            {/* )} */}
          </Space>
        </>
      ),
    },
  ];

  if (!allowShowPage) {
    return <NotFound />;
  }

  return (
    <>
      <CustomModal
        title={modalType === "createModal" ? <>Add User</> : <>Edit User</>}
        isModalOpen={isModalOpen}
        modalCancel={handleCancelModal}
      >
        {modalType === "createModal" ? (
          <CreateUser
            groups={groups}
            employees={employees}
            onCancel={handleCancelModal}
            onCreateSuccess={getAllUsers}
          />
        ) : (
          <EditUser
            groups={groups}
            employees={employees}
            onCancel={handleCancelModal}
            onEditSuccess={getAllUsers}
            user={user}
          />
        )}
      </CustomModal>

      {isModalDeleteOpen ? (
        <ModalDelete
          isModalOpen={isModalDeleteOpen}
          onCancel={handleCancelDeleteModal}
          deleteAction={() => deleteUser(userId)}
        />
      ) : (
        ""
      )}

      <CustomTable
        tableHeader={
          <>
            <h2>User List</h2>
            <div
              style={{
                padding: isMobile ? "6px 6px" : "0.25rem",
              }}
            />
            <div
              style={{
                display: isMobile ? "inline" : "flex",
                gap: "12px",
                justifyContent: isMobile ? "center" : "space-between",
              }}
            >
              <Input
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: isMobile ? "100%" : "280px", height: "40px" }}
                size="large"
              />
              <div
                style={{
                  padding: isMobile ? "0.5rem" : "1rem",
                }}
              />
              {/* {ruleAccess.access.find((value) => value === "create") && ( */}
                <Button
                  onClick={() => handleShowModal("createModal")}
                  type="primary"
                  size="large"
                  style={{
                    width: isMobile ? "100%" : "9.375rem",
                    borderColor: "#1B99D5",
                    color: "#1B99D5",
                  }}
                  ghost
                >
                  <PlusOutlined />
                  User
                </Button>
              {/* )} */}
            </div>
          </>
        }
        tableBody={
          <>
            <Table<UserResponse>
              scroll={{ x: 550 }}
              size={isMobile ? "small" : "large"}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              className="table"
            />
          </>
        }
      />

      <CustomPagination handlePageChange={handlePageChange} />
    </>
  );
}
