import { Form, Input, Select, Button, FormProps, Typography } from "antd";
import color from "@/assets/sass/modules/colors.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UpsertModuleRequest } from "@/models/request/utilities/utility_request";
import { GeneralUseCase } from "@/modules/general/usecases/general_usecase";
const { Option } = Select;
const { Text } = Typography;

interface CreateRoleProps {
  onCancel: () => void;
  onCreateSuccess: () => void;
  moduleId: string;
}

export default function CreateRole({
  onCancel,
  onCreateSuccess,
  moduleId,
}: CreateRoleProps) {
  const dispatch = useDispatch();

  const [request, setRequest] = useState({
    module_id: moduleId,
    permission_name: "",
  });

  const handleCreateRole: FormProps["onFinish"] = () => {
    GeneralUseCase.CreateRole(request, dispatch).then(() => {
      onCreateSuccess();
      onCancel();
    });
  };

  return (
    <Form onFinish={handleCreateRole} layout="vertical" autoComplete="off">
      <div>
        <h2>Role Information</h2>
        <Text type="secondary">Please fill out the form completely</Text>
      </div>
      <br />
      <Form.Item
        name="permission_name"
        label={
          <>
            Role Name<span className={`${color["required-form"]}`}>*</span>
          </>
        }
      >
        <Input
          size="large"
          onChange={(e) =>
            setRequest({ ...request, permission_name: e.target.value })
          }
          placeholder="Input role name"
        />
      </Form.Item>
      <Text type="secondary">
        Make sure role name that you input is correct!
      </Text>

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
