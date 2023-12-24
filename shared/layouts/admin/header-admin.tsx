import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, MenuProps } from "antd";
import Link from "next/link";
import AvatarHeader from "@/components/avatar-header";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/user.slice";
import router from "next/router";
import useLocalStorage from "@/hooks/use-local-storage";
import { LocalStorageKey } from "@/constants/local-storage-key.const";

const { Header } = Layout;

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderAdmin({ collapsed, setCollapsed }: Props) {
  const { loggedIn, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [_, __, clearToken] = useLocalStorage(LocalStorageKey.TOKEN);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`${user?.isAdmin ? "/admin-profile/1" : "/profile/1"}`}>
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href={`${user?.isAdmin ? "/test" : "/"}`}>Đổi mật khẩu</Link>
      ),
    },
    {
      key: "4",
      label: <Link href="/">Xem trang khách</Link>,
    },
    {
      key: "3",
      label: <span>Đăng xuất</span>,
      onClick: () => {
        dispatch(logout());
        router.push("/");
        clearToken("");
      },
    },
  ];
  return (
    <Header
      style={{ padding: 16, background: "#fff" }}
      className="flex items-center justify-between"
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="w-16 h-16 text-base"
      />
      {loggedIn && (
        <div className="pr-8">
          <AvatarHeader user={user} items={items} />
        </div>
      )}
    </Header>
  );
}

export default HeaderAdmin;
