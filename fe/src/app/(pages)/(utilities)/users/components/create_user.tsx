import {
  Form,
  Input,
  Select,
  Button,
  FormProps,
  Switch,
  Typography,
  Flex,
} from "antd";
import { UpsertUserRequest } from "@/models/request/utilities/utility_request";
import color from "@/assets/sass/modules/colors.module.scss";
import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { EmployeeResponse } from "@/models/response/master/company_response";
import { GroupResponse } from "@/models/response/utilities/utility_response";
import { AES } from "crypto-js";
import { useAppSelector } from "@/redux/store";
import { UseReadyOnlyField } from "@/shared/utils/readonly-field";
import { ModuleEnum } from "@/shared/roles/role";
import { UserUseCase } from "@/modules/utilities/usecases/user_usecase";
import { aesDecrypter } from "@/shared/helpers/aes_enc";
import { useForm } from "antd/es/form/Form";
const { Option } = Select;
const { Text } = Typography;

interface CreateUserProps {
  onCancel: () => void;
  onCreateSuccess: () => void;
  groups: GroupResponse[];
  employees: EmployeeResponse[];
}

export default function CreateUser({
  onCancel,
  onCreateSuccess,
  groups,
  employees,
}: CreateUserProps) {
  const dispatch = useDispatch();
  const [form] = useForm();
  const { readOnlyField } = useAppSelector((state) => state.utilsSlice);

  const [createUser, setCreateUser] = useState<UpsertUserRequest>({
    username: "",
    employee_id: "",
    user_type: "",
    password: "",
    group_id: "",
    url_profile: null,
    sso_flag: "N",
    is_active: 0,
  });

  const handleCreateUser: FormProps<UpsertUserRequest>["onFinish"] =
    async () => {
      const AES_SECRET = process.env.NEXT_PUBLIC_CRYPTO_SECRET;
      let encPassword = AES.encrypt(
        createUser.password as string,
        AES_SECRET!
      ).toString();

      let inputUser: any = createUser;
      if (createUser.url_profile) {
        inputUser.url_profile = createUser.url_profile[0];
      }

      if (encPassword) {
        inputUser.password = encPassword;
      }

      UserUseCase.CreateUser(inputUser, dispatch).then(() => {
        form.resetFields();
        onCreateSuccess();
        onCancel();
      });
    };

  const switcherActiveUser = (checked: boolean) => {
    if (createUser.is_active === 0) {
      setCreateUser({ ...createUser, is_active: 1 });
    } else {
      setCreateUser({ ...createUser, is_active: 0 });
    }
  };

  const handleSSO = (checked: boolean) => {
    if (createUser.sso_flag === "N") {
      setCreateUser({ ...createUser, sso_flag: "Y" });
    } else {
      setCreateUser({ ...createUser, sso_flag: "N" });
    }
  };

  const styleForm = {
    marginBottom: "0.25rem",
  };

  const { readOnlyFieldModule, handlePlaceHolderField, handleReadOnlyField } =
    UseReadyOnlyField({
      moduleName: ModuleEnum.UserModule,
      readOnlyField,
    });

  return (
    <Form
      autoComplete="off"
      layout="vertical"
      form={form}
      onFinish={handleCreateUser}
      requiredMark={false}
      style={{
        overflow: "auto",
        height: "600px",
        padding: "12px",
      }}
    >
      <div>
        <h2>User Information</h2>
        <Text style={styleForm} type="secondary">
          Please fill out the form completely
        </Text>
      </div>
      <Flex vertical>
        <Form.Item
          label={
            <>
              Group Name<span className={`${color["required-form"]}`}>*</span>
            </>
          }
          name={"group_id"}
          rules={[
            {
              required: true,
            },
          ]}
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
            onChange={(value) =>
              setCreateUser({ ...createUser, group_id: value })
            }
            placeholder={handlePlaceHolderField(
              "group_id",
              "Select group name"
            )}
            disabled={handleReadOnlyField("group_id")}
          >
            {groups?.map((i: GroupResponse) => (
              <Option key={i.id} value={i.id}>
                {i.group_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={styleForm}
          name={"employee_id"}
          label={
            <>
              Employee Name
              <span className={`${color["required-form"]}`}>*</span>
            </>
          }
          rules={[
            {
              required: true,
            },
          ]}
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
            onChange={(value) =>
              setCreateUser({ ...createUser, employee_id: value })
            }
            placeholder={handlePlaceHolderField(
              "employee_id",
              "Select employee"
            )}
            disabled={handleReadOnlyField("employee_id")}
          >
            {employees?.map((i: EmployeeResponse) => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={styleForm}
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
          label={
            <>
              Username<span className={`${color["required-form"]}`}>*</span>
            </>
          }
        >
          <Input
            onChange={(e) =>
              setCreateUser({ ...createUser, username: e.target.value })
            }
            size="large"
            maxLength={20}
            placeholder={handlePlaceHolderField("username", "Input username")}
            disabled={handleReadOnlyField("username")}
          />
        </Form.Item>
        <Form.Item
          style={styleForm}
          name="password"
          label={
            <>
              Password<span className={`${color["required-form"]}`}>*</span>
            </>
          }
          rules={[
            {
              required: true,
            },
            {
              max: 20,
            },
            { min: 8 },
          ]}
          hasFeedback
        >
          <Input.Password
            size="middle"
            onChange={(e) =>
              setCreateUser({ ...createUser, password: e.target.value })
            }
            placeholder={handlePlaceHolderField("password", "Input password")}
            disabled={handleReadOnlyField("password")}
          />
        </Form.Item>
        <Form.Item
          style={styleForm}
          name="repeat_password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The confirmed password that you entered do not match!"
                  )
                );
              },
            }),
          ]}
          label={
            <>
              Re-Password
              <span className={`${color["required-form"]}`}>*</span>
            </>
          }
        >
          <Input.Password
            size="middle"
            onChange={(e) =>
              setCreateUser({ ...createUser, password: e.target.value })
            }
            placeholder="Input Password"
          />
        </Form.Item>
        <Form.Item
          initialValue={""}
          style={styleForm}
          label={
            <>
              User Type<span className={`${color["required-form"]}`}>*</span>
            </>
          }
          name={"user_type"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            size="large"
            onChange={(value) =>
              setCreateUser({ ...createUser, user_type: value })
            }
            placeholder={handlePlaceHolderField(
              "user_type",
              "Select user type"
            )}
            disabled={handleReadOnlyField("user_type")}
          >
            <Option disabled value="">
              Select one
            </Option>
            <Option value="Employee">Employee</Option>
            <Option value="Driver">Driver</Option>
            <Option value="Customer_Buyer">Customer Buyer</Option>
            <Option value="Vendor">Vendor</Option>
          </Select>
        </Form.Item>
      </Flex>
      <Form.Item style={styleForm} name="url_profile" label="Avatar">
        <Input
          onChange={(e) => {
            if (!e.target.files) {
              return null;
            } else {
              setCreateUser({
                ...createUser,
                url_profile: e?.target?.files,
              });
            }
          }}
          type="file"
          disabled={handleReadOnlyField("url_profile")}
        />
      </Form.Item>
      <Flex
        gap={"6rem"}
        style={{
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
        }}
      >
        <Form.Item
          style={styleForm}
          name="is_active"
          label={
            <>
              Set Status<span className={`${color["required-form"]}`}>*</span>
            </>
          }
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={false}
        >
          <Switch
            onChange={switcherActiveUser}
            disabled={handleReadOnlyField("is_active")}
          />
        </Form.Item>
        <Form.Item
          style={styleForm}
          name="sso_flag"
          label={
            <>
              SSO_Flag<span className={`${color["required-form"]}`}>*</span>
            </>
          }
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={false}
        >
          <Switch
            onChange={handleSSO}
            disabled={handleReadOnlyField("sso_flag")}
          />
        </Form.Item>
      </Flex>

      <div className="action">
        <Button onClick={onCancel} className="cancel-btn" size="large">
          Cancel
        </Button>
        <Button className="submit-btn" htmlType="submit" size="large">
          Add
        </Button>
      </div>
    </Form>
  );
}
