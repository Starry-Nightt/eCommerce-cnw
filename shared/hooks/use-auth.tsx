import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

function useAuth() {
  const { loggedIn, user } = useSelector((state: RootState) => state.user);
  return { loggedIn, user };
}

export default useAuth;
