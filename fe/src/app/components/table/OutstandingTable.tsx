"use client";

import { Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomTable from "./CustomTable";
// import RequestForm from "../form-request/RequestForm";
import { useState } from "react";
import CustomModal from "../modal/CustomModal";
import { usePathname, useRouter } from "next/navigation";

export default function OutstandingTable() {
  const navigate = useRouter();
  const pathName = usePathname();
  const column: ColumnsType = [
    {
      title: "Request ID",
      align: "center",
    },
    {
      title: "Request Date",
      align: "center",
    },
    {
      title: "Transaction Group",
      align: "center",
    },

    {
      title: "Account Type",
      align: "center",
    },
    {
      title: "Group Type",
      align: "center",
    },
    {
      title: "Company",
      align: "center",
    },
    {
      title: "Status",
      align: "center",
    },
    {
      title: "",

      render: (value, record) => (
        <>
          <Space className="action">
            <Button icon={<EditOutlined />} />
            <Button icon={<DeleteOutlined />} />
          </Space>
        </>
      ),
    },
  ];

  const moveRequestColumn: ColumnsType = [
    {
      title: "Request ID",
      align: "center",
    },
    {
      title: "Request Code",
      align: "center",
    },
    {
      title: "First Name",
      align: "center",
    },
    {
      title: "Last Name",
      align: "center",
    },

    {
      title: "Origin Company",
      align: "center",
    },
    {
      title: "Destination Company",
      align: "center",
    },
    {
      title: "Account Type",
      align: "center",
    },
    {
      title: "Group Type",
      align: "center",
    },

    {
      title: "Status",
      align: "center",
    },
    {
      title: "",

      render: (value, record) => (
        <>
          <Space className="action">
            <Button icon={<EditOutlined />} />
            <Button icon={<DeleteOutlined />} />
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        tableHeader={
          <>
            <h3>Outstanding List</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <Input
                placeholder="search.."
                style={{
                  width: "200px",
                }}
              />
              <div />
            </div>
          </>
        }
        tableBody={
          <>
            <Table columns={column} />
          </>
        }
      />
    </>
  );
}
