import { Form, Input, Select, Button, FormProps } from "antd";
import color from "@/assets/sass/modules/colors.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupUseCase } from "@/modules/utilities/usecases/group_usecase";
import { UpsertGroupRequest } from "@/models/request/utilities/utility_request";
import { useForm } from "antd/es/form/Form";
import { GroupResponse } from "@/models/response/utilities/utility_response";
import { useAppSelector } from "@/redux/store";
import { UseReadyOnlyField } from "@/shared/utils/readonly-field";
import { ModuleEnum } from "@/shared/roles/role";
import { useRouter } from "next/navigation";
const { TextArea } = Input;

interface CreateGroupProps {
  onCancel: () => void;
  onEditSuccess: () => void;
  group: GroupResponse;
}

export default function EditGroup({
  onCancel,
  onEditSuccess,
  group,
}: CreateGroupProps) {
  const dispatch = useDispatch();
  const { readOnlyField } = useAppSelector((state) => state.utilsSlice);
  const router = useRouter();
  const [form] = useForm();
  const [updateGroup, setUpdateGroup] = useState<UpsertGroupRequest>({
    code: group?.group_code,
    name: group?.group_name,
    description: group?.group_description,
  });

  const handleEdit: FormProps<UpsertGroupRequest>["onFinish"] = (value) => {
    GroupUseCase.UpdateGroup(group?.id, value, dispatch).then(() => {
      onEditSuccess();
      onCancel();
    });
  };

  useEffect(() => {
    if (group) {
      form.setFieldsValue({
        code: group.group_code,
        name: group.group_name,
        description: group.group_description,
      });
    }
  }, [form, group]);

  const { readOnlyFieldModule, handlePlaceHolderField, handleReadOnlyField } =
    UseReadyOnlyField({
      moduleName: ModuleEnum.GroupModule,
      readOnlyField,
    });

  return (
    <Form
      onFinish={handleEdit}
      layout="vertical"
      autoComplete="off"
      form={form}
      requiredMark={false}
    >
      <Form.Item
        name="code"
        required
        rules={[
          {
            pattern: /[\w.]+/,
            message: "Must be Alphabet and Numeric character",
          },
        ]}
        label="Group Code"
      >
        <Input
          size="large"
          maxLength={30}
          readOnly
          onChange={(e) =>
            setUpdateGroup({ ...updateGroup, code: e.target.value })
          }
          placeholder={handlePlaceHolderField("group_code", "Input group code")}
          disabled={handleReadOnlyField("group_code")}
        />
      </Form.Item>
      <Form.Item name="name" label="Group Name" rules={[{required: true}]}>
        <Input
          size="large"
          maxLength={100}
          onChange={(e) =>
            setUpdateGroup({ ...updateGroup, name: e.target.value })
          }
          placeholder={handlePlaceHolderField("group_name", "Input group name")}
          disabled={handleReadOnlyField("group_name")}
        />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea
          rows={4}
          onChange={(e) =>
            setUpdateGroup({ ...updateGroup, description: e.target.value })
          }
          placeholder="Input description"
        />
      </Form.Item>

      <div className="action">
        <Button
          className={`cancel-btn ${color[""]}`}
          onClick={onCancel}
          size="large"
          style={{
            width: "240px",
            height: "40px",
          }}
        >
          Cancel
        </Button>
        <Button
          className={`submit-btn ${color["bg-primary"]}`}
          htmlType="submit"
          size="large"
        >
          Save
        </Button>
      </div>
    </Form>
  );
}
