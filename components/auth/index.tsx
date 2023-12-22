import useToggle from "@/hooks/use-toggle";
import React, { useState } from "react";
import RegisterForm from "./resgiter-form";
import LoginForm from "./login-form";
import { App } from "antd";
import { LoginDetail, RegisterDetail } from "@/models/auth.model";
import { useDispatch } from "react-redux";
import { login } from "@/redux/user.slice";
import { User } from "@/models/user.model";
import UserService from "@/services/user.service";
import useLocalStorage from "@/hooks/use-local-storage";
import { LocalStorageKey } from "@/constants/local-storage-key.const";
import { useRouter } from "next/router";

interface Props {
  register: boolean;
  afterSubmit?: () => void;
}

function AuthForm({ register, afterSubmit }: Props) {
  const [visible, toggle] = useToggle(register);
  const { message, notification } = App.useApp();
  const dispatch = useDispatch();
  const [token, setToken] = useLocalStorage(LocalStorageKey.TOKEN);
  const [loading, toggleLoading] = useToggle(false);
  const router = useRouter();

  const loginAccount = async (detail: LoginDetail) => {
    toggleLoading(true);
    try {
      const res = await UserService.login(detail);
      const user: User = [res?.user].map((it) => ({
        ...it,
        isAdmin: true
      }))[0];
      setToken(res?.token || "");
      dispatch(login(user));
      message.success("Login success !");
      afterSubmit?.();
      if (user.isAdmin) {
        router.push("/test");
      }
    } catch (err) {
      console.log(err)
      notification.error({
        message: err?.message ?? `Đã có lỗi xảy ra. Hãy thử lại`,
        placement: "topLeft",
      });
    } finally {
      toggleLoading(false);
    }
  };

  const registerAccount = async (detail: RegisterDetail) => {
    try {
      toggleLoading(true);
      await UserService.register(detail);
      message.success("Register success !");
      toggle();
    } catch {
      notification.error({
        message: `Đã có lỗi xảy ra. Hãy thử lại`,
        placement: "topLeft",
      });
    } finally {
      toggleLoading(false);
    }
  };

  const onFinishFailed = (text: string) => {
    message.error(text);
  };

  return (
    <>
      {visible ? (
        <RegisterForm
          onToggleForm={toggle}
          onFinish={registerAccount}
          onFinishFailed={onFinishFailed}
          loading={loading}
        />
      ) : (
        <LoginForm
          onToggleForm={toggle}
          onFinish={loginAccount}
          onFinishFailed={onFinishFailed}
          loading={loading}
        />
      )}
    </>
  );
}

export default AuthForm;
