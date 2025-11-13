"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Flex } from "antd";
import "@/assets/sass/layouts/dashboard.scss";
import { generateSiderMenu } from "@/shared/data/sidebar-item";
import { useIsMobile } from "@/shared/hooks/use_responsive";

import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Image } from "antd";
import { AuthUseCase } from "@/modules/auth/usecases/auth_usecase";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

import type { MenuProps } from "antd";
import { setSelectedMenu } from "@/modules/utils/slices/utils_slice";
import { useAppSelector } from "@/redux/store";
import { getSessionData } from "@/shared/helpers/session";

type MenuItem = Required<MenuProps>["items"][number];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.authSlice);
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const { name } = useSelector((state: any) => state.authSlice);
  const { siderMenu, selectedMenu } = useAppSelector(
    (state) => state.utilsSlice
  );

  const menus = React.useMemo(() => {
    const menus = generateSiderMenu({ menus: siderMenu, router });

    return menus;
  }, [siderMenu, router]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const selectedMenuKey = React.useMemo(() => {
    if (!selectedMenu)
      return {
        keySelected: [],
        openPathKey: [],
      };

    return selectedMenu;
  }, [selectedMenu]);

  const handleLogout = () => {
    AuthUseCase.Logout(dispatch).then(() => {
      router.push("/");
    });
  };

  const handleMenuChange = (value: any) => {
    isMobile ? toggleCollapse() : null;

    dispatch(
      setSelectedMenu({
        keySelected: value.selectedKeys,
        openPathKey: value.keyPath,
      })
    );
  };

  const items: MenuItem[] = [
    {
      label: <Link href="/profile">My Profile</Link>,
      key: "0",
    },

    // {
    //   type: "divider",
    // },
    {
      label: "Logout",
      key: "3",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div
        style={{
          position: "static",
        }}
      >
        <Layout className="dashboard-layout-wrapper">
          <Sider
            breakpoint="lg"
            collapsible
            trigger={null}
            collapsed={collapsed}
            className="sidebar"
            width={isMobile ? "100%" : 300}
            collapsedWidth={isMobile ? 0 : 80}
            onCollapse={toggleCollapse}
            style={{
              padding: collapsed && isMobile ? 0 : undefined,
              overflow: collapsed && isMobile ? "hidden" : "auto",
              height: "100vh",
              position: "sticky",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "8px, 6px, 8px, 16px",
              }}
            >
              {!collapsed ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                      padding: "8px, 6px, 8px, 16px",
                    }}
                  >
                    <div className="demo-logo-vertical">
                      <Image
                        onClick={() => router.push("/")}
                        src="/image/soedarpo.png"
                        alt="image"
                        style={{
                          position: "sticky",

                          width: "150.75px",
                        }}
                        preview={false}
                      />
                    </div>
                    <Button
                      type="text"
                      onClick={toggleCollapse}
                      style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                        visibility: isMobile ? "visible" : "hidden",
                      }}
                    >
                      {collapsed ? (
                        <MenuUnfoldOutlined />
                      ) : (
                        <MenuFoldOutlined />
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}
              <Menu
                mode="inline"
                defaultOpenKeys={selectedMenuKey.openPathKey ?? ""}
                inlineCollapsed={collapsed}
                defaultSelectedKeys={selectedMenuKey.keySelected ?? ""}
                className="sidebar-menu"
                items={menus}
                onSelect={handleMenuChange}
              ></Menu>
            </div>
          </Sider>
          <Layout
            style={{
              backgroundColor: "#f0f2f5",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                minHeight: 668,
              }}
            >
              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  position: "sticky",
                }}
                className="header"
              >
                <div className="header-menu">
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />

                  <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    className="profile-button"
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Image
                          src={"/image/user.jpg"}
                          alt="image"
                          preview={false}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                          }}
                        />

                        <b>{name}</b>
                        <CaretDownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </Header>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Content style={{ padding: "12px" }}>
                  <div
                    style={{
                      padding: "24px",
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                    }}
                    className="dashboard-content"
                  >
                    {children}
                  </div>
                </Content>

                <Footer
                  style={{
                    textAlign: "center",
                    padding: "6px",
                    position: "sticky",
                  }}
                >
                  ©{new Date().getFullYear()} AETD
                </Footer>
              </div>
            </div>
          </Layout>
        </Layout>
      </div>
    </>
  );
}
