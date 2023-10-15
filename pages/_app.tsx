import { App } from "antd";
import "../styles/globals.css";
import Providers from "@/redux/proviers";
import LayoutDefault from "@/layouts/default/layout-default";
import LayoutAdmin from "@/layouts/admin/layout-admin";

function MyApp({ Component, pageProps }) {
  return (
    <App>
      <Providers>
        <LayoutAdmin>
          <Component {...pageProps} />
        </LayoutAdmin>
      </Providers>
    </App>
  );
}

export default MyApp;
