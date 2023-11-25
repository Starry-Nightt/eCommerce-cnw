import { App } from "antd";
import "../styles/globals.css";
import Providers from "@/redux/providers";
import LayoutDefault from "@/layouts/default/layout-default";
import { useEffect } from "react";
import { store } from "@/redux/store";
import createLoadingInterceptor from "@/interceptors/loading.interceptor";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    createLoadingInterceptor(store);
  }, []);

  return (
    <App>
      <Providers>
        {Component.getLayout ? (
          Component.getLayout(<Component {...pageProps} />)
        ) : (
          <LayoutDefault>
            <Component {...pageProps} />
          </LayoutDefault>
        )}
      </Providers>
    </App>
  );
}

export default MyApp;
