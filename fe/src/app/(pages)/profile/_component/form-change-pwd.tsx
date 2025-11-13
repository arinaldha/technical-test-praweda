"use client";

import { UserResponse } from "@/models/response/utilities/utility_response";
import { AuthUseCase } from "@/modules/auth/usecases/auth_usecase";
import { UniversalUseCase } from "@/modules/union/usecases/uni_usecases";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { aesEncrypter } from "@/shared/helpers/aes_enc";
import handleLogout from "@/shared/hooks/handle-logout";
import { Form, Input, Button, Typography } from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import { AES } from "crypto-js";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export type ChangePasswordFormProps = {
  username: string;
  new_password: string;
  old_password: string;
  email: string;
};

type ModalProps = {
  userResponse: UserResponse;
  onCancel: () => void;
};

export default function ChangePasswordModal(props: ModalProps) {
  const [form] = useForm();
  const nav = useRouter();
  const { user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  const onFinish: FormProps<ChangePasswordFormProps>["onFinish"] = async (
    values
  ) => {
    try {
      const AES_SECRET = process.env.NEXT_PUBLIC_CRYPTO_SECRET;

      const aesPwd = AES.encrypt(values.new_password, AES_SECRET!).toString();
      const aesOldPwd = AES.encrypt(
        values.old_password,
        AES_SECRET!
      ).toString();

      if (!aesPwd && !aesOldPwd && !user && !username) {
        return null;
      }

      const body = {
        username: username as string,
        old_password: aesOldPwd,
        new_password: aesPwd,
        email: email as string,
      };
      const response = await AuthUseCase.ChangePassword(body, dispatch);
      props.onCancel();
      await handleLogout();
      nav.push("/auth/login");
      return response;
    } catch (error) {
      throw error;
    }
  };

  const userNameSetter = React.useCallback(() => {
    if (user) {
      setUsername(user.username as string);
      setEmail(user.employee.code as string);
    }
  }, [user]);

  useEffect(() => {
    userNameSetter();
  }, [userNameSetter]);

  return (
    <>
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        <div className="header-modal">
          <h3 className="title">New Password</h3>
          <Typography.Text type="secondary">
            Please fill out the form completely
          </Typography.Text>
        </div>
        <Form.Item
          required
          label="Current Password"
          name="old_password"
          rules={[
            { required: true, message: "Please input your current password!" },
          ]}
        >
          <Input.Password
            style={{
              height: "40px",
              width: "100%",
            }}
            minLength={8}
          />
        </Form.Item>
        <Form.Item
          required
          label="New Password"
          name="new_password"
          rules={[
            { required: true, message: "Please input your new password!" },
            { min: 8, message: "Password must be at least 8 characters long!" },
          ]}
          hasFeedback
        >
          <Input.Password
            style={{
              height: "40px",
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          required
          label="Confirm Password"
          name="confirm_password"
          dependencies={["new_password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            style={{
              height: "40px",
              width: "100%",
            }}
          />
        </Form.Item>
        <div className="action">
          <Button onClick={props.onCancel} className="cancel-btn" size="large">
            Cancel
          </Button>
          <Button className="submit-btn" htmlType="submit" size="large">
            Change Password
          </Button>
        </div>
      </Form>
    </>
  );
}
