import React, { useState } from "react";
import { Button, Drawer, Layout, MenuProps, Modal, Space } from "antd";
import Link from "next/link";
import AvatarHeader from "@/components/avatar-header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AuthForm from "@/components/auth";
import useToggle from "@/hooks/use-toggle";
import { logout } from "@/redux/user.slice";
import Logo from "@/components/logo";
import { ROUTE_PATH } from "@/constants/route-path.const";
import NavList from "@/components/nav/nav-list";
import { MenuOutlined } from "@ant-design/icons";

function Header() {
  const { loggedIn, user } = useSelector((state: RootState) => state.user);
  const [showingLogin, toggleLogin] = useToggle(false);
  const [showingRegister, toggleRegister] = useToggle(false);
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/profile/1">Thông tin cá nhân</Link>,
    },
    {
      key: "2",
      label: <Link href="/test">Đổi mật khẩu</Link>,
    },
    {
      key: "3",
      label: <span>Đăng xuất</span>,
      onClick: () => dispatch(logout()),
    },
  ];

  const navLinks = [
    {
      name: "Tất cả sách",
      path: ROUTE_PATH.BOOK,
    },
    {
      name: "Đơn hàng của bạn",
      path: ROUTE_PATH.ORDER,
    },
  ];

  return (
    <>
      <Layout.Header style={{ padding: "0" }}>
        <div className="flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-10">
            <Logo />
            <div className="hidden md:block">
              <NavList items={navLinks} textWhite/>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {loggedIn ? (
              <AvatarHeader user={user} items={items} textWhite />
            ) : (
              <Space direction="horizontal">
                <Button type="primary" onClick={toggleLogin}>
                  Sign in
                </Button>
                <Button onClick={toggleRegister}>Sign up</Button>
              </Space>
            )}
          </div>
          <div className="md:hidden">
            <Button
              type="primary"
              onClick={showDrawer}
              icon={<MenuOutlined />}
              size="large"
            />
          </div>
        </div>
      </Layout.Header>
      <Modal open={showingRegister} onCancel={toggleRegister} footer={null}>
        <AuthForm register={true} />
      </Modal>
      <Modal open={showingLogin} onCancel={toggleLogin} footer={null}>
        <AuthForm register={false} afterSubmit={toggleLogin} />
      </Modal>
      <Drawer
        placement="left"
        onClose={onCloseDrawer}
        open={openDrawer}
        title="Menu"
      >
        <div className="flex flex-col justify-between h-full">
          <NavList items={navLinks} vertical />
          <div>
            {loggedIn ? (
              <AvatarHeader user={user} items={items} textWhite />
            ) : (
              <Space direction="vertical" className="w-full">
                <Button type="primary" onClick={toggleLogin} block>
                  Sign in
                </Button>
                <Button onClick={toggleRegister} block>
                  Sign up
                </Button>
              </Space>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default Header;
