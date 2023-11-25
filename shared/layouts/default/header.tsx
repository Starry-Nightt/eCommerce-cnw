import React, { useState } from "react";
import { Button, Layout, MenuProps,  Modal,  Space } from "antd";
import Link from "next/link";
import AvatarHeader from "@/components/avatar-header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AuthForm from "@/components/auth";
import useToggle from "@/hooks/use-toggle";
import { logout } from "@/redux/user.slice";



function Header() {
  const { loggedIn, user } = useSelector((state: RootState) => state.user);
  const [showingLogin, toggleLogin] = useToggle(false)
  const [showingRegister, toggleRegister] = useToggle(false)
  const dispatch = useDispatch()

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
      onClick: () => dispatch(logout())
    },
  ];

  return (
    <>
    <Layout.Header>
      <div className="flex items-center justify-between">
        <div className="w-20 my-4  rounded-md h-8 bg-slate-600" />
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
    </Layout.Header>
      <Modal open={showingRegister} onCancel={toggleRegister} footer={null}>
        <AuthForm register={true}/>
      </Modal>
      <Modal open={showingLogin} onCancel={toggleLogin} footer={null}>
        <AuthForm register={false} afterSubmit={toggleLogin} />
      </Modal>
    </>
  );
}

export default Header;
