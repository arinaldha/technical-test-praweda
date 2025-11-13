"use client";

import CustomTable from "@/app/components/table/CustomTable";
import { Button, Input, Space, Table, TableColumnsType } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { TableProps } from "antd/es/table";
import { CompanyUseCase } from "@/modules/master/usecases/company_usecase";
import { EmployeeResponse } from "@/models/response/master/company_response";
import ModalDelete from "@/app/components/modal/ModalDelete";
import Link from "next/link";
import CustomPagination from "@/app/components/pagination/CustomPagination";
import { ModuleEnum, accessPage } from "@/shared/roles/role";
import NotFound from "@/app/not-found";
import { useIsMobile } from "@/shared/hooks/use_responsive";
import { UniversalUseCase } from "@/modules/union/usecases/uni_usecases";
import { useAppSelector } from "@/redux/store";
import CustomModal from "@/app/components/modal/CustomModal";
import UpsertEmployeeForm from "./_components/upsert-modal";

export default function EmployeeList() {
  const isMobile = useIsMobile();
  const ruleAccess = accessPage(ModuleEnum.EmployeeModule);
  const { list } = useAppSelector((state) => state.unionSlice);
  const allowShowPage = React.useMemo(() => {
    // const showPage = ruleAccess.access.filter((value) => value === "index");

    // if (showPage.length) {
    //   return true;
    // }

    return true;
  }, [ruleAccess]);

  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [branchId, setEmployeeId] = useState<string>("");
  const { employees } = useSelector((state: any) => state.companySlice);
  const { pagePagination } = useSelector((state: any) => state.basicSlice);

  const [modalType, setModalType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailData, setDetailData] = useState<Nullable<EmployeeResponse>>(null);

  const handleShowModal = (type: "createModal" | "editModal") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDeleteModal = (branchId: string) => {
    setIsModalDeleteOpen(true);
    setEmployeeId(branchId);
  };

  const handleCancelDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const getAllEmployees = useCallback(() => {
    if (!allowShowPage) {
      return {
        message: "You don't have permission to access this page",
      };
    }
    UniversalUseCase.HandleFindData(
      {
        moduleName: ModuleEnum.EmployeeModule,
        pathApi: "findEmployee",
        search,
        p: page,
        l: limit,
      },
      dispatch
    );
  }, [allowShowPage, page, limit, search, dispatch]);

  const deleteEmployee = (branchId: string) => {
    CompanyUseCase.DeleteEmployee(branchId, dispatch).then(() => {
      handleCancelDeleteModal();
      getAllEmployees();
    });
  };

  const handlePageChange = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  const dataSource = list?.map(
    (employee: EmployeeResponse | Record<string, unknown>) => ({
      ...employee,
      key: employee.id,
    })
  ) as EmployeeResponse[];

  const columns: TableColumnsType<EmployeeResponse> = [
    {
      title: "Employe Code",
      dataIndex: "code",
      key: "code",

      sorter: (a, b) => a.code!.length - b.code!.length,
    },
    {
      title: "Employe Name",
      dataIndex: "name",
      key: "name",

      sorter: (a, b) => a.name!.length - b.name!.length,
    },
    {
      title: "",
      key: "action",
      width: "10%",
      fixed: "right",
      render: (_, record) => (
        <>
          <Space className="action">
              <Button
                onClick={() => {
                  handleShowModal("editModal");
                  setDetailData(record as EmployeeResponse);
                }}
              >
                <EditOutlined />
              </Button>
              <Button onClick={() => handleShowDeleteModal(record.id)}>
                <DeleteOutlined />
              </Button>
          </Space>
        </>
      ),
    },
  ];

  const onChange: TableProps<EmployeeResponse>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {};

  if (!allowShowPage) {
    return <NotFound />;
  }

  return (
    <>
       <CustomModal
          title={
            modalType === "createModal" ? <>Add Company</> : <>Edit Company</>
          }
          isModalOpen={isModalOpen}
          modalCancel={handleCancelModal}
        >
          <>
            <UpsertEmployeeForm
              onCancel={handleCancelModal}
              onSuccess={() =>
                UniversalUseCase.HandleFindData(
                {
                  moduleName: ModuleEnum.EmployeeModule,
                  pathApi: "findEmployee",
                }, dispatch)
              }
              moduleName={ModuleEnum.EmployeeModule}
              title="Employee"
              data={modalType === "editModal" ? detailData : null}
              role={modalType}
            />
          </>
        </CustomModal>
        {isModalDeleteOpen ? (
           <ModalDelete
          isModalOpen={isModalDeleteOpen}
          onCancel={handleCancelDeleteModal}
          deleteAction={() => deleteEmployee(branchId)}
        />
        ) : (
          ""
        )}

      <CustomTable
        tableHeader={
          <>
            <h2>Employee List</h2>
            <div
              style={{
                padding: isMobile ? "6px 12px" : "0.5rem",
              }}
            ></div>
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
              ></div>
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
                    Employee
                  </Button>
            </div>
          </>
        }
        tableBody={
          <>
            <Table
              scroll={{ x: "max-content" }}
              size={isMobile ? "small" : "large"}
              dataSource={dataSource ? dataSource : []}
              columns={columns}
              onChange={onChange}
              pagination={false}
              className="table"
              showSorterTooltip={{ target: "sorter-icon" }}
            />
          </>
        }
      />

      <CustomPagination handlePageChange={handlePageChange} />
    </>
  );
}
