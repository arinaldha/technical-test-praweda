"use client";

import React, { useState } from "react";
import CustomModal from "../modal/CustomModal";
import {
  Form,
  Button,
  Typography,
  Input,
  Select,
  DatePicker,
  Space,
  Row,
  Col,
  SelectProps,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";

const style: React.CSSProperties = { padding: "8px 0" };
interface RequestFormProps {
  parentName: string;
}

export default function RequestForm({ parentName }: RequestFormProps) {
  const pathName = usePathname();
  const navigate = useRouter();
  const accountOption: SelectProps["options"] = [
    { value: "account", label: "Account" },
    { value: "server", label: "Server" },
  ];

  const options = accountOption.filter((opt) => {
    let response;
    if (pathName === "/move-request/create") {
      response = opt.value !== "server";
    } else {
      response = opt;
    }
    return response;
  });

  return (
    <Form layout="vertical" autoComplete="off">
      <div className="form-section">
        <div className="form-section-heading">
          <h2>Request Form</h2>
          <Typography.Text type="secondary">
            Please fill out the form completely
          </Typography.Text>
        </div>
        <div className="form-section-body">
          <Row gutter={[8, 0]}>
            <Col span={8} lg={8}>
              <Form.Item
                name="request_id"
                required
                rules={[
                  {
                    pattern: /[a-zA-Z0-9]/g,
                    message: "Must be Alphabet and Numeric character",
                  },
                ]}
                label="Request ID"
              >
                <Input
                  disabled
                  placeholder="AUTO GENERATED"
                  size="large"
                  maxLength={30}
                />
              </Form.Item>
            </Col>
            <Col span={8} lg={8}>
              <Form.Item
                required
                name="request_date"
                rules={[
                  {
                    pattern: /[a-zA-Z0-9]/g,
                    message: "Must be Alphabet and Numeric character",
                  },
                ]}
                label="Request Date"
              >
                <DatePicker
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  minDate={dayjs()}
                />
              </Form.Item>
            </Col>
            <Col span={8} lg={8}>
              <Form.Item
                name="transaction_group"
                label="Transaction Group Name"
                initialValue={parentName}
              >
                <Select
                  size="large"
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled
                ></Select>
              </Form.Item>
            </Col>
            <Col span={8} lg={8}>
              <Form.Item
                rules={[
                  {
                    pattern: /[\w.]+/,
                    message: "Must be Alphabet and Numeric character",
                  },
                ]}
                name="account_type"
                label="Account Type"
              >
                <Select size="large" options={options} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>

      <Space
        className="action"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => navigate.back()}
          className="cancel-btn"
          style={{
            width: "240px",
            height: "40px",
          }}
          size="large"
        >
          Cancel
        </Button>
        <Button
          style={{
            borderColor: "#1B99D5",
            backgroundColor: "#1B99D5",
            color: "#fff",
            width: "240px",
            height: "40px",
            fontSize: "14px",
          }}
          htmlType="submit"
          size="large"
        >
          Save as Draft
        </Button>
      </Space>
    </Form>
  );
}
