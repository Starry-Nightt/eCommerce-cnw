import { useRouter } from "next/router";
import React from "react";

function Logo() {
  const router = useRouter();
  return (
    <div
      className="w-20 my-4  rounded-md h-8 bg-slate-600 cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
}

export default Logo;
