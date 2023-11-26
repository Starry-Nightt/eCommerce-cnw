import useToggle from "@/hooks/use-toggle";
import React, { useEffect } from "react";
import RegisterForm from "./resgiter-form";
import LoginForm from "./login-form";
import { App } from "antd";
import { LoginDetail, RegisterDetail } from "@/models/auth.model";
import { useDispatch } from "react-redux";
import { login } from "@/redux/user.slice";
import { User } from "@/models/user.model";
import { Role } from "@/constants/app.const";
import useLocalStorage from "@/hooks/use-local-storage";
import { LocalStorageKey } from "@/constants/local-storage-key.const";

interface Props {
  register: boolean;
  afterSubmit?: () => void;
}

function AuthForm({ register, afterSubmit }: Props) {
  const [visible, toggle] = useToggle(register);
  const { message } = App.useApp();
  const dispatch = useDispatch();

  const loginAccount = (detail: LoginDetail) => {
    const user: User = {
      id: "123",
      username: "Dang Tien",
      email: "dangtien@gmail.com",
      address: "Ha noi",
      role: Role.NORMAL,
    };
    dispatch(login(user));
    message.success("Login success !");
    afterSubmit();
  };

  const registerAccount = (detail: RegisterDetail) => {
    message.success("Register success !");
    toggle();
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
        />
      ) : (
        <LoginForm
          onToggleForm={toggle}
          onFinish={loginAccount}
          onFinishFailed={onFinishFailed}
        />
      )}
    </>
  );
}

export default AuthForm;
