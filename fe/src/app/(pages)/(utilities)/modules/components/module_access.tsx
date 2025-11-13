import { Form, Select, Button, Typography } from "antd";
const { Text } = Typography;
const { Option } = Select;
import color from "@/assets/sass/modules/colors.module.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  GroupResponse,
  SetMenuResponse,
} from "@/models/response/utilities/utility_response";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { GroupUseCase } from "@/modules/utilities/usecases/group_usecase";

interface setModuleAccessProps {
  onCancel: () => void;
}

export default function SetGroupModuleAccess({
  onCancel,
}: setModuleAccessProps) {
  const dispatch = useDispatch();
  const { groupOption } = useSelector((state: any) => state.utilitySlice);

  const navigate = useRouter();

  const [groupId, setGroupId] = useState<string>("");

  const findGroupOption = useCallback(() => {
    GroupUseCase.GroupOption(dispatch);
  }, [dispatch]);

  useEffect(() => {
    findGroupOption();
  }, [findGroupOption]);

  const groupSetter = () => {
    if (!groupId) {
      return null;
    }
    navigate.push("/modules/access/" + groupId);
  };

  return (
    <>
      <Form layout="vertical">
        <div>
          <h3>Module Access</h3>
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
            {groupOption?.map((i: GroupResponse) => (
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

          <Button htmlType="submit" onClick={() => groupSetter()} size="large">
            Set
          </Button>
        </div>
      </Form>
    </>
  );
}
