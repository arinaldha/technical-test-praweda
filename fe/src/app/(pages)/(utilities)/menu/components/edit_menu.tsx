"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Form, Input, Switch, Select, Button, FormProps } from "antd";
import { MenuResponse } from "@/models/response/utilities/utility_response";
import { useDispatch, useSelector } from "react-redux";
import { MenuUseCase } from "@/modules/utilities/usecases/menu_usecase";
import { UpsertMenuRequest } from "@/models/request/utilities/utility_request";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { UseReadyOnlyField } from "@/shared/utils/readonly-field";
import { ModuleEnum } from "@/shared/roles/role";
import { DefaultOptionType } from "antd/es/select";
import { Menus } from "@/models/menu/menu";
import TreeSelect, { TreeNode } from "antd/es/tree-select";

const { Option } = Select;

interface EditMenuProps {
  onCancel: () => void;
  onCreateSuccess: () => void;
  menu: MenuResponse;
  id: string;
}

const EditMenu: React.FC<EditMenuProps> = ({
  onCancel,
  menu,
  onCreateSuccess,
  id,
}: EditMenuProps) => {
  const dispatch = useDispatch();
  const { readOnlyField } = useAppSelector((state) => state.utilsSlice);

  const [form] = Form.useForm();
  const [iconBase64, setIconBase64] = useState<string | any>("");
  const [selectedParentMenu, setSelectedParentMenu] = useState<
    string | undefined
  >(undefined);
  const [switcher, setSwitcher] = useState<boolean>();
  const { menuOption } = useSelector((state: any) => state.utilitySlice);
  const handleIconChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setIconBase64(base64);
      } catch (error) {
        throw error;
      }
    } else {
      setIconBase64(menu.icon);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const findMenuOption = useCallback(() => {
    MenuUseCase.findMenuOption("", 1, 50, dispatch, "Y", "N");
  }, [dispatch]);

  useEffect(() => {
    findMenuOption();
  }, [findMenuOption]);

  const optionMenu = React.useMemo(() => {
    if (!menuOption) return [];

    const listOption: DefaultOptionType[] = [];
    function generateOptionMenu(
      menus: Menus[],
      simbolTree: string,
      deepRoot: number,
      listOption: DefaultOptionType[]
    ) {
      let simbolLabel = "";
      for (let index = 0; index < deepRoot; index++) {
        simbolLabel += simbolTree;
      }

      for (const menu of menus) {
        listOption.push({
          label: `${simbolLabel} ${menu.menu_name}`,
          value: menu.id,
        });

        if (menu.children && menu.children.length > 0) {
          const nextRoot = deepRoot + 1;
          generateOptionMenu(menu.children, simbolTree, nextRoot, listOption);
        }
      }
    }
    generateOptionMenu(menuOption, "-", 1, listOption);

    return listOption;
  }, [menuOption]);

  const handleChange = (value: string | undefined) => {
    setSelectedParentMenu(value);
  };

  const onChange = (checked: boolean) => {
    setSwitcher(checked);
  };

  const onFinish: FormProps<any>["onFinish"] = (values: any) => {
    let updatedMenu: UpsertMenuRequest = values;

    if (switcher) {
      updatedMenu.is_active = "Y";
    } else {
      updatedMenu.is_active = "N";
    }

    updatedMenu.id = id;
    if (!updatedMenu.id) {
      return null;
    }

    if (
      updatedMenu.description === null ||
      updatedMenu.description === undefined
    ) {
      updatedMenu.description = "description";
    }

    updatedMenu.icon = iconBase64 ? iconBase64 : menu.icon;

    updatedMenu.order_no = +updatedMenu.order_no;

    MenuUseCase.UpdateMenu(updatedMenu, dispatch).then(() => {
      onCreateSuccess();
      onCancel();
    });
  };
  const { readOnlyFieldModule, handlePlaceHolderField, handleReadOnlyField } =
    UseReadyOnlyField({
      moduleName: ModuleEnum.MenuModule,
      readOnlyField,
    });

  const renderTreeNodes = (data: MenuResponse[]): React.ReactNode => {
    return data.map((item) => (
      <TreeNode value={item.id.toString()} title={item.menu_name} key={item.id}>
        {item.children && item.children.length > 0
          ? renderTreeNodes(item.children)
          : null}
      </TreeNode>
    ));
  };

  useEffect(() => {
    // console.log("menu : ", menu)
    if (menu) {
      form.setFieldsValue({
        id: menu.id,
        parent_menu_id: menu.children,
        parent_menu_name: menu.parent_menu,
        name: menu.menu_name,
        path: menu.path,
        order_no: menu.order_no,
        is_active: menu.is_active,
      });

      if (menu.is_active) {
        menu.is_active === "Y" ? setSwitcher(true) : setSwitcher(false);
      }
      if (menu.icon && menu.icon.startsWith("data:image/svg+xml;base64,")) {
        setIconBase64(menu.icon);
      }
    }
  }, [menu, form, menu?.is_active]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ is_active: true }}
      autoComplete="off"
    >
      <Form.Item label="Menu Parent" name="parent_menu_id">
        <TreeSelect allowClear>
          {menuOption ? renderTreeNodes(menuOption) : null}
        </TreeSelect>
      </Form.Item>

      <Form.Item
        label="Menu Name"
        name="name"
        rules={[{ required: true, message: "Please input menu name" }]}
      >
        <Input
          placeholder={handlePlaceHolderField("menu_name", "Input menu name")}
          disabled={handleReadOnlyField("menu_name")}
        />
      </Form.Item>
      <Form.Item label="Icon" name="icon">
        <input
          type="file"
          accept=".svg"
          onChange={handleIconChange}
          placeholder={handlePlaceHolderField("icon", "Input icon")}
          disabled={handleReadOnlyField("icon")}
        />
      </Form.Item>

      <Form.Item label="URL" name="path">
        <Input
          placeholder={handlePlaceHolderField("path", "Input url")}
          disabled={handleReadOnlyField("path")}
        />
      </Form.Item>
      <Form.Item label="Order No." name="order_no">
        <Input
          placeholder={handlePlaceHolderField("order_no", "Input order number")}
          disabled={handleReadOnlyField("order_no")}
        />
      </Form.Item>
      <Form.Item
        label="Set Status"
        initialValue={menu?.is_active}
        name="is_active"
      >
        <Switch onChange={onChange} checked={switcher} />
      </Form.Item>
      <div style={{ textAlign: "right" }}>
        <Button style={{ marginRight: 8 }} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default EditMenu;
