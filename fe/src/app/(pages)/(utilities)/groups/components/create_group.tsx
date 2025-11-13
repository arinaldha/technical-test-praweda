import { Form, Input, Select, Button, FormProps, Typography, Flex } from "antd";
import color from "@/assets/sass/modules/colors.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GroupUseCase } from "@/modules/utilities/usecases/group_usecase";
import { UpsertGroupRequest } from "@/models/request/utilities/utility_request";
import { useAppSelector } from "@/redux/store";
import { UseReadyOnlyField } from "@/shared/utils/readonly-field";
import { ModuleEnum } from "@/shared/roles/role";

interface CreateGroupProps {
  onCancel: () => void;
  onCreateSuccess: () => void;
}

export default function CreateGroup({
  onCancel,
  onCreateSuccess,
}: CreateGroupProps) {
  const dispatch = useDispatch();
  const { readOnlyField } = useAppSelector((state) => state.utilsSlice);

  const [createGroup, setCreateGroup] = useState<UpsertGroupRequest>({
    code: "",
    name: "",
  });

  const handleCreateGroup: FormProps<UpsertGroupRequest>["onFinish"] = () => {
    GroupUseCase.CreateGroup(createGroup, dispatch).then(() => {
      onCreateSuccess();
      onCancel();
    });
  };

  const { readOnlyFieldModule, handlePlaceHolderField, handleReadOnlyField } =
    UseReadyOnlyField({
      moduleName: ModuleEnum.GroupModule,
      readOnlyField,
    });

  return (
    <Form onFinish={handleCreateGroup} layout="vertical" autoComplete="off" requiredMark={false}>
      <Flex vertical gap={2}>
        <h2>Group Information</h2>
        <Typography.Text type="secondary">
          Please fill out the form completely
        </Typography.Text>
      </Flex>
      <div
        style={{
          paddingBottom: 4,
        }}
      ></div>
      <Form.Item
        name="code"
        initialValue={null}
        rules={[
          {
            pattern: /[\w.]+/,
            message: "Must be Alphabet and Numeric character",
          },
        ]}
        label={
          <>
            Group Code<span className={`${color["required-form"]}`}>*</span>
          </>
        }
      >
        <Input
          size="large"
          
          maxLength={30}
          onChange={(e) =>
            setCreateGroup({ ...createGroup, code: e.target.value })
          }
          placeholder={handlePlaceHolderField("group_code", "Input group code")}
          disabled={handleReadOnlyField("group_code")}
        />
      </Form.Item>
      <Form.Item
        name="name"
        label={
          <>
            Group Name<span className={`${color["required-form"]}`}>*</span>
          </>
        }
        rules={[
          {required: true}
        ]}
      >
        <Input
          size="large"
          maxLength={100}
          onChange={(e) =>
            setCreateGroup({ ...createGroup, name: e.target.value })
          }
          placeholder={handlePlaceHolderField("group_name", "Input group name")}
          disabled={handleReadOnlyField("group_name")}
        />
      </Form.Item>
      <div className="action">
             <Button onClick={onCancel} className="cancel-btn" size="large">
          Cancel
        </Button>
        <Button
          className='submit-btn'
          htmlType="submit"
          size="large"
        >
          Add
        </Button>
      </div>
    </Form>
  );
}
