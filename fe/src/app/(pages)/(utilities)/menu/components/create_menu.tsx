import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  Input,
  Switch,
  Select,
  Button,
  TreeSelect,
  TreeDataNode,
  FormProps,
} from "antd";
import { MenuResponse } from "@/models/response/utilities/utility_response";
import { UpsertMenuRequest } from "@/models/request/utilities/utility_request";
import { useDispatch, useSelector } from "react-redux";
import { MenuUseCase } from "@/modules/utilities/usecases/menu_usecase";
import { useAppSelector } from "@/redux/store";
import { UseReadyOnlyField } from "@/shared/utils/readonly-field";
import { ModuleEnum } from "@/shared/roles/role";
import { useRouter } from "next/navigation";
import { Menus } from "@/models/menu/menu";
import { DefaultOptionType, OptionProps } from "antd/es/select";
import { TreeNode } from "antd/es/tree-select";

interface CreateMenuProps {
  onCancel: () => void;
  onCreateSuccess: () => void;
}

interface TreeSelectProps {
  value: string;
  title: string;
  children: TreeDataNode[] | undefined;
}

const CreateMenu: React.FC<CreateMenuProps> = ({
  onCancel,
  onCreateSuccess,
}) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [checked, setChecked] = useState<"Y" | "N">("N");
  const { readOnlyField } = useAppSelector((state) => state.utilsSlice);
  const { menuOption } = useAppSelector((state: any) => state.utilitySlice);

  const [form] = Form.useForm();
  const [iconBase64, setIconBase64] = React.useState<string | any>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleIconChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setIconBase64(base64);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const handleCreateMenu : FormProps<UpsertMenuRequest>['onFinish'] = async (values: UpsertMenuRequest) => {
    const body = {
      parent_menu_id: values.parent_menu_id,
      name: values.name,
      path: values.path,
      icon: iconBase64,
      order_no: values.order_no,
      description: values.description,
      is_active: checked,
      optionFlag: checked,
    };

    try {
      await MenuUseCase.CreateMenu(body, dispatch).then(() => {
        form.resetFields();
        onCreateSuccess();
        onCancel();
      });
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

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

  const findMenuOption = useCallback(() => {
    MenuUseCase.findMenuOption("", 1, 50, dispatch, "Y", "N");
  }, [dispatch]);

  const handleSetChecked = (checked: boolean) => {
    checked === false ? setChecked("N") : setChecked("Y");
  };

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
    findMenuOption();
  }, [findMenuOption]);
  const { readOnlyFieldModule, handlePlaceHolderField, handleReadOnlyField } =
    UseReadyOnlyField({
      moduleName: ModuleEnum.MenuModule,
      readOnlyField,
    });

  return (
    <>
      <Form
        form={form}
        onFinish={handleCreateMenu}
        layout="vertical"
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
            value={iconBase64} // Ensure this value is managed correctly
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
            placeholder={handlePlaceHolderField(
              "order_no",
              "Input order number"
            )}
            disabled={handleReadOnlyField("order_no")}
          />
        </Form.Item>
        <Form.Item label="Set Status" name="is_active" valuePropName="checked">
          <Switch
            onChange={handleSetChecked}
            disabled={handleReadOnlyField("is_active")}
          />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button style={{ marginRight: 8 }} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateMenu;
