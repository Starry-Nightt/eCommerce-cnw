import { ROUTE_PATH } from "@/constants/route-path.const";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

interface Props {
  name: string;
  path: ROUTE_PATH;
  textWhite?: boolean;
}

function NavListItem({ name, path, textWhite }: Props) {
  const router = useRouter();
  const isActive =
    path === "/" ? router.asPath === "/" : router.pathname.indexOf(path) > -1;
  return (
    <>
      {isActive ? (
        <div className="flex items-center border-b-2 border-white">
          <Link
            href={path}
            className={`cursor-pointer select-none  ${
              textWhite ? "text-white" : "text-black"
            }  text-sm font-medium `}
          >
            <span>{name}</span>
          </Link>
        </div>
      ) : (
        <Link
          href={path}
          className={`cursor-pointer select-none text-slate-400   text-sm font-medium `}
        >
          <span>{name}</span>
        </Link>
      )}
    </>
  );
}

export default NavListItem;
