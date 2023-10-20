import { Avatar, Dropdown, MenuProps } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

interface Props {
  items: MenuProps["items"];
  textWhite?: boolean
}

function AvatarHeader({ items, textWhite }: Props) {
  return (
    <div className={`flex gap-2 items-center pr-6 ${textWhite ? 'text-white': ''}`}>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Avatar
          size="default"
          icon={<UserOutlined />}
          className=" cursor-pointer"
          style={{ backgroundColor: '#87d068' }}
        />
      </Dropdown>
      <span className={`font-medium select-none `}>Username</span>
    </div>
  );
}

export default AvatarHeader;
