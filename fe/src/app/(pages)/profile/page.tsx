"use client";

import { UserResponse } from "@/models/response/utilities/utility_response";
import { CompanyUseCase } from "@/modules/master/usecases/company_usecase";
import { UserUseCase } from "@/modules/utilities/usecases/user_usecase";
import { useAppSelector } from "@/redux/store";
import { ZoomInOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Form,
  FormProps,
  Image,
  Input,
  Row,
  Space,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { GetProp, UploadFile, UploadProps } from "antd";
import { UniversalUseCase } from "@/modules/union/usecases/uni_usecases";
import { ModuleEnum } from "@/shared/roles/role";
import { EmployeeResponse } from "@/models/response/master/company_response";
import CustomModal from "@/app/components/modal/CustomModal";
import ChangePasswordModal from "./_component/form-change-pwd";
import ChangePhotoModal from "./_component/form-change-photo";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function UserProfilePage({}) {
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.authSlice);
  const { detail } = useAppSelector((state) => state.unionSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [previewImage, setPreviewImage] = React.useState("");
  const [modalType, setModalType] = React.useState("");
  const [employeDetail, setEmployeeDetail] =
    React.useState<Nullable<EmployeeResponse>>(null);

  const initialValueProfile = React.useMemo(() => {
    let response = null;
    if (user) {
      response = user as UserResponse;
      setPreviewImage(response.url_profile as string);
    }
    return response as UserResponse;
  }, [user]);

  const modalChange = (value: string) => {
    setModalType(value);
  };

  const fetchEmployeeById = useCallback(async () => {
    try {
      let response;
      if (initialValueProfile.employee_id) {
        response = await UniversalUseCase.HandleFindDataById(
          {
            id: initialValueProfile.employee_id,
            moduleName: ModuleEnum.EmployeeModule,
            pathApi: "findEmployee",
          },
          dispatch
        );
      }
      setEmployeeDetail(response as EmployeeResponse);
      return response;
    } catch (error) {
      throw error;
    }
  }, [dispatch, initialValueProfile?.employee_id]);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePicture: FormProps<any>["onFinish"] = (value) => {};

  const handleFetchUserId = React.useCallback(async () => {
    try {
      let response;
      if (user) {
        response = await UserUseCase.GetUserDetail(user.id, dispatch);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  useEffect(() => {
    fetchEmployeeById();
  }, []);

  return (
    <>
      <CustomModal
        modalCancel={handleCloseModal}
        isModalOpen={isModalOpen}
        title={
          modalType === "changePassword" ? (
            <> Change Password</>
          ) : (
            <>Change Photo</>
          )
        }
      >
        {modalType === "changePhoto" && (
          <ChangePhotoModal
            userResponse={initialValueProfile}
            onCancel={handleCloseModal}
            fetchUser={handleFetchUserId}
          />
        )}
        {modalType === "changePassword" && (
          <ChangePasswordModal
            onCancel={handleCloseModal}
            userResponse={initialValueProfile}
          />
        )}
      </CustomModal>
      <div
        style={{
          display: "flex",
          padding: "6px",
        }}
      >
        {/* URL PROFILE */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px",
            width: "240px",
            height: "90vh",
            borderRight: "1px solid #EFEFEF",
            textAlign: "center",
          }}
        >
          <div
            className="photo-profile"
            style={{
              display: "flex",
              gap: "12px",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {/* Section Photo */}
            <div
              style={{
                position: "relative",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: "50%",
                  border: "2px solid",
                  padding: "6px",
                  borderColor: "#EFEFEF",
                }}
              >
                <Image
                  src={previewImage}
                  style={{
                    borderRadius: "50%",
                    width: "160px",
                    height: "160px",
                    overflow: "hidden",
                  }}
                  alt={`${initialValueProfile?.username}'s profile`}
                  preview={{
                    src: previewImage,

                    mask: false,
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                }}
              >
                <Tooltip title="Change Picture">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      handleOpenModal();
                      setModalType("changePhoto");
                    }}
                    shape="circle"
                    style={{
                      border: "1px solid",
                      borderColor: "#EFEFEF",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Tooltip>
              </div>
            </div>

            {/* Section Username */}
            <div className="text-username">
              <h4>{initialValueProfile?.username}</h4>
              <Typography.Text type="secondary">
                {initialValueProfile?.employee?.name}
              </Typography.Text>
            </div>
          </div>
        </div>
        {/* END URL PROFILE */}

        <div
          className="employee-information"
          style={{
            padding: "12px",
            display: "flex",
            gap: "12px",
            flexDirection: "column",
          }}
        >
          <h3>Employee Information</h3>

          <div className="form-profile">
            <Row gutter={16}>
              <Col span={8}>
                <label
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary">
                    NIK / Employee code
                  </Typography.Text>
                </label>
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  size="large"
                  value={employeDetail?.code ?? "-"}
                  variant="borderless"
                />
              </Col>
              <Col span={8}>
                <label
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary">
                    Employee Name
                  </Typography.Text>
                </label>
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  value={initialValueProfile?.employee?.name ?? "-"}
                  size="large"
                  variant="borderless"
                />
              </Col>
              <Col span={8}>
                <label
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary">Address</Typography.Text>
                </label>
                <Input.TextArea
                  style={{
                    marginBottom: "6px",
                  }}
                  value={initialValueProfile.employee?.code ?? "-"}
                  size="large"
                  variant="borderless"
                  rows={2}
                />
              </Col>
              <Col span={8}>
                <label
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary">City</Typography.Text>
                </label>
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  value={"-"}
                  size="large"
                  variant="borderless"
                />
              </Col>
              <Col span={8}>
                <label
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary">Phone No.</Typography.Text>
                </label>
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  value={"-"}
                  size="large"
                  variant="borderless"
                />
              </Col>
              <Col span={8}>
                <label
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary">Mobile No.</Typography.Text>
                </label>
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  value={"-"}
                  size="large"
                  variant="borderless"
                />
              </Col>
              <Col span={8}>
                <label
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary">NPWP</Typography.Text>
                </label>
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  size="large"
                  variant="borderless"
                />
              </Col>
              <Col span={8}>
                <label
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary">Company</Typography.Text>
                </label>
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  value={
                    "-"
                  }
                  size="large"
                  variant="borderless"
                />
              </Col>
              <Col span={8}>
                <label
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary">Branch</Typography.Text>
                </label>
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  value={
                    "-"
                  }
                  size="large"
                  variant="borderless"
                />
              </Col>
              <Col span={8}>
                <label>
                  <Typography.Text type="secondary">Department</Typography.Text>
                </label>
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  value={
                    "-"
                  }
                  size="large"
                  variant="borderless"
                />
              </Col>
            </Row>
            <div className="action-button">
              <div className="button-change-password">
                <Button
                  style={{
                    backgroundColor: "rgb(234,234,234, 0.8)",
                    color: "#656565",
                    fontWeight: "400",
                    width: "240px",
                    height: "40px",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setModalType("changePassword");
                  }}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
