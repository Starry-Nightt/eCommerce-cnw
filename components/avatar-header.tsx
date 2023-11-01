import { Avatar, Button, Dropdown, MenuProps } from "antd";
import React from "react";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { User } from "@/models/user.model";

interface Props {
  items: MenuProps["items"];
  textWhite?: boolean;
  user: User
}

function AvatarHeader({ items, textWhite, user }: Props) {
  return (
    <div className={`flex gap-2 items-center ${textWhite ? "text-white" : ""}`}>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="cursor-pointer flex items-center gap-2">
          <Avatar
            size="default"
            icon={<UserOutlined />}
            style={{ backgroundColor: "#87d068" }}
          />
          <span className={`font-medium select-none`}>{user?.username}</span>
          <Button size="small" type="text" style={{'color': '#fff'}} className="mt-1" icon={<DownOutlined />} />
        </div>
      </Dropdown>
    </div>
  );
}

export default AvatarHeader;
