import { LocalStorageKey } from "@/constants/local-storage-key.const";
import useLocalStorage from "@/hooks/use-local-storage";
import LayoutDefault from "@/layouts/default/layout-default";
import { User } from "@/models/user.model";
import { login } from "@/redux/user.slice";
import UserService from "@/services/user.service";
import { message, notification } from "antd";
import router from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function AppContainer({ Component, pageProps }) {
  const [detail, setDetail] = useLocalStorage(LocalStorageKey.USER);
  const dispatch = useDispatch();
  const [token, setToken] = useLocalStorage(LocalStorageKey.TOKEN);

  useEffect(() => {
    if (detail) {
      const loginDefault = async () => {
        try {
          const res = await UserService.login(detail);
          const user: User = [res?.user].map((it) => ({
            ...it,
          }))[0];
          setToken(res?.token || "");
          if (Object.keys(user).length) {
            dispatch(login(user));
            setDetail({ ...user, password: detail.password });
            message.success("Login success !");
            if (user?.isAdmin) {
              router.push("/dashboard");
            }
          } else {
            notification.error({
              message: "Tài khoản hoặc mật khẩu ko đúng",
              placement: "topLeft",
            });
          }
        } catch (err) {
          notification.error({
            message: err?.message ?? `Đã có lỗi xảy ra. Hãy thử lại`,
            placement: "topLeft",
          });
        }
      };

      loginDefault();
    }
  }, []);

  return (
    <>
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <LayoutDefault>
          <Component {...pageProps} />
        </LayoutDefault>
      )}
    </>
  );
}

export default AppContainer;
