"use client";

import { Form, Select, Button, Typography } from "antd";
const { Text } = Typography;
const { Option } = Select;
import color from "@/assets/sass/modules/colors.module.scss";
import React, { useState } from "react";

import {
  GroupResponse,
  SetMenuResponse,
} from "@/models/response/utilities/utility_response";

import { useRouter } from "next/navigation";

interface setModuleAccessProps {
  onCancel: () => void;
  groups: GroupResponse[];
}

export default function SetGroupModuleAccess({
  onCancel,

  groups,
}: setModuleAccessProps) {
  const navigate = useRouter();

  const [groupId, setGroupId] = useState<string>("");

  const groupSetter = () => {
    if (!groupId) {
      return null;
    }
    navigate.push("/menu/" + groupId);
  };

  return (
    <>
      <Form layout="vertical">
        <div>
          <h3>Menu Access</h3>
          <Text type="secondary">Please fill out the form completely</Text>
        </div>
        <br />
        <Form.Item
          label={
            <>
              Group Name<span className={`${color["required-form"]}`}>*</span>
            </>
          }
        >
          <Select
            size="large"
            onChange={(value) => setGroupId(value)}
            placeholder="Select group name"
          >
            {groups?.map((i: GroupResponse) => (
              <Option value={i.id} key={i.id}>
                {i.group_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="action">
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>

          <Button
            className={`submit-btn ${color["bg-primary"]}`}
            htmlType="submit"
            onClick={() => groupSetter()}
            size="large"
          >
            Set
          </Button>
        </div>
      </Form>
    </>
  );
}
