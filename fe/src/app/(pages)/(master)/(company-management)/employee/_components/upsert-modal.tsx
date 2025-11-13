"use client";

import {
  EmployeeResponse,
} from "@/models/response/master/company_response";
import { UniversalUseCase } from "@/modules/union/usecases/uni_usecases";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ModuleEnum } from "@/shared/roles/role";
import { UseReadyOnlyField } from "@/shared/utils/readonly-field";
import { Button, Form, Input, Select, Switch, Typography } from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useState } from "react";
const { Option } = Select;

interface UpsertProps {
  onCancel: () => void;
  onSuccess: () => void;
  data?: Record<string, unknown> | null | EmployeeResponse;
  pathTable?: string;
  title: string;
  role?: string;
  moduleName: string;
}

export default function UpsertEmployeeForm(props: UpsertProps) {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const { readOnlyField } = useAppSelector((state) => state.utilsSlice);
  const { optionList } = useAppSelector((state) => state.unionSlice);
  const [switcher, setSwitcher] = useState<0 | 1>(0);

  const handleSubmit: FormProps<any>["onFinish"] = (value) => {
    let inputData = value
    if (props.data && props.role === "editModal") {
      UniversalUseCase.HandleUpdateDataById(
        {
          id: props.data.id as string,
          body: inputData,
          moduleName: props.moduleName,
          pathApi: "update",
        },
        dispatch
      ).then(() => {
        form.resetFields();
        props.onSuccess();
        props.onCancel();
      });
    } else {
      UniversalUseCase.HandleCreateData(
        {
          body: inputData,
          moduleName: props.moduleName,
          pathApi: "create",
        },
        dispatch
      ).then(() => {
        form.resetFields();
        props.onSuccess();
        props.onCancel();
      });
    }
  };

  const { readOnlyFieldModule, handlePlaceHolderField, handleReadOnlyField } =
    UseReadyOnlyField({
      moduleName: props.moduleName,
      readOnlyField,
    });

  useEffect(() => {
    if (props.data && props.role === "editModal") {
      form.setFieldsValue({
        code: props.data.code,
        name: props.data.name,
      });
    }
  }, [props.data, props.role, form]);

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <div className="header-modal">
          <h3 className="title">Employee Information</h3>
          <Typography.Text type="secondary">
            Please fill out the form completely
          </Typography.Text>
        </div>
        <Form.Item
          name={"code"}
          initialValue={
            props.role === "editModal" ? props.data?.code : null
          }
          required
          rules={[
            {
              pattern: /[a-zA-Z0-9]/g,
              message: "Must be Alphabet and Numeric character",
            },
            {
              max: 3,
              message: "Must be 3 character",
            },
          ]}
          label="Employee Code"
        >
          <Input
            size="large"
            maxLength={30}
            placeholder={handlePlaceHolderField(
              "code",
              "Input employee code"
            )}
            disabled={handleReadOnlyField("code")}
          />
        </Form.Item>
        <Form.Item
          required
          initialValue={
            props.role === "editModal" ? props.data?.name : null
          }
          name="name"
          rules={[
            {
              pattern: /[a-zA-Z0-9]/g,
              message: "Must be Alphabet and Numeric character",
            },
          ]}
          label="Employee Name"
        >
          <Input
            size="large"
            placeholder={handlePlaceHolderField(
              "name",
              "Input employee name"
            )}
            disabled={handleReadOnlyField("name")}
          />
        </Form.Item>

        <div className="action">
          <Button onClick={props.onCancel} className="cancel-btn" size="large">
            Cancel
          </Button>
          <Button className="submit-btn" htmlType="submit" size="large">
            {props.role === "editModal" ? <>Save</> : <>Add</>}
          </Button>
        </div>
      </Form>
    </>
  );
}
