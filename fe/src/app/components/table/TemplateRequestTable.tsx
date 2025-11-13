"use client";

import { Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomTable from "./CustomTable";
import { usePathname, useRouter } from "next/navigation";

export default function TableComponent() {
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

  return (
    <>
      <CustomTable
        tableHeader={
          <>
            <h3>Draft Request</h3>
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
              <Button
                size="large"
                onClick={() => navigate.push(`${pathName}/create`)}
                style={{
                  borderColor: "#1B99D5",
                  backgroundColor: "#1B99D5",
                  width: "9.375rem",
                  color: "#fff",
                }}
                icon={<PlusOutlined />}
              >
                New Request
              </Button>
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
