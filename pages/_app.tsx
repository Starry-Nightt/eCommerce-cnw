import { App} from "antd";
import "../styles/globals.css";
import Providers from "@/redux/providers";
import LayoutDefault from "@/layouts/default/layout-default";
import { useEffect } from "react";
import createLoadingInterceptor from "shared/interceptors/loading.interceptor";
import { store } from "@/redux/store";
import LayoutAdmin from "@/layouts/admin/layout-admin";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    createLoadingInterceptor(store)
  }, [])

  return (
    <App>
      <Providers>
        <LayoutDefault>
          <Component {...pageProps} />
        </LayoutDefault>
      </Providers>
    </App>
  );
}

export default MyApp;
