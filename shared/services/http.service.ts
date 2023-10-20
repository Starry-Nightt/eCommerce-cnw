import axios from "axios";

const http = axios.create({
  // baseURL: "localhost:5000/",
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use((response) => {
  const data = response.data;
  return data;
});

export default http;
