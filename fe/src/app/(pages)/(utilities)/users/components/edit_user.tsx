import { Form, Input, Select, Button, FormProps, Switch, Flex } from "antd";
import { UpsertUserRequest } from "@/models/request/utilities/utility_request";
import color from "@/assets/sass/modules/colors.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeResponse } from "@/models/response/master/company_response";
import { UserUseCase } from "@/modules/utilities/usecases/user_usecase";
import {
  GroupResponse,
  UserResponse,
} from "@/models/response/utilities/utility_response";
import { useAppSelector } from "@/redux/store";
import { UseReadyOnlyField } from "@/shared/utils/readonly-field";
import { ModuleEnum } from "@/shared/roles/role";
import { useRouter } from "next/navigation";

const { Option } = Select;
const styleForm = {
  marginBottom: "0.25rem",
};

interface EditUserProps {
  onCancel: () => void;
  onEditSuccess: () => void;
  groups: GroupResponse[];
  user: UserResponse;
  employees: EmployeeResponse[];
}

export default function EditUser({
  onCancel,
  onEditSuccess,
  employees,
  groups,
  user,
}: EditUserProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const { readOnlyField } = useAppSelector((state) => state.utilsSlice);
  const [switcher, setSwitcher] = useState<boolean>();
  const [switcherSso, setSwitcherSso] = useState<boolean>();

  const [editUser, setEditUser] = useState({
    group_id: user?.group?.id,
    employee_id: user?.employee.id,
    username: user?.username,
    user_type: user?.user_type,
    password: user?.password,
    is_active: user?.is_active,
    url_profile: user?.url_profile,
    sso_flag: user?.sso_flag,
  });

  const switcherActiveUser = (checked: boolean) => {
    setSwitcher(checked);
  };

  const switcherFlag = (checked: boolean) => {
    setSwitcherSso(checked);
  };

  const handleEditUser: FormProps<UpsertUserRequest>["onFinish"] = () => {
    switcher ? (editUser.is_active = 1) : (editUser.is_active = 0);
    switcherSso ? (editUser.sso_flag = "Y") : (editUser.sso_flag = "N");
    const updatedUser: any = editUser;

    if (editUser.url_profile) {
      updatedUser.url_profile = editUser.url_profile[0];
    }

    UserUseCase.UpdateUser(user.id, updatedUser, dispatch).then(() => {
      onEditSuccess();
      onCancel();
    });
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        group_id: user.group.id,
        employee_id: user.employee.id,
        username: user.username,
        user_type: user.user_type,
        is_active: user.is_active,
        sso_flag: user.sso_flag,
        url_profile: null,
      });
      setEditUser({
        group_id: user.group.id,
        employee_id: user.employee.id,
        username: user.username,
        user_type: user.user_type,
        is_active: user.is_active,
        sso_flag: user.sso_flag,
        url_profile: user.url_profile,
        password: user.password,
      });
      setSwitcher(user.is_active === 1 ? true : false);
      setSwitcherSso(user.sso_flag === "Y" ? true : false);
    }
  }, [form, user]);

  const { readOnlyFieldModule, handlePlaceHolderField, handleReadOnlyField } =
    UseReadyOnlyField({
      moduleName: ModuleEnum.UserModule,
      readOnlyField,
    });

  return (
    <Form
      onFinish={handleEditUser}
      form={form}
      layout="vertical"
      autoComplete="off"
      style={{
        overflow: "auto",
        height: "600px",
        padding: "12px",
      }}
    >
      <Form.Item
        name="group_id"
        label="Group Name"
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
          onChange={(value) => setEditUser({ ...editUser, group_id: value })}
          placeholder={handlePlaceHolderField("group_id", "Select group name")}
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
        name="employee_id"
        label="Employee Name"
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
          onChange={(value) => setEditUser({ ...editUser, employee_id: value })}
          placeholder={handlePlaceHolderField("employee_id", "Select employee")}
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
        label={
          <>
            Username<span className={`${color["required-form"]}`}>*</span>
          </>
        }
      >
        <Input
          onChange={(e) =>
            setEditUser({ ...editUser, username: e.target.value })
          }
          size="large"
          maxLength={20}
          readOnly
        />
      </Form.Item>

      <Form.Item
        style={styleForm}
        name="user_type"
        label={
          <>
            User Type<span className={`${color["required-form"]}`}>*</span>
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
          onChange={(value) => setEditUser({ ...editUser, user_type: value })}
          placeholder={handlePlaceHolderField("user_type", "Select user type")}
          disabled={handleReadOnlyField("user_type")}
        >
          <Option value="Employee">Employee</Option>
          <Option value="Driver">Driver</Option>
          <Option value="Customer_Buyer">Customer Buyer</Option>
          <Option value="Vendor">Vendor</Option>
        </Select>
      </Form.Item>

      <Form.Item
        style={styleForm}
        name="url_profile"
        initialValue={null}
        label="Avatar"
      >
        <Input
          onChange={(e) => {
            if (!e.target.files) {
              return null;
            } else {
              setEditUser({
                ...editUser,
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
        <></>
      </Flex>
      <Form.Item
        style={styleForm}
        initialValue={user?.is_active}
        name="is_active"
        label={
          <>
            Set Status<span className={`${color["required-form"]}`}>*</span>
          </>
        }
      >
        <Switch
          onChange={switcherActiveUser}
          checked={switcher}
          disabled={handleReadOnlyField("is_active")}
        />
      </Form.Item>
      <Form.Item
        style={styleForm}
        initialValue={user?.sso_flag}
        name="sso_flag"
        label={
          <>
            SSO_Flag<span className={`${color["required-form"]}`}>*</span>
          </>
        }
      >
        <Switch
          onChange={switcherFlag}
          checked={switcherSso}
          disabled={handleReadOnlyField("sso_flag")}
        />
      </Form.Item>

      <Flex justify="center" gap={12}>
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
        </Button>{" "}
        <Button
          className={`submit-btn ${color["bg-primary"]}`}
          htmlType="submit"
          size="large"
          style={{
            width: "240px",
            height: "40px",
          }}
        >
          Save
        </Button>
      </Flex>
    </Form>
  );
}
