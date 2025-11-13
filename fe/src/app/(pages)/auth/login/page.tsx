"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  type FormProps,
  Input,
  Row,
  Col,
  Image,
  Divider,
  message,
} from "antd";
import "@/assets/sass/pages/auth.scss";
import Link from "next/link";
import color from "@/assets/sass/modules/colors.module.scss";
import { LoginRequest } from "@/models/request/auth/auth_request";
import { AuthUseCase } from "@/modules/auth/usecases/auth_usecase";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { AES } from "crypto-js";
import { useMediaQuery } from "react-responsive";
import { showErrorNotification } from "@/shared/helpers/notification";
import { getSessionData } from "@/shared/helpers/session";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import ReCAPTCHA from "react-google-recaptcha";
import type { NextPage } from "next";
import { useAppSelector } from "@/redux/store";

export default function Login() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { isBtnLoading } = useSelector((state: any) => state.basicSlice);

  const loginRequestInitial: LoginRequest = {
    username: "",
    password: "",
    remember: false,
  };

  const handleEncPassword: any = (password: string) =>
    AES.encrypt(
      password,
      process.env.NEXT_PUBLIC_CRYPTO_SECRET || ""
    ).toString();

  const [loginRequest, setLoginRequest] =
    useState<LoginRequest>(loginRequestInitial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    [];
    setLoginRequest({
      ...loginRequest,
      [name]: value,
      ["password"]: handleEncPassword(value),
    });
  };

  const handleResponsive = useMediaQuery({
    maxWidth: 968,
  });

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        setIsVerified(true);
      }
    } catch (e) {
      setIsVerified(false);
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }

  const handleLogin: FormProps<LoginRequest>["onFinish"] = () => {
    if (!isVerified) {
      showErrorNotification("Please complete the CAPTCHA verification.");
      return;
    }
    AuthUseCase.LoginByPass(loginRequest, dispatch).then(() =>
      router.push("/")
    );
  };

  return (
    <div className="auth">
      <div className="container">
        <Row gutter={[16, 16]} align="middle">
          {!handleResponsive && (
            <Col lg={12} className="left">
              <div className="content">
                <Image
                  src="/images/illustrations/auth.png"
                  alt="image"
                  preview={false}
                />

                <p>
                  Make your management easier and organized with New
                  <b> PSI OPS</b>
                </p>
              </div>
            </Col>
          )}
          <Col lg={12} className="right">
            <div className="content">
              <div className="heading">
                <Image
                  src="/images/logo.png"
                  alt="image"
                  preview={false}
                  width={170}
                />

                <h1>Welcome to PSI Operational</h1>
                <p>Login with your username and password!</p>
              </div>
              <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                autoComplete="off"
              >
                <Input
                  style={{
                    marginBottom: "6px",
                  }}
                  placeholder="Input your username"
                  name="username"
                  required={true}
                  onChange={handleChange}
                  prefix={<UserOutlined />}
                />
                <Input.Password
                  placeholder="Input your password"
                  name="password"
                  required={true}
                  onChange={handleChange}
                  prefix={<KeyOutlined />}
                />
                <Row align="middle" justify="space-between">
                  <Col>
                    <Form.Item<LoginRequest>
                      name="remember"
                      valuePropName="checked"
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <div id="captcha"></div>
                <Form.Item>
                  <div className="login-auth">
                    
              <GoogleOAuthProvider clientId="361698997955-9rjfm64hssfmhas0iersbi9bkdjhobke.apps.googleusercontent.com">
                <div className="social">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      ref={recaptchaRef}
                      onChange={handleCaptchaChange}
                      onExpired={handleExpired}
                    />
                  </div>
                </div>
              </GoogleOAuthProvider>
                    <Button
                      htmlType="submit"
                      size="large"
                    >
                      Login
                      {isBtnLoading ? (
                        <Image
                          src="/images/loadings/pulse.svg"
                          alt="image"
                          preview={false}
                        />
                      ) : (
                        ""
                      )}
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
