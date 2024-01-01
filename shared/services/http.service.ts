import { LocalStorageKey } from "@/constants/local-storage-key.const";
import { getSavedValue } from "@/utils/helper";
import axios from "axios";

const httpTest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API_URL,
  timeout: 6000,
});

console.log(
  process.env.NEXT_PUBLIC_LOCAL_API_URL,
  process.env.NEXT_PUBLIC_RENDER_API_URL
);

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RENDER_API_URL,
  timeout: 6000,
});

http.interceptors.request.use((config) => {
  const token = getSavedValue(LocalStorageKey.TOKEN, "");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use((response) => {
  const data = response.data;
  return data;
});

httpTest.interceptors.request.use((config) => {
  const token = getSavedValue(LocalStorageKey.TOKEN, "");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpTest.interceptors.response.use((response) => {
  const data = response.data;
  return data;
});

export default httpTest;
