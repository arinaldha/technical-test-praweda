"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input, Button, Flex, Collapse } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import CustomTable from "@/app/components/table/CustomTable";
import CustomModal from "@/app/components/modal/CustomModal";
import CreateModule from "./components/create_module";
import CreateRole from "./components/create_role";
import SetGroupModuleAccess from "./components/module_access";
import { useDispatch, useSelector } from "react-redux";
import ModalDelete from "@/app/components/modal/ModalDelete";
import { GeneralUseCase } from "@/modules/general/usecases/general_usecase";
import CustomPagination from "@/app/components/pagination/CustomPagination";
import { ModuleEnum, accessPage } from "@/shared/roles/role";
import { useIsMobile } from "@/shared/hooks/use_responsive";
import NotFound from "@/app/not-found";
import color from "@/assets/sass/modules/colors.module.scss";


const ModulesPage = () => {
  const ruleAccess = accessPage(ModuleEnum.UtilityModule);
  const ruleAccessPermission = accessPage(ModuleEnum.PermissionModule);
  const allowShowPage = React.useMemo(() => {
    // const showPage = ruleAccess.access.filter((value) => value === "index");

    // if (showPage.length) {
    //   return true;
    // }

    return true;
  }, [ruleAccess]);

  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isPermissionDeleteOpen, setIsPermissionDeleteOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [moduleId, setModuleId] = useState<string>("");
  const [permissionId, setPermissionId] = useState<string>("");
  const [modalType, setModalType] = useState("");
  const { listModules } = useSelector((state: any) => state.generalSlice);

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleShowModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleDeletePermission = (permissionId: string) => {
    setPermissionId(permissionId);
    GeneralUseCase.DeletePermission(permissionId, dispatch).then(() => {
      handleCancelDeleteModal();
      findModule();
    });
  };

  const handleCancelDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const findModule = useCallback(() => {
    if (!allowShowPage) {
      return null;
    }
    GeneralUseCase.FindModules(search, page, limit, dispatch);
  }, [allowShowPage, search, page, limit, dispatch]);

  const handlePageChange = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  const handleDeleteModule = (moduleId: string) => {
    GeneralUseCase.DeleteModule(moduleId, dispatch).then(() => {
      handleCancelDeleteModal();
      findModule();
    });
  };

  useEffect(() => {
    findModule();
  }, [findModule]);

  if (!allowShowPage) {
    return <NotFound />;
  }


  return (
    <>
      <CustomModal
        title={
          modalType === "Module Access" ? (
            <>Set Module Access</>
          ) : modalType === "Add Module" ? (
            <>Add Module</>
          ) : modalType === "Add Role" ? (
            <>Add Role</>
          ) : (
            <></>
          )
        }
        isModalOpen={isModalOpen}
        modalCancel={handleCancelModal}
      >
        {modalType === "Module access" ? (
          <SetGroupModuleAccess onCancel={handleCancelModal} />
        ) : modalType === "Create Module" ? (
          <CreateModule
            onCreateSuccess={findModule}
            onCancel={handleCancelModal}
          />
        ) : (
          <CreateRole
            moduleId={moduleId}
            onCancel={handleCancelModal}
            onCreateSuccess={findModule}
          />
        )}
      </CustomModal>

      {isModalDeleteOpen ? (
        <ModalDelete
          isModalOpen={isModalDeleteOpen}
          onCancel={handleCancelDeleteModal}
          deleteAction={() => handleDeleteModule(moduleId)}
        />
      ) : (
        <ModalDelete
          isModalOpen={isPermissionDeleteOpen}
          onCancel={handleCancelDeleteModal}
          deleteAction={() => handleDeletePermission(permissionId)}
        />
      )}

      <CustomTable
        tableHeader={
          <>
            <h2>Module Management</h2>
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
              <div>
                <Input
                  placeholder="Search..."
                  size="large"
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: isMobile ? "100%" : "280px",
                    height: "40px",
                    fontSize: isMobile ? 13 : 14,
                  }}
                />
                <div
                  style={{
                    padding: "0.25rem",
                  }}
                />
              </div>

              <div
                style={{
                  display: isMobile ? "inline" : "flex",
                  gap: isMobile ? "12px" : "0px",
                }}
              >
                {/* {ruleAccessPermission.access.find(
                  (value) => value === "set-group-permission"
                ) && ( */}
                  <Button
                    className="color-ghost"
                    type="primary"
                    size="large"
                    style={{
                      width: isMobile ? "100%" : "9.375rem",
                      borderColor: "#1B99D5",
                      color: "#1B99D5",
                      fontSize: isMobile ? 13 : 14,
                    }}
                    ghost
                    onClick={() => handleShowModal("Module access")}
                  >
                    <SettingOutlined />
                    Module Access
                  </Button>
                {/* )} */}
                <div
                  style={{
                    padding: "0.25rem",
                  }}
                />
                {/* {ruleAccess.access.find((value) => value === "create") && ( */}
                  <Button
                    type="primary"
                    size="large"
                    className={`submit-btn ${color["bg-primary"]}`}
                    style={{
                      width: isMobile ? "100%" : "140px",
                      height : "40px"
                    }}
                    icon={<PlusOutlined />}
                    onClick={() => handleShowModal("Create Module")}
                  >
                    Module
                  </Button>
                {/* )} */}
              </div>
            </div>
            <div style={{ padding: "6px 6px" }} />
            <h3>Alias</h3>
          </>
        }
        tableBody={
          <>
            <Collapse
              accordion
              items={(listModules ?? []).map((module: any) => ({
                key: module.id,
                label: (
                  <Flex justify="space-between" align="center">
                    <span>{module.alias_name}</span>
                    <Flex gap="8px">
                      {/* {ruleAccessPermission.access.find(
                        (value) => value === "create"
                      ) && ( */}
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          size="small"
                          ghost
                          onClick={() => {
                            setModuleId(module.id);
                            handleShowModal("Add Role");
                          }}
                        />
                      {/* )}
                      {ruleAccessPermission.access.find(
                        (value) => value === "delete"
                      ) && ( */}
                        <Button
                          type="primary"
                          icon={<DeleteOutlined />}
                          size="small"
                          ghost
                          onClick={() => {
                            return handleDeleteModule(module.id);
                          }}
                        />
                      {/* )} */}
                    </Flex>
                  </Flex>
                ),
                children: (
                  <div style={{ paddingLeft: "24px" }}>
                    <Flex vertical gap="18px">
                      {(module.permission ?? []).map((perm: any) => (
                        <Flex
                          justify="space-between"
                          align="center"
                          key={perm.id}
                        >
                          <span>{perm.permission_name}</span>
                          {/* {ruleAccessPermission.access.find(
                            (value) => value === "delete"
                          ) && ( */}
                            <Button
                              type="primary"
                              icon={<DeleteOutlined />}
                              size="small"
                              ghost
                              onClick={() => handleDeletePermission(perm.id)}
                            />
                          {/* )} */}
                        </Flex>
                      ))}
                    </Flex>
                  </div>
                ),
              }))}
            />
          </>
        }
      />
      <CustomPagination
        handlePageChange={handlePageChange}
        page={page}
        limit={limit}
      />
    </>
  );
};
export default ModulesPage;
