import { Form, Input, Select, Button, FormProps, Typography } from "antd";
import color from "@/assets/sass/modules/colors.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UpsertModuleRequest } from "@/models/request/utilities/utility_request";
import { GeneralUseCase } from "@/modules/general/usecases/general_usecase";
import { useForm } from "antd/es/form/Form";
const { Option } = Select;
const { Text } = Typography;

interface CreateModuleProps {
  onCancel: () => void;
  onCreateSuccess: () => void;
}

export default function CreateModule({
  onCancel,
  onCreateSuccess,
}: CreateModuleProps) {
  const dispatch = useDispatch();
  const [form] = useForm();

  const [createModule, setCreateModule] = useState<UpsertModuleRequest>({
    alias_name: "",
    table_name: "",
    field_name_code: "",
  });

  const handleCreateModule: FormProps<UpsertModuleRequest>["onFinish"] = () => {
    GeneralUseCase.CreateModule(createModule, dispatch).then(() => {
      form.resetFields();
      onCreateSuccess();
      onCancel();
    });
  };

  return (
    <>
      <Form onFinish={handleCreateModule} layout="vertical" autoComplete="off">
        <div>
          <h2>Module Information</h2>
          <Text type="secondary">Please fill out the form completely</Text>
        </div>
        <br />
        <Form.Item name="alias_name" label="Alias Name">
          <Input
            size="large"
            onChange={(e) =>
              setCreateModule({ ...createModule, alias_name: e.target.value })
            }
            placeholder="Input alias name"
          />
        </Form.Item>
        <Form.Item name="table_name" label="Table Name">
          <Input
            size="large"
            onChange={(e) =>
              setCreateModule({ ...createModule, table_name: e.target.value })
            }
            placeholder="Input table name"
          />
        </Form.Item>
        <Form.Item name="field_name_code" label="Field Name Code">
          <Input
            size="large"
            onChange={(e) =>
              setCreateModule({
                ...createModule,
                field_name_code: e.target.value,
              })
            }
            placeholder="Input field name code"
          />
        </Form.Item>

        <div className="action">
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
          <Button
            className={`submit-btn ${color["bg-primary"]}`}
            htmlType="submit"
            size="large"
          >
            Add
          </Button>
        </div>
      </Form>
    </>
  );
}
