"use client";

import { Button, Card, Form, FormProps, Image, Input, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { LeftOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { FormForgotPassword } from "../forgot-password/page";
import { AuthUseCase } from "@/modules/auth/usecases/auth_usecase";
import MaskingComponent from "../forgot-password/_components/masking-form";
import { AES } from "crypto-js";

export type FormResetPassword = {
  new_password: string;
  token: string;
};

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [statusOk, setStatusOk] = useState(false);

  const onFinish: FormProps<FormResetPassword>["onFinish"] = async (value) => {
    try {
      const AES_SECRET = process.env.NEXT_PUBLIC_CRYPTO_SECRET;
      const passwordAes = AES.encrypt(
        value.new_password as string,
        AES_SECRET!
      ).toString();
      const tokenEncoded = encodeURIComponent(token as string);
      if (!passwordAes) {
        return null;
      }
      let body = {
        new_password: passwordAes,
        token: tokenEncoded as string,
      };
      let response = await AuthUseCase.ResetPassword(body, dispatch);
      if (response) {
        router.push("/auth/login");
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div
        className="header-psi-ops"
        style={{
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          onClick={() => router.push("/home")}
          src="/images/logo.png"
          alt="image"
          style={{
            position: "sticky",
            paddingLeft: "24px",
            height: "36px",
          }}
          preview={false}
        />
        <div className="back-button">
          <div />
        </div>
      </div>
      <div
        style={{
          padding: 16,
        }}
      />

      <>
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",

            padding: 0,
            margin: 0,
          }}
        >
          <div className="form-forgot-password">
            <Card>
              <Form
                style={{
                  padding: 0,
                  margin: 0,
                }}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
              >
                <div className="header-modal">
                  <h3>Forgot Password?</h3>
                  <div
                    style={{
                      margin: 8,
                    }}
                  />
                  <Typography.Text
                    style={{
                      fontSize: 14,
                    }}
                    type="secondary"
                  >
                    Don’t worry, you’ll get instruction to reset password!
                  </Typography.Text>
                </div>
                <div
                  style={{
                    marginBottom: 12,
                  }}
                />
                <Form.Item
                  name={"new_password"}
                  rules={[
                    {
                      min: 8,
                      message: "Password character must be more than 8.",
                    },
                  ]}
                  label="New Password"
                >
                  <Input.Password
                    style={{
                      height: "40px",
                    }}
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name={"confirm_password"}
                  label="Confirm Password"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
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
                    }}
                    size="large"
                  />
                </Form.Item>

                <Button
                  htmlType="submit"
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "#1b99d5",
                    color: "#FFF",
                    border: "none",
                  }}
                >
                  Reset
                </Button>
              </Form>
            </Card>
          </div>
        </div>
      </>
    </>
  );
}
