"use client";
import CustomModal from "@/app/components/modal/CustomModal";
import ModalDelete from "@/app/components/modal/ModalDelete";
import CustomTable from "@/app/components/table/CustomTable";
import NotFound from "@/app/not-found";
import { CompanyResponse } from "@/models/response/master/company_response";
import { useAppSelector } from "@/redux/store";
import { useIsMobile } from "@/shared/hooks/use_responsive";
import { ModuleEnum, accessPage } from "@/shared/roles/role";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Space, Input } from "antd/es";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import UpsertCompanyForm from "./upsert-modal";
import { useCompany } from "@/hooks/companyAction/action";

interface CompanyTableProps {
  title: string;
  fetchDataById: (id: string) => void;
  deleteDataById: (id: string, moduleName: string, pathApi: string) => void;
  setSearch: (value: string) => void;
  search?: string;
  setPage: (value: number) => void;
  page: number;
  limit: number;
}

export default function CompanyTable(props: CompanyTableProps) {
  const { title, fetchDataById, deleteDataById, limit } = props;
  const { fetchCompanies, companies } = useCompany();
  const { list } = useAppSelector((state) => state.unionSlice);
  const isMobile = useIsMobile();
  const ruleAccess = accessPage(ModuleEnum.CompanyModule);
  const allowShowPage = useMemo(() => {
    return true;
  }, [ruleAccess]);

  const [globalId, setGlobalId] = useState("");
  const [modalType, setModalType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [detailData, setDetailData] = useState<Nullable<CompanyResponse>>(null);

  const handleShowModal = (type: "createModal" | "editModal") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDeleteModal = (id: string) => {
    setIsModalDeleteOpen(true);
    setGlobalId(id);
  };

  const handleCancelDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const column: ColumnsType = [
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
      align: "center",
    },
    {
      title: "Company",
      key: "name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "",
      key: "action",
      width: "5%",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <>
          <Space className="action">
              <Button
                onClick={() => {
                  handleShowModal("editModal");
                  setDetailData(record as CompanyResponse);
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

  const dataSource = list
    ? companies.map((el: Record<string, any> | CompanyResponse) => ({
        key: el.id,
        ...el,
      }))
    : [];

  const handleSearchData = (value: string) => {
    if (value.length) {
      props.setPage(1);
      props.setSearch(value);
    }
    if (!value.length) {
      props.setPage(1);
      props.setSearch("");
    }
  };

  useEffect(() => {
    fetchCompanies({
      moduleName: ModuleEnum.CompanyModule,
      pathApi: "findCompany",
      search: props.search,
      p: props.page,
      l: props.limit,
    });
  }, [props.search, props.page, props.limit]);

  return (
    <>
      {!allowShowPage ? (
        <NotFound />
      ) : (
        <>
          <CustomModal
            title={
              modalType === "createModal" ? <>Add Company</> : <>Edit Company</>
            }
            isModalOpen={isModalOpen}
            modalCancel={handleCancelModal}
          >
            <>
              <UpsertCompanyForm
                onCancel={handleCancelModal}
                onSuccess={() =>
                  fetchCompanies({
                    moduleName: ModuleEnum.CompanyModule,
                    pathApi: "findCompany",
                  })
                }
                moduleName={ModuleEnum.CompanyModule}
                title="Company"
                data={modalType === "editModal" ? detailData : null}
                role={modalType}
              />
            </>
          </CustomModal>
          {isModalDeleteOpen ? (
            <ModalDelete
              isModalOpen={isModalDeleteOpen}
              onCancel={handleCancelDeleteModal}
              deleteAction={() => {
                deleteDataById(globalId, ModuleEnum.CompanyModule, "remove");
                handleCancelDeleteModal();
              }}
            />
          ) : (
            ""
          )}

          <CustomTable
            tableHeader={
              <>
                <h2>
                  <>{title}</> List
                </h2>
                <div
                  style={{
                    padding: isMobile ? "12px" : "0.5rem",
                  }}
                />
                <div
                  style={{
                    display: isMobile ? "inline" : "flex",
                    justifyContent: isMobile ? "center" : "space-between",
                    gap: "12px",
                  }}
                >
                  <Input
                    placeholder="Search..."
                    style={{
                      width: isMobile ? "100%" : "280px",
                      height: "40px",
                    }}
                    size="large"
                    onChange={(e) => handleSearchData(e.target.value)}
                  />
                  <div
                    style={{
                      padding: isMobile ? "0.5rem" : "1rem",
                    }}
                  ></div>
                  {/* {ruleAccess.access.find(
                    (value: string) => value === "create"
                  ) && ( */}
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
                      Company
                    </Button>
                  {/* )} */}
                </div>
              </>
            }
            tableBody={
              <>
                <Table
                  pagination={false}
                  columns={column}
                  scroll={{ x: "max-content" }}
                  dataSource={dataSource}
                />
              </>
            }
          />
        </>
      )}
    </>
  );
}
