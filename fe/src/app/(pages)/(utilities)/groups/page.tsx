"use client";

import CustomTable from "@/app/components/table/CustomTable";
import DashboardLayout from "@/app/layouts/dashboard";
import { Button, Input, Space, Table } from "antd";
import { SearchProps } from "antd/es/input";
import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import CustomModal from "@/app/components/modal/CustomModal";
import EditGroup from "./components/edit_group";
import CreateGroup from "./components/create_group";
import ModalDelete from "@/app/components/modal/ModalDelete";
import { FindDataRequest } from "@/models/request/basic_request";
import CustomPagination from "@/app/components/pagination/CustomPagination";
import { GroupUseCase } from "@/modules/utilities/usecases/group_usecase";
import { GroupResponse } from "@/models/response/utilities/utility_response";
import { truncateText } from "@/shared/utils/string";
import { ModuleEnum, accessPage } from "@/shared/roles/role";
import NotFound from "@/app/not-found";
import { useIsMobile } from "@/shared/hooks/use_responsive";
const { Search } = Input;

export default function GroupList() {
  const ruleAccess = accessPage(ModuleEnum.GroupModule);
  const isMobile = useIsMobile();
  const allowShowPage = React.useMemo(() => {
    // const showPage = ruleAccess.access.filter((value) => value === "index");

    // if (showPage.length) {
    //   return true;
    // }

    return true;
  }, [ruleAccess]);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [groupId, setGroupId] = useState<string>("");
  const { groups, group } = useSelector((state: any) => state.utilitySlice);
  const { pagePagination } = useSelector((state: any) => state.basicSlice);
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const handleShowModal = (type: "createModal" | "editModal") => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDeleteModal = (groupId: string) => {
    setIsModalDeleteOpen(true);
    setGroupId(groupId);
  };

  const handleCancelDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const getAllGroups = useCallback(() => {
    if(!allowShowPage){
      return {
        message : "You don't have permission to access this page"
      }
    }
    GroupUseCase.GetAllGroups(search, page, limit, dispatch);
  }, [allowShowPage, search, page, limit, dispatch]);

  const findGroup = (id: string) => {
    handleShowModal("editModal");
    GroupUseCase.GetGroupDetail(id, dispatch);
  };

  const deleteGroup = (groupId: string) => {
    GroupUseCase.DeleteGroup(groupId, dispatch).then(() => {
      handleCancelDeleteModal();
      getAllGroups();
    });
  };

  const handlePageChange = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  useEffect(() => {
    getAllGroups();
  }, [getAllGroups, group]);

  const dataSource: GroupResponse[] = groups?.map((group: any) => ({
    key: group.id,
    id: group.id,
    group_code: group?.group_code,
    group_name: group?.group_name,
    group_description: truncateText(group?.group_description, 50),
  }));

  const columns: ColumnsType<GroupResponse> = [
    {
      title: "Group Code",
      dataIndex: "group_code",
      key: "group_code",
    },
    {
      title: "Group Name",
      dataIndex: "group_name",
      key: "group_name",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <>
          <Space className="action">
            {/* {ruleAccess.access.find((value) => value === "update") && ( */}
              <Button
                onClick={() => {
                  findGroup(record.id);
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

      width: "10%",
    },
  ];

  if (!allowShowPage) {
    return <NotFound />;
  }

  return (
    <>
      <CustomModal
        title={
          modalType === "createModal" ? (
            <>{<PlusOutlined />} Add Group</>
          ) : (
            <>{<EditOutlined />} Edit Group</>
          )
        }
        isModalOpen={isModalOpen}
        modalCancel={handleCancelModal}
      >
        {modalType === "createModal" ? (
          <CreateGroup
            onCancel={handleCancelModal}
            onCreateSuccess={getAllGroups}
          />
        ) : (
          <EditGroup
            onCancel={handleCancelModal}
            onEditSuccess={getAllGroups}
            group={group}
          />
        )}
      </CustomModal>

      {isModalDeleteOpen ? (
        <ModalDelete
          isModalOpen={isModalDeleteOpen}
          onCancel={handleCancelDeleteModal}
          deleteAction={() => deleteGroup(groupId)}
        />
      ) : (
        ""
      )}

      <CustomTable
        tableHeader={
          <>
            <h2>Group List</h2>
            <div
              style={{
                padding: isMobile ? "6px 6px" : "0.25rem",
              }}
            />
            <div
              style={{
                display: isMobile ? "inline" : "flex",

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
                  padding: isMobile ? "6px 6px" : "1rem",
                }}
              />
              {/* {ruleAccess.access.find((value) => value === "create") && ( */}
                <Button
                  onClick={() => handleShowModal("createModal")}
                  type="primary"
                  size="large"
                  ghost
                  style={{
                    width: isMobile ? "100%" : "9.375rem",
                    borderColor: "#1B99D5",
                    color: "#1B99D5",
                  }}
                >
                  <PlusOutlined />
                  Group
                </Button>
              {/* )} */}
            </div>
          </>
        }
        tableBody={
          <>
            <Table<GroupResponse>
              scroll={{ x: 550}}
              size={isMobile ? "small" : "large"}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              className="table"
            />
          </>
        }
      />

      <CustomPagination
        page={page}
        limit={limit}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
