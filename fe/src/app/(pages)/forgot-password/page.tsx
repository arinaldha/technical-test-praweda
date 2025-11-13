"use client";

import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  Image,
  Row,
  Col,
  FormProps,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
import { LeftOutlined } from "@ant-design/icons";
import { AuthUseCase } from "@/modules/auth/usecases/auth_usecase";
import { useAppDispatch } from "@/redux/store";
import MaskingComponent from "./_components/masking-form";
import { useState } from "react";

export type FormForgotPassword = {
  email: string;
  username: string;
};

export default function ForgorPasswordPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [statusOk, setStatusOk] = useState(false);

  const onFinish: FormProps<FormForgotPassword>["onFinish"] = async (value) => {
    try {
      let response = await AuthUseCase.ForgotPassword(value, dispatch);
      if (response) {
        setStatusOk(true);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const checkEmail = (email: string) => {
    const checkDomain = email.split("@")[1];
    if (checkDomain === "praweda.id" || checkDomain === "samudera.id") {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="header-psi-ops">
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
          <Button
            icon={<LeftOutlined />}
            onClick={() => router.push("/auth/login")}
            type="link"
          >
            {" "}
            Back to Login Page
          </Button>
        </div>
      </div>
      <div
        style={{
          padding: 16,
        }}
      />
      {statusOk ? (
        <>
          <div className="mask-after-login">
            <MaskingComponent />
          </div>
        </>
      ) : (
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
                  <FormItem name={"username"} label="Username">
                    <Input size="large" />
                  </FormItem>

                  <FormItem
                    rules={[
                      {
                        validator: (_, value) =>
                          checkEmail(value)
                            ? Promise.resolve()
                            : Promise.reject(
                                "Domain email only praweda.id or samudera.id"
                              ),
                      },
                    ]}
                    name={"email"}
                    label="Email"
                  >
                    <Input size="large" />
                  </FormItem>

                  <Button htmlType="submit" size="large">
                    Reset
                  </Button>
                </Form>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
}
