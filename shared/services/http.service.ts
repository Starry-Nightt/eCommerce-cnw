import { LocalStorageKey } from "@/constants/local-storage-key.const";
import { getSavedValue } from "@/utils/helper";
import axios from "axios";

const httpTest = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 6000,
});

export const http = axios.create({
  baseURL: "https://cnweb-backend.onrender.com",
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
