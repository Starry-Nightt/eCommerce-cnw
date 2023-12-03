import { ROUTE_PATH } from "@/constants/route-path.const";
import React, { ReactNode } from "react";
import NavListItem from "./nav-list-item";

interface NavLink {
  name: string;
  path: ROUTE_PATH;
}

interface Props {
  items: NavLink[];
  vertical?: boolean;
  textWhite?: boolean
}

function NavList({ items, textWhite, vertical }: Props) {
  return (
    <div className={`flex gap-5 ${vertical ? 'flex-col' : ''}`}>
      {items.map((item) => {
        return <NavListItem {...item} key={item.name} textWhite={textWhite} />;
      })}
    </div>
  );
}

export default NavList;
