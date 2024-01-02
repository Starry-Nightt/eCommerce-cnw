import React, { useEffect, useState } from "react";
import { Badge, Button, Drawer, Layout, MenuProps, Modal, Space } from "antd";
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
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import useAuthModal from "@/hooks/use-auth-modal";
import { showLogin } from "@/redux/auth-modal.slice";
import { useRouter } from "next/router";
import { LocalStorageKey } from "@/constants/local-storage-key.const";
import useLocalStorage from "@/hooks/use-local-storage";
import useAuth from "@/hooks/use-auth";
import CartService from "@/services/cart.service";

function Header() {
  const {
    showingLogin,
    showingRegister,
    onShowLogin,
    onShowRegister,
    onHideLogin,
    onHideRegister,
  } = useAuthModal();

  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const { loggedIn, user } = useAuth();
  const [_a, __f, clearToken] = useLocalStorage(LocalStorageKey.TOKEN);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const [_, __, clearUser] = useLocalStorage(LocalStorageKey.USER);
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          href={`${
            user?.isAdmin && loggedIn
              ? `/admin-profile/${user?.id}`
              : `/profile/${user?.id}`
          }`}
        >
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "2",
      label: <Link href="/test">Đổi mật khẩu</Link>,
    },
    {
      key: "3",
      label: <span>Đăng xuất</span>,
      onClick: () => {
        dispatch(logout());
        clearUser();
        router.push("/");
        clearToken();
      },
    },
  ];
  const itemsAdmin: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          href={`${
            user?.isAdmin ? `/admin-profile/${user.id}` : `/profile/${user?.id}`
          }`}
        >
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          href={`${
            user?.isAdmin ? `/admin-profile/${user.id}` : `/profile/${user?.id}`
          }`}
        >
          Đổi mật khẩu
        </Link>
      ),
    },
    {
      key: "admin-1",
      label: <Link href="/dashboard">Quay về trang admin</Link>,
    },
    {
      key: "3",
      label: <span>Đăng xuất</span>,
      onClick: () => {
        dispatch(logout());
        router.push("/");
        clearToken();
        clearUser();
      },
    },
  ];

  const navLinks = [
    {
      name: "Trang chủ",
      path: ROUTE_PATH.HOME,
    },
    {
      name: "Tất cả sách",
      path: ROUTE_PATH.BOOK,
    },
    {
      name: "Đơn hàng của bạn",
      path: ROUTE_PATH.ORDER,
    },
  ];
  const navLinksDrawer = [
    {
      name: "Trang chủ",
      path: ROUTE_PATH.HOME,
    },
    {
      name: "Tất cả sách",
      path: ROUTE_PATH.BOOK,
    },
    {
      name: "Xem giỏ hàng",
      path: ROUTE_PATH.CART,
    },
    {
      name: "Đơn hàng của bạn",
      path: ROUTE_PATH.ORDER,
    },
  ];
  const navLinksAdmin = [
    {
      name: "Trang chủ",
      path: ROUTE_PATH.HOME,
    },
    {
      name: "Tất cả sách",
      path: ROUTE_PATH.BOOK,
    },
  ];

  return (
    <>
      <Layout.Header style={{ padding: "0" }}>
        <div className="flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-10">
            <Logo />
            <div className="hidden md:block">
              <NavList
                items={user?.isAdmin ? navLinksAdmin : navLinks}
                textWhite
              />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {loggedIn ? (
              <div className="flex items-center gap-5">
                {!user.isAdmin && (
                  <Button
                    onClick={() => router.push("/cart")}
                    icon={<ShoppingCartOutlined />}
                    type="text"
                    style={{ color: "#fff", marginTop: "4px" }}
                    size="large"
                  ></Button>
                )}
                <AvatarHeader
                  user={user}
                  items={user?.isAdmin ? itemsAdmin : items}
                  textWhite
                />
              </div>
            ) : (
              <Space direction="horizontal">
                <Button type="primary" onClick={onShowLogin}>
                  Sign in
                </Button>
                <Button onClick={onShowRegister}>Sign up</Button>
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

      <Drawer
        placement="left"
        onClose={onCloseDrawer}
        open={openDrawer}
        title="Menu"
      >
        <div className="flex flex-col justify-between h-full">
          <NavList items={navLinksDrawer} vertical />
          <div>
            {loggedIn ? (
              <AvatarHeader
                user={user}
                items={user?.isAdmin ? itemsAdmin : items}
                textWhite
              />
            ) : (
              <Space direction="vertical" className="w-full">
                <Button type="primary" onClick={onShowLogin} block>
                  Sign in
                </Button>
                <Button onClick={onShowRegister} block>
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
