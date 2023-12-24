import { hideSpinner, showSpinner } from "@/redux/spinner.slice";
import httpTest, { http } from "@/services/http.service";

const createLoadingInterceptor = (store) => {
  const onRequest = (config) => {
    store.dispatch(showSpinner());
    return config;
  };

  const onResponse = (response) => {
    store.dispatch(hideSpinner());
    return response;
  };

  const onError = (error) => {
    store.dispatch(hideSpinner());
    return Promise.reject(error);
  };

  httpTest.interceptors.request.use(onRequest);
  httpTest.interceptors.response.use(onResponse, onError);
  http.interceptors.request.use(onRequest);
  http.interceptors.response.use(onResponse, onError);
};

export default createLoadingInterceptor;
