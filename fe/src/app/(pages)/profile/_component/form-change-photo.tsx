"use client";

import { UserResponse } from "@/models/response/utilities/utility_response";
import { AuthUseCase } from "@/modules/auth/usecases/auth_usecase";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import handleLogout from "@/shared/hooks/handle-logout";
import { Form, Button, message, Upload, UploadProps, Image } from "antd";
import { useForm } from "antd/es/form/Form";
import { AES } from "crypto-js";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { InboxOutlined } from "@ant-design/icons";
import { UserUseCase } from "@/modules/utilities/usecases/user_usecase";
import cookieToken from "@/shared/hooks/cookie-store";
import { getCookie } from "cookies-next";
import { UpsertUserRequest } from "@/models/request/utilities/utility_request";
const { Dragger } = Upload;

type ModalProps = {
  userResponse: UserResponse;
  onCancel: () => void;
  fetchUser: () => void;
};

export default function ChangePhotoModal({
  onCancel,
  fetchUser,
  userResponse,
}: ModalProps) {
  const [form] = useForm();
  const nav = useRouter();

  const { user } = useAppSelector((state) => state.authSlice);
  const token = getCookie("access_token");
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [initialImage, setInitialImage] = React.useState("");

  const [imageData, setImageData] = useState<{
    originalName: string;
    url: string;
  } | null>(null);

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}/general/uploadFile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange(info) {
      const { status, response } = info.file;
      if (status === "done") {
        setImageData(response.data);
        setInitialImage(response.data.url);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  const onFinish = async (values: any) => {
    try {
      const body = {
        url_profile: imageData?.url ? (imageData.url as string) : "",
        username: user?.username as string,
        employee_id: user?.employee_id as string,
        group_id: user?.group?.id as string,
        is_active: user?.is_active as number,
        sso_flag: user?.sso_flag,
      } as UpsertUserRequest;

      if (user && body) {
        await UserUseCase.UpdateUserPhoto(user.id as string, body, dispatch);
      }

      fetchUser();
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const userNameSetter = useCallback(() => {
    if (user) {
      setUsername(user.username as string);
      setEmail(user.employee.code as string);
    }
  }, [user]);

  const imageRenderer = imageData?.url && (
    <Image
      src={imageData.url ?? initialImage}
      alt={imageData.originalName || "Profile Picture"}
      height={200}
      width={200}
      preview={false}
      style={{ borderRadius: "50%" }}
    />
  );

  useEffect(() => {
    userNameSetter();
  }, [userNameSetter]);

  return (
    <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: 0,
          overflow: "hidden",
        }}
      >
        {imageRenderer}
      </div>
      <div
        style={{
          marginBottom: 5,
        }}
      />
      <Form.Item>
        <Dragger showUploadList={false} {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Strictly prohibited from uploading
            company data or other banned files.
          </p>
        </Dragger>
      </Form.Item>

      <div className="action">
        <Button onClick={onCancel} className="cancel-btn" size="large">
          Cancel
        </Button>
        <Button className="submit-btn" htmlType="submit" size="large">
          Save
        </Button>
      </div>
    </Form>
  );
}
